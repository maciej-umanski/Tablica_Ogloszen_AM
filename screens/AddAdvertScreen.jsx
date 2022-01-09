import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet } from "react-native";
import { TextInput, Provider } from "react-native-paper";
import { View } from "../components/Themed";
import Header from "../components/Header";
import Button from "../components/Button";
import AddPhotoDialog from "../components/AddPhotoDialog";

import { createPost } from "../store/actions/posts";
import { getDateString } from "../utils/utils";

const AddAdvertScreen = ({ navigation }) => {
  const user = useSelector((state) => state.system.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoDialogVisible, setPhotoDialogVisible] = useState(false);

  const showDialog = () => setPhotoDialogVisible(true);
  const hideDialog = () => setPhotoDialogVisible(false);

  const addPost = () => {
    const newPost = {
      title: title,
      content: content,
      date: getDateString(new Date(), "yyyy-MM-dd HH:mm:ss"),
      author_id: user.id,
    };
    dispatch(
      createPost(newPost, () => {
        setTitle(""), setContent("");
        navigation.navigate("MyWall");
      })
    );
  };

  const allFieldsTyped = () => {
    if (title && content) return true;
    return false;
  };

  return (
    <View style={styles.container}>
      <Header>Add New Advert</Header>
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

      <Provider>
        <Button mode="contained" onPress={showDialog} style={styles.photoUploadBtn}>
          Add photo
        </Button>
        <AddPhotoDialog visible={photoDialogVisible} hideDialog={hideDialog} />
      </Provider>

      <Button mode="contained" onPress={addPost} style={styles.button} disabled={photoDialogVisible || !allFieldsTyped()}>
        Post
      </Button>
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
    width: 200,
  },
  photoUploadBtn: {
    width: "50%",
  },
  description: {
    lineHeight: 1.2,
    width: "80%",
    margin: 10,
    padding: 5,
  },
});

export default AddAdvertScreen;
