import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Card from "../components/Card";
import Genres from "../components/Genres";
import { getVideoPath } from "../api";
import MoviePlayer from "../components/MoviePlayer";

const { width } = Dimensions.get("window");
const TEXTMARGINVERTICAL = "2%";
const pickerStyle = {
  inputIOS: {
    color: "black",
    width: 30,
    height: 30,
    textAlign: "center",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 3,
    fontSize: 15,
    fontWeight: "400",
  },
  inputAndroid: {
    color: "black",
    width: 80,
    height: 30,
    fontWeight: "400",
  },
};

const Movie = ({ movieInfo }) => {
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");

  const onChange = (curSeason, curEpisode) => {
    setSeason(curSeason);
    setEpisode(curEpisode);
  };

  return (
    <View style={styles.movieContainer}>
      <Card style={styles.movieInfo}>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Тип: {movieInfo.type}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Рейтинг: <Text style={{ color: "#ff6347" }}>{movieInfo.rating}</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>Жанры: </Text>
          {movieInfo.genres ? <Genres genres={movieInfo.genres} /> : null}
        </View>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Режисер: {movieInfo.directors ? movieInfo.directors.join(", ") : null}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Выпуск: {movieInfo.releaseDate}
        </Text>
        <Text style={{ marginVertical: TEXTMARGINVERTICAL }}>
          Описание: {movieInfo.description}
        </Text>
      </Card>
      {movieInfo.key ? (
        <Card style={styles.videoPlayerContainer}>
          <MoviePlayer
            uri={getVideoPath(
              movieInfo.key,
              movieInfo.seasons ? season : null,
              movieInfo.episodes ? episode : null
            )}
          />
          {movieInfo.seasons && movieInfo.episodes ? (
            <View style={styles.pickersContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: "5%" }}>Сезон</Text>
                <RNPickerSelect
                  items={movieInfo.seasons}
                  selectedValue={season}
                  placeholder={{}}
                  style={pickerStyle}
                  onValueChange={item => {
                    onChange(item, episode);
                  }}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: "5%" }}>Серия</Text>
                <RNPickerSelect
                  items={movieInfo.episodes}
                  selectedValue={episode}
                  placeholder={{}}
                  style={pickerStyle}
                  onValueChange={item => {
                    onChange(season, item);
                  }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <></>
      )}
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
  videoPlayerContainer: {
    marginVertical: "5%",
    width: width * (9 / 10),
  },
  pickersContainer: {
    marginVertical: "2%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Movie;
