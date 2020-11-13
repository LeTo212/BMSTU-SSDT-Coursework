import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { getMovies, getTypesAndGenres } from "../api";
import Loading from "../components/Loading";
import MovieListItem from "../components/MovieListItem";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const Search = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [list, setList] = useState({});
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      const list = await getTypesAndGenres();

      setMovies(movies);
      setList(list);
      setFilteredMovies(movies);
    };

    if (movies.length === 0 || Object.keys(list).length === 0) {
      fetchData(movies, list);
    }
  }, [movies, list]);

  if (movies.length === 0 || Object.keys(list).length === 0) {
    return <Loading />;
  }

  const onChangeSearch = (query, filterType, filterGenre) => {
    if (query.length === 0 && filterType === "" && filterGenre === "") {
      setFilteredMovies(movies);
    } else {
      const list = movies.filter(movie => {
        return (
          movie.title.toLowerCase().includes(query.toLowerCase()) &&
          movie.type.includes(filterType) &&
          (filterGenre === "" ? true : movie.genres.includes(filterGenre))
        );
      });
      setFilteredMovies(list);
    }
    setSearchQuery(query);
    setType(filterType);
    setGenre(filterGenre);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", Colors.primary]}
        style={{
          height: height / 3,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />

      <Searchbar
        placeholder="Поиск"
        onChangeText={query => {
          onChangeSearch(query, type, genre);
        }}
        value={searchQuery}
        style={
          Platform.OS === "ios" ? styles.searchbarIOS : styles.searchbarAndroid
        }
      />

      <View
        style={
          Platform.OS === "android"
            ? styles.dropDownPickersContainerAndroid
            : styles.dropDownPickersContainerIOS
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: "2%" }}>Тип</Text>
          <DropDownPicker
            items={list.types}
            defaultValue={type}
            containerStyle={{ height: 40, width: 100 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={item => {
              onChangeSearch(searchQuery, item.value, genre);
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: "2%" }}>Жанр</Text>
          <DropDownPicker
            items={list.genres}
            defaultValue={genre}
            containerStyle={{ height: 40, width: 100 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={item => {
              onChangeSearch(searchQuery, type, item.value);
            }}
          />
        </View>
      </View>

      <FlatList
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingTop: "5%" }}
        data={filteredMovies}
        renderItem={movie => (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate("Movie", { movie: movie.item })}
          >
            <MovieListItem key={movie.key} movie={movie.item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  searchbarAndroid: {
    marginTop: "3%",
    marginHorizontal: "5%",
    shadowOpacity: 0.1,
  },
  searchbarIOS: {
    marginTop: 0,
    marginHorizontal: "5%",
    borderColor: "rgba(158, 150, 150, 0.5)",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 3,
  },
  dropDownPickersContainerAndroid: {
    marginVertical: "2%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropDownPickersContainerIOS: {
    marginVertical: "2%",
    width: "100%",
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Search;
