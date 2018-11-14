import * as React from "react";

export enum IconType {
  None = 0,
  Account,
  ArrowBack,
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  Bookmark,
  BookmarkBorder,
  Star,
  StarBorder,
  CheckboxBlank,
  Checkbox,
  CheckCircle,
  VerticalAlignBottom,
  ThumbUp,
  ThumbDown,
  Error,
  ErrorFill,
  Check,
  Close,
  RadioButton,
  RadioButtonChecked,
  Copyright,
  Warning,
  Add,
  Remove,
  Help,
  Notifications,
  NotificationsNone,
  Photo,
  Fullscreen,
  FullscreenExit,
  OpenInNew,
  RSS,
  Search,
}

interface IIconMap {
  [key: string]: string;
}

// For more icons see: https://material.io/tools/icons
const ICON_MAP: IIconMap = {
  [IconType.Account]: "account_circle",
  [IconType.ArrowBack]: "arrow_back",
  [IconType.ArrowBackIos]: "arrow_back_ios",
  [IconType.ArrowForward]: "arrow_forward",
  [IconType.ArrowForwardIos]: "arrow_forward_ios",
  [IconType.Bookmark]: "bookmark",
  [IconType.BookmarkBorder]: "bookmark_border",
  [IconType.Star]: "star",
  [IconType.StarBorder]: "star_border",
  [IconType.CheckboxBlank]: "check_box_outline_blank",
  [IconType.Checkbox]: "check_box",
  [IconType.CheckCircle]: "check_circle",
  [IconType.VerticalAlignBottom]: "vertical_align_bottom",
  [IconType.ThumbUp]: "thumb_up",
  [IconType.ThumbDown]: "thumb_down",
  [IconType.Error]: "error_outline",
  [IconType.ErrorFill]: "error",
  [IconType.Check]: "check",
  [IconType.Close]: "close",
  [IconType.RadioButton]: "radio_button_unchecked",
  [IconType.RadioButtonChecked]: "radio_button_checked",
  [IconType.Copyright]: "copyright",
  [IconType.Warning]: "warning",
  [IconType.Add]: "add",
  [IconType.Remove]: "remove",
  [IconType.Help]: "help",
  [IconType.Notifications]: "notifications",
  [IconType.NotificationsNone]: "notifications_none",
  [IconType.Photo]: "photo",
  [IconType.Fullscreen]: "fullscreen",
  [IconType.FullscreenExit]: "fullscreen_exit",
  [IconType.OpenInNew]: "open_in_new",
  [IconType.RSS]: "rss_feed",
  [IconType.Search]: "search",
};

const getIconName = (type: IconType): string => {
  return ICON_MAP[type];
};

interface IIconProps {
  type: IconType;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  style?: any;
}

export class Icon extends React.Component<IIconProps, any> {
  public get icon() {
    return this.props.type !== IconType.None ? (
      <i
        onClick={this.props.onClick}
        className={"material-icons"}
        style={this.props.style}
      >
        {getIconName(this.props.type)}
      </i>
    ) : null;
  }

  public render() {
    return this.icon;
  }
}
