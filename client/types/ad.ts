export interface Ad {
  adArchiveID: string;
  adid: string;
  archiveTypes: number[];
  endDate: number;
  gatedType: string;
  isActive: boolean;
  isPromotedNews: boolean;
  pageID: string;
  pageName: string;
  snapshot: {
    ad_creative_id: string;
    cards: [];
    byline: string;
    caption: string;
    body: {
      __html: string;
    };
    display_format: "video" | "image";
    link_url: string;
    page_profile_uri: string;
    page_profile_picture_url: string;
    title: string;
    video: Video[];
  };
  startDate: number;
}

interface Video {
  video_hd_url: string;
  video_preview_image_url: string;
  video_sd_url: string;
}
