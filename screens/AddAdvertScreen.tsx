import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { RootTabScreenProps } from "../types";
import { TextInput } from "react-native-paper";
import Button from "../components/Button";

import { View } from "../components/Themed";
import AddPhotoDialog from "../components/AddPhotoDialog";
import { Provider } from "react-native-paper";

const AddAdvertScreen = ({ navigation }: RootTabScreenProps<"AddAdvert">) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoDialogVisible, setPhotoDialogVisible] = React.useState(false);

  const showDialog = () => setPhotoDialogVisible(true);
  const hideDialog = () => setPhotoDialogVisible(false);

  return (
    <View style={styles.container}>
      <Header>Add New Advert</Header>
      <TextInput
        label="Title *"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description *"
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
        style={styles.input}
      />
      <TextInput
        label="Phone Number *"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
      />

      <Provider>
        <Button
          mode="contained"
          onPress={showDialog}
          style={styles.photoUploadBtn}
        >
          Add photo
        </Button>
        <AddPhotoDialog visible={photoDialogVisible} hideDialog={hideDialog} />
      </Provider>

      <Button
        mode="contained"
        onPress={() => null}
        style={styles.button}
        disabled={photoDialogVisible}
      >
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
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "transparent",
  },
  photoUploadBtn: {
    width: "50%",
  },
});

export default AddAdvertScreen;
