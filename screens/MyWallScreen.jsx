import React, { useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";

import { ScrollView } from "../components/Themed";
import AdvertCard from "../components/AdvertCard";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../store/actions/posts";

const MyWallScreen = ({ navigation }) => {
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

  const showDetails = (itemId) => navigation.navigate("Advert", { itemId });

  return (
    <ScrollView style={styles.container}>
      <Header>My Posts</Header>
      {myPosts.map((item) => (
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

export default MyWallScreen;
