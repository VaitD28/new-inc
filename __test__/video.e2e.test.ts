// @ts-ignore
import request from "supertest";
// @ts-ignore
import express from "express";

import { setupApp } from "../src/setup-app";
import { VideoInputDto, VideoInputPutDto } from "../src/dto/video.input-dto";
import { HTTP_STATUSES } from "../src/statuses";
import { Resolutions } from "../src/types/video";
import { title } from "process";

describe("Video API", () => {
  const app = express();
  setupApp(app);

  const testVideoData: VideoInputDto = {
    title: "Hobby",
    author: "Voitkevich",
    availableResolutions: ["Р144"],
  };

  const testPutVideoData: VideoInputPutDto = {
    title: "Hobby",
    author: "Voitkevich",
    canBeDownloaded: true,
    minAgeRestriction: 18,
    availableResolutions: ["Р144"],
    publicationDate: "2025-03-28T21:55:06.737Z",
  };

  beforeAll(async () => {
    await request(app)
      .delete("/api/testing/all-data")
      .expect(HTTP_STATUSES.NO_CONTENT_204);
  });

  it("should create video; POST /api/video", async () => {
    const newVideo: VideoInputDto = {
      title: "Hobby",
      author: "Voitkevich",
      availableResolutions: ["P144"],
    };

    const createdVideoResponse = await request(app)
      .post("/api/videos")
      .send(newVideo)
      .expect(HTTP_STATUSES.CREATED_201);
  });

  it("should return video list; GET /api/videos", async () => {
    await request(app)
      .post("/api/videos")
      .send({ ...testVideoData })
      .expect(HTTP_STATUSES.CREATED_201);

    await request(app)
      .post("/api/videos")
      .send({ ...testVideoData })
      .expect(HTTP_STATUSES.CREATED_201);

    const videoListResponse = await request(app)
      .get("/api/videos")
      .expect(HTTP_STATUSES.OK_200);

    expect(videoListResponse.body).toBeInstanceOf(Array);
    expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should return video by id; GET /api/videos/:id", async () => {
    const createResponse = await request(app)
      .post("/api/videos")
      .send({ ...testVideoData, name: "Another Video" })
      .expect(HTTP_STATUSES.CREATED_201);

    const getResponse = await request(app)
      .get(`/api/videos/${createResponse.body.id}`)
      .expect(HTTP_STATUSES.OK_200);

    expect(getResponse.body).toEqual({
      ...createResponse.body,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });

  it("should update video; PUT /api/videos/:id", async () => {
    const createResponse = await request(app)
      .post("/api/videos")
      .send({ ...testVideoData, name: "Another Video" })
      .expect(HTTP_STATUSES.CREATED_201);

    const videoUpdateData: VideoInputPutDto = {
      title: "Hobby",
      author: "Voitkevich",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      availableResolutions: ["Р144"],
      publicationDate: "2025-03-28T21:55:06.737Z",
    };

    await request(app)
      .put(`/api/videos/${createResponse.body.id}`)
      .send(videoUpdateData)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    const videoResponse = await request(app).get(
      `/api/videos/${createResponse.body.id}`
    );

    expect(videoResponse.body).toEqual({
      ...videoUpdateData,
      id: createResponse.body.id,
      createdAt: expect.any(String),
    });
  });

  it("DELETE /api/video/:id and check after NOT FOUND", async () => {
    const {
      body: { id: createdVideoId },
    } = await request(app)
      .post("/api/videos")
      .send({ ...testVideoData, name: "Another Video" })
      .expect(HTTP_STATUSES.CREATED_201);

    await request(app)
      .delete(`/api/videos/${createdVideoId}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    const videoResponse = await request(app).get(
      `/api/videos/${createdVideoId}`
    );
    expect(videoResponse.status).toBe(HTTP_STATUSES.NOT_fOUND_404);
  });
});
