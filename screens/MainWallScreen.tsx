import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootTabScreenProps } from "../types";

import { View } from "../components/Themed";

const MainWallScreen = ({ navigation }: RootTabScreenProps<"MainWall">) => {
  return (
    <View style={styles.container}>
      <Header>MainWallScreen</Header>
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

export default MainWallScreen;
