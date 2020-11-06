import API_URL from "./constants/config";
const getImagePath = (ID, Type) =>
  `http://localhost:5555/image?MovieID=${ID}&Type=${Type}`;

export const getVideoPath = (ID, Season, Episode) => {
  Season = Season ? `&Season=${Season}` : "";
  Episode = Episode ? `&Season=${Episode}` : "";
  return {
    uri: `http://localhost:5555/video?MovieID=${ID + Season + Episode}`,
  };
};

export const getMovies = async () => {
  const results = await fetch(API_URL + "/movies").then(x => x.json());

  const movies = results.map(
    ({
      MovieID,
      Title,
      Type,
      Genres,
      Directors,
      Rating,
      Description,
      ReleaseDate,
    }) => ({
      key: String(MovieID),
      title: Title,
      type: Type,
      genres: Genres,
      directors: Directors,
      rating: Rating,
      description: Description,
      releaseDate: ReleaseDate,
      poster: getImagePath(MovieID, "Poster"),
      backdrop: getImagePath(MovieID, "Backdrop"),
    })
  );

  return movies;
};
