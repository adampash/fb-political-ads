import * as React from "react";

interface Props {
  name: string;
}

interface State {}

class PageDetails extends React.Component<Props, State> {
  state = {};

  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}

export default PageDetails;
