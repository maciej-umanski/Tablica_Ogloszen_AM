import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootTabScreenProps } from "../types";

import { View } from "../components/Themed";
import Button from "../components/Button";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Profile">) => {
  const onLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Header>ProfileScreen</Header>
      <Button mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});

export default ProfileScreen;
