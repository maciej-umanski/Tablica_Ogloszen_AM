import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, ImageBackground, Alert } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderBackButton } from "react-navigation-stack";
import { View } from "../components/Themed";
import Header from "../components/Header";
import Button from "../components/Button";
import AddPhotoDialog from "../components/AddPhotoDialog";

import { getDateString } from "../utils/utils";
import { updatePost, removePost } from "../store/actions/posts";
import InfoPopup from "../components/InfoPopup";

const EditAdvertScreen = ({ navigation, route }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoDialogVisible, setPhotoDialogVisible] = useState(false);
  const [infoOpen, isInfoOpen] = useState(false);

  const showDialog = () => setPhotoDialogVisible(true);
  const hideDialog = () => setPhotoDialogVisible(false);

  const openModal = () => isInfoOpen(true);
  const closeModal = () => isInfoOpen(false);

  const allFieldsTyped = () => {
    if (title && content) return true;
    return false;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={() => navigation.navigate("MyWall", { refresh: true })} />,
    });
  }, [navigation]);

  useEffect(() => {
    const post = posts.find((item) => item.id === route.params.itemId);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPost(post);
    }
  }, [route.params.itemId]);

  const savePost = () => {
    dispatch(
      updatePost({ ...post, title: title, content: content, date: getDateString(post.date, "yyyy-MM-dd HH:mm:ss") }, () => {
        openModal();
        setTimeout(closeModal, 1000);
      })
    );
  };

  const deletePost = () => {
    dispatch(
      removePost(route.params.itemId, () => {
        navigation.navigate("MyWall", {
          refresh: true,
        });
      })
    );
  };

  const confirmedDeleting = () =>
    Alert.alert(`Delete "${post.title}"`, `Are you sure you want to delete post "${post.title}"?`, [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: deletePost },
    ]);

  return (
    <View style={styles.container}>
      <Header>{title}</Header>
      <TextInput label="Title *" value={title} onChangeText={setTitle} style={styles.input} mode="outlined" error={!title} />
      <TextInput
        label="Description *"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.description}
        mode="outlined"
        error={!content}
      />
      <TouchableOpacity onPress={showDialog}>
        <ImageBackground source={{ uri: "https://picsum.photos/700" }} style={styles.img}>
          <Text style={styles.editPhotoBtn}>Edit photo</Text>
        </ImageBackground>
      </TouchableOpacity>
      <AddPhotoDialog visible={photoDialogVisible} hideDialog={hideDialog} />

      <View style={styles.row}>
        <Button mode="contained" onPress={confirmedDeleting} style={styles.button} icon="delete">
          Delete
        </Button>
        <Button mode="contained" onPress={savePost} style={styles.button} disabled={!allFieldsTyped()}>
          Save
        </Button>
      </View>
      <InfoPopup visible={infoOpen} message="Saved !!" />
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
  input: {
    lineHeight: 1.2,
    width: "80%",
    margin: 10,
  },
  button: {
    width: "40%",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-around",
    width: "100%",
  },
  description: {
    lineHeight: 1.2,
    width: "80%",
    margin: 10,
    padding: 5,
  },
  img: {
    height: 200,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  editPhotoBtn: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    height: 200,
    width: 300,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 1,
  },
});

export default EditAdvertScreen;
