import API_URL from "./constants/config";
const getImagePath = (ID, Type) =>
  `${API_URL}/image?MovieID=${ID}&Type=${Type}`;

export const getVideoPath = (ID, Season, Episode) => {
  Season = Season ? `&Season=${Season}` : "";
  Episode = Episode ? `&Episode=${Episode}` : "";
  return {
    uri: `${API_URL}/video?MovieID=${ID + Season + Episode}`,
  };
};

export const getTypesAndGenres = async () => {
  const results = await fetch(API_URL + "/types_genres").then(x => x.json());
  const info = {
    types: results.Types.map(item => (item = { label: item, value: item })),
    genres: results.Genres.map(item => (item = { label: item, value: item })),
  };
  info.types.unshift({ label: "Любые", value: "", selected: true });
  info.genres.unshift({ label: "Любые", value: "", selected: true });
  return info;
};

const getList = num => {
  const list = [];
  for (var i = 1; i <= num; i++) {
    list.push({ label: i.toString(), value: i.toString() });
  }
  return list;
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
      Seasons,
      Episodes,
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
      seasons: Seasons ? getList(Seasons) : null,
      episodes: Episodes ? getList(Episodes) : null,
    })
  );

  return movies;
};

// Authentication

export const checkUser = async (userName, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userName, password: password }),
  };

  const result = await fetch(API_URL + "/signin", requestOptions)
    .then(response => response.json())
    .then(data => data.user)
    .catch(e => {
      throw e;
    });

  return result;
};
