import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../constants/context";
import Card from "../components/Card";

const Profile = () => {
  const [user, setUser] = useState();
  const { getUser, signOut } = React.useContext(AuthContext);

  useEffect(() => {
    getUser().then(data => {
      setUser(data);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={styles.profile}>
        <Image
          source={require("../assets/userIcon.png")}
          style={{
            width: 100,
            height: 100,
            marginHorizontal: "5%",
            position: "relative",
          }}
        />
        {user ? (
          <View style={styles.info}>
            <Text style={styles.text}>Имя: {user.firstname}</Text>
            <Text style={styles.text}>Отчество: {user.middlename}</Text>
            <Text style={styles.text}>Фамилия: {user.surname}</Text>
            <Text style={styles.text}>Почта: {user.email}</Text>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.signOut}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              signOut();
            }}
          >
            <Text style={{ ...styles.text, marginRight: "3%" }}>Выйти</Text>
            <MaterialCommunityIcons name="logout" size={20} />
          </TouchableOpacity>
        </View>
      </Card>

      <View style={{ margin: "5%", borderBottomWidth: 1 }}>
        <Text
          style={{ fontSize: 20, fontWeight: "800", paddingVertical: "1%" }}
        >
          Избранное
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {
    height: 200,
    marginVertical: "2%",
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flexDirection: "column",
    height: 100,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  signOut: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    padding: "5%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default Profile;
