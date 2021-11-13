import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootTabScreenProps, Advert } from "../types";
import { exampleData } from "../exmpleData";
import AdvertCard from "../components/AdvertCard";

import { ScrollView } from "../components/Themed";

const MainWallScreen = ({ navigation }: RootTabScreenProps<"MainWall">) => {
  const showDetails = (itemId: string) =>
    navigation.navigate("Advert", { itemId });
  return (
    <ScrollView style={styles.container}>
      <Header>MainWallScreen</Header>
      {exampleData.map((item: Advert, index: number) => (
        <AdvertCard key={index} advert={item} showDetails={showDetails} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#f8f9fb",
  },
});

export default MainWallScreen;
