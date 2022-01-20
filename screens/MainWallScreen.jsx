import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, View, Text } from "react-native";
import AdvertCard from "../components/AdvertCard";
import { ScrollView } from "../components/Themed";
import { theme } from "../core/theme";

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
  return posts.length ? (
    <ScrollView style={styles.scrollContainer}>
      {posts.map((item) => (
        <AdvertCard key={item.id} advert={item} showDetails={showDetails} />
      ))}
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.noPostsInfo}>There's no posts yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 30,
    backgroundColor: "#f8f9fb",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  noPostsInfo: {
    color: theme.colors.secondary,
    fontSize: 26,
    textAlign: "center",
  },
});

export default MainWallScreen;
