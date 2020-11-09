import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Movie from "../components/Movie";
import Card from "../components/Card";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const BACKDROP_HEIGHT = height * 0.65;

const MoviePage = props => {
  const movie = props.route.params.movie;
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ alignItems: "center" }}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
        <LinearGradient
          colors={[Colors.primary, "rgba(0, 0, 0, 0)"]}
          style={{
            height: BACKDROP_HEIGHT / 2,
            zIndex: 1,
            width,
            position: "absolute",
            top: 0,
          }}
        />
        <Image
          source={{ uri: movie.backdrop }}
          blurRadius={2}
          style={{
            width,
            height: BACKDROP_HEIGHT,
            position: "absolute",
          }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", Colors.primary]}
          style={{
            height: BACKDROP_HEIGHT,
            width,
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
      <Image source={{ uri: movie.poster }} style={styles.posterImage} />
      <Card style={styles.titleContainer}>
        <Text style={styles.title}>{movie.title}</Text>
      </Card>
      <Movie movieInfo={movie} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.primary,
  },
  posterImage: {
    width: 200,
    height: ITEM_SIZE,
    resizeMode: "cover",
    borderRadius: 24,
    marginTop: "5%",
  },
  titleContainer: {
    paddingHorizontal: "1%",
    maxWidth: width * (9 / 10),
    marginVertical: "5%",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: "5%",
  },
});

export default MoviePage;
