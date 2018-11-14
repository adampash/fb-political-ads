import * as React from "react";
import { IAd } from "../../types";
import { format } from "date-fns";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 16px 0;
  img {
    max-width: 25%;
    align-self: center;
    margin-right: 24px;
  }
`;
export const Content = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  > div:last-child {
    align-self: flex-start;
    margin-top: 20px;
  }
  h4 {
    margin: 6px 0;
    font-size: 14px;
    font-weight: 600;
  }
`;

interface Props {
  ad: IAd;
  flagDeleted: () => void;
}

class Ad extends React.Component<Props> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const {
      ad: { snapshot, startDate, endDate },
      flagDeleted,
    } = this.props;
    const { body, display_format, link_url, title, videos, images } = snapshot;
    if (!display_format || (!videos && !images)) {
      flagDeleted();
      return null;
    }
    console.log("trying adid", snapshot.ad_creative_id);
    const imageSrc =
      display_format === "video"
        ? videos[0].video_preview_image_url
        : images.length > 0
          ? images[0].resized_image_url
          : "";
    return (
      <Container>
        {display_format !== "text" && <img src={imageSrc} />}
        <Content>
          <h4>{title}</h4>
          <div dangerouslySetInnerHTML={body.markup} />
          <div>
            {format(new Date(startDate * 1000), "MM/DD/YYYY")} through{" "}
            {format(new Date(endDate * 1000), "MM/DD/YYYY")}
          </div>
        </Content>
      </Container>
    );
  }
}

export default Ad;
