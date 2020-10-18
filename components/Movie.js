import React from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";

import Card from "../components/Card";
import Genres from "../components/Genres";
import MoviePlayer from "../components/MoviePlayer";

const { width } = Dimensions.get("window");
const TEXTMARGINVERTICAL = "2%";

const Movie = props => {
  return (
    <View style={styles.movieContainer}>
      <Card style={styles.movieInfo}>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Тип: {props.movieInfo.type}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Рейтинг:{" "}
          <Text style={{ color: "#ff6347" }}>{props.movieInfo.rating}</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>Жанры: </Text>
          {props.movieInfo.genres ? (
            <Genres genres={props.movieInfo.genres} />
          ) : null}
        </View>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Режисер:{" "}
          {props.movieInfo.directors
            ? props.movieInfo.directors.join(", ")
            : null}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Выпуск: {props.movieInfo.releaseDate}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Описание: {props.movieInfo.description}
        </Text>
      </Card>
      <MoviePlayer uri={props.movieInfo.movieURI} />
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  movieInfo: {
    width: width * (9 / 10),
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "5%",
  },
});

export default Movie;
