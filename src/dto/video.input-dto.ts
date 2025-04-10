import { Resolutions } from "../types/video";

export type VideoInputDto = {
  title: string;
  author: string;
  availableResolutions: typeof Resolutions;
};

export type VideoInputPutDto = {
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  availableResolutions: typeof Resolutions;
  publicationDate: string;
};
