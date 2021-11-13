import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootStackScreenProps } from "../types";
import { View } from "../components/Themed";

const AdvertScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Advert">) => {
  return (
    <View style={styles.container}>
      <Header>{`AdvertScreen ${route.params.itemId}`} </Header>
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

export default AdvertScreen;
