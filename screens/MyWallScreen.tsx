import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootTabScreenProps, Advert } from "../types";

import { ScrollView } from "../components/Themed";
import AdvertCard from "../components/AdvertCard";
import { exampleData } from "../exmpleData";

const MyWallScreen = ({ navigation }: RootTabScreenProps<"MyWall">) => {
  const showDetails = (itemId: string) =>
    navigation.navigate("Advert", { itemId });
  return (
    <ScrollView style={styles.container}>
      <Header>MyWallScreen</Header>
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

export default MyWallScreen;
