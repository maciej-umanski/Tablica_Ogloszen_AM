import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AdvertCard from "../components/AdvertCard";

import { ScrollView } from "../components/Themed";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../store/actions/posts";

const MainWallScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
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
