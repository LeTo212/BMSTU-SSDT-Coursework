export const getMovies = async () => {
  const movies = [
    {
      key: "1",
      title: "Клинок, рассекающий демонов",
      poster:
        "https://animego.org/media/cache/thumbs_500x700/upload/anime/images/5ca8e16ebd092601180598.jpg",
      backdrop:
        "https://animego.org/media/cache/thumbs_500x700/upload/anime/images/5ca8e16ebd092601180598.jpg",
      rating: 9.5,
      description: "Description",
      releaseDate: "2019",
      genres: ["Аниме", "Сериал"],
    },
    {
      key: "2",
      title: "Атака титанов",
      poster:
        "https://animego.org/media/cache/thumbs_500x700/upload/anime/images/5cc6f62732aa1674607637.jpg",
      backdrop:
        "https://animego.org/media/cache/thumbs_500x700/upload/anime/images/5cc6f62732aa1674607637.jpg",
      rating: 9.2,
      description: "Description",
      releaseDate: "2019",
      genres: ["Аниме", "Сериал"],
    },
  ];

  return movies;
};
