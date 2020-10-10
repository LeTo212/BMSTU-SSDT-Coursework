import React, { useState } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";

//Screens
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
//

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

  if (!dataLoaded) {
    return (
      <Loading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRoute="Home"
          activeColor="#2E4053"
          inactiveColor="#94B0B9"
          style={{ backgroundColor: "#000" }}
          barStyle={{ backgroundColor: Colors.secondary }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="camera-metering-spot"
                  color={color}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
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
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
