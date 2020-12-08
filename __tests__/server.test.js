const request = require("supertest");
const { app } = require("../server");

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwidXNlcklkIjoyLCJpYXQiOjE1MTYyMzkwMjJ9.TrFomIAUbnHYIIjj6Q38s43qqrxXtrfs80y2k7FqMQU";

describe("GET Endpoints:", () => {
  it("If token is invalid", async () => {
    let res = await request(app)
      .get("/movies")
      .set("Authorization", "Bearer InvalidToken");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toStrictEqual({ msg: expect.any(String) });

    res = await request(app)
      .get("/video?MovieID=1&Season=2&Episode=1")
      .set("Authorization", "Bearer InvalidToken");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toStrictEqual({ msg: expect.any(String) });
  });

  it("/movies", async () => {
    const res = await request(app)
      .get("/movies")
      .set("Authorization", "Bearer " + testToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toStrictEqual({
      MovieID: expect.any(Number),
      Title: expect.any(String),
      Type: expect.any(String),
      Genres: expect.any(Array),
      Directors: expect.any(Array),
      Rating: expect.any(String),
      Description: expect.any(String),
      ReleaseDate: expect.any(String),
      Seasons: expect.any(Array),
    });
  });

  it("/video", async () => {
    const res = await request(app)
      .get("/video?MovieID=1&Season=2&Episode=1")
      .set("Authorization", "Bearer " + testToken);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("video/mp4");
  });

  it("/image", async () => {
    const res = await request(app).get("/image?MovieID=1&Type=Poster");

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("image/jpeg");
  });
});
