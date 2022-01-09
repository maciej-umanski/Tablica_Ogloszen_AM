import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import call from "react-native-phone-call";

import { StyleSheet, Image, Alert } from "react-native";
import { Paragraph, Button, Text } from "react-native-paper";
import Header from "../components/Header";
import { View } from "../components/Themed";

import { getDateString } from "../utils/utils";

const AdvertScreen = ({ route }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [callError, setCallError] = useState(false);

  const getPost = () => {
    const post = posts.find((item) => item.id === route.params.itemId);
    if (post) {
      setPost(post);
    }
  };

  useEffect(() => {
    getPost();
  }, [route.params.itemId]);

  useEffect(() => {
    if (users.length) {
      setAuthor(users.find((item) => item.id === post?.author_id));
    } else {
      dispatch(
        getUsers((responseData) => {
          setAuthor(responseData.find((item) => item.id === post?.author_id));
        })
      );
    }
  }, [post]);

  makePhoneCall = () => {
    if (author?.phone_number) {
      const args = {
        number: author?.phone_number,
        prompt: false,
      };
      call(args).catch(() => setCallError(true));
    } else {
      setCallError(true);
    }
  };

  callAlert = () => Alert.alert("Call error", "Invalid phone number or another error with calling", [{ text: "OK" }]);

  return post ? (
    <View style={styles.container}>
      <Header style={styles.title}>{post?.title}</Header>
      <Text style={styles.details}>{`Author: ${author?.name} ${author?.surname} Date: ${getDateString(post?.date)}`}</Text>
      <Paragraph style={styles.content}>{post?.content}</Paragraph>
      <Image source={{ uri: "https://picsum.photos/700" }} style={styles.img} />
      <Button style={styles.contact} mode="contained" icon="phone" onPress={makePhoneCall}>{`${author?.phone_number}`}</Button>
      {callError ? callAlert() : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
  },
  details: {
    fontSize: 14,
    marginBottom: 10,
  },
  content: {
    minHeight: "20%",
  },
  contact: {
    fontSize: 24,
    width: "50%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  img: {
    minHeight: "30%",
    width: "100%",
    alignSelf: "center",
    flexGrow: 1,
  },
});

export default AdvertScreen;
