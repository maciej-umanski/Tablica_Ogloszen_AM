import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet } from "react-native";
import AdvertCard from "../components/AdvertCard";
import { ScrollView } from "../components/Themed";

import { getPosts } from "../store/actions/posts";

const MainWallScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
    }
  }, []);

  const showDetails = (itemId) => navigation.navigate("Advert", { itemId });
  return (
    <ScrollView style={styles.container}>
      {posts.map((item) => (
        <AdvertCard key={item.id} advert={item} showDetails={showDetails} />
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
