import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, ActivityIndicator, View } from "react-native";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
import * as Font from "expo-font";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

//Screens
import AuthNav from "./navigation/AuthNav";
import HomeNav from "./navigation/HomeNav";
import SearchNav from "./navigation/SearchNav";
import ProfileNav from "./navigation/ProfileNav";
import Help from "./screens/Help";
//

import { AuthContext } from "./constants/context";
import Loading from "./components/Loading";
import Colors from "./constants/colors";

const Tab = createMaterialBottomTabNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    Menlo: require("./assets/fonts/Menlo-Regular.ttf"),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const theme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      background: "#ffffff",
      text: "#333333",
    },
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      getToken: async () => {
        try {
          const value = await AsyncStorage.getItem("userToken");
          if (value !== null) {
            return value;
          }
        } catch (e) {
          console.log(e);
        }
      },
      getUser: async () => {
        try {
          const value = await AsyncStorage.getItem("userInfo");
          if (value !== null) {
            return JSON.parse(value);
          }
        } catch (e) {
          console.log(e);
        }
      },
      signIn: async foundUser => {
        const userToken = String(foundUser.token);

        const user = {
          id: foundUser.UserID,
          email: foundUser.Email,
          firstname: foundUser.Firstname,
          middlename: foundUser.Middlename,
          surname: foundUser.Surname,
        };

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userInfo", JSON.stringify(user));
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: user.email, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userInfo");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!dataLoaded) {
    return (
      <Loading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  return (
    <SafeAreaProvider style={styles.screen}>
      <StatusBar translucent backgroundColor={Colors.secondary} />
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Tab.Navigator
                initialRoute="Home"
                activeColor="#2E4053"
                inactiveColor="#94B0B9"
                style={{ backgroundColor: "#000" }}
                barStyle={{ backgroundColor: Colors.secondary }}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeNav}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={28}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Search"
                  component={SearchNav}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="search1" color={color} size={28} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Profile"
                  component={ProfileNav}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={28}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Help"
                  component={Help}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="question"
                        color={color}
                        size={28}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            ) : (
              <AuthNav />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
