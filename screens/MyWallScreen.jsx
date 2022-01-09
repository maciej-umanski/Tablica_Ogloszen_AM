import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, Text } from "react-native";
import { ScrollView, View } from "../components/Themed";
import AdvertCard from "../components/AdvertCard";

import { getPosts } from "../store/actions/posts";

const MyWallScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.system.user);

  const [myPosts, setMyPosts] = useState(posts.filter((item) => item.author_id === user.id));

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
    }
  }, []);

  useEffect(() => {
    setMyPosts(posts.filter((item) => item.author_id === user.id));
  }, [posts, user]);

  useEffect(() => {
    if (route.params?.refresh) {
      dispatch(getPosts());
    }
  }, [route]);

  const showDetails = (itemId) => navigation.push("Advert", { itemId });

  const editPost = (itemId) => navigation.push("EditAdvert", { itemId });

  return myPosts.length ? (
    <ScrollView style={styles.scrollContainer}>
      {myPosts.map((item) => (
        <AdvertCard key={item.id} advert={item} showDetails={showDetails} editMode editPost={editPost} />
      ))}
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.noPostsInfo}>You have not got posts yet!</Text>
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
    color: "#a3a3a3",
    fontSize: 26,
    textAlign: "center",
  },
});

export default MyWallScreen;
