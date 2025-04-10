import { VideoType } from "./types/video";

export const videoDb = {
  video: <VideoType[]>[
    {
      id: 1,
      title: "string",
      author: "string",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: "2025-04-01T10:11:43.720Z",
      publicationDate: "2025-04-01T10:11:43.720Z",
      availableResolutions: ["144"],
    },
  ],
};
