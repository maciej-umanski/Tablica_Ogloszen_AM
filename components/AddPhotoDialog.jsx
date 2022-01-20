import * as React from "react";

import { View, Modal, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";

const AddPhotoDialog = ({ visible, hideDialog, navigation, postId }) => {

  const openCamera = () => {
    navigation.navigate("Camera", { postId: postId });
    hideDialog();
  };

  return (
    <View>
      <Modal visible={visible}>
        <View style={styles.centeredView}>
          <Title style={styles.items}>Upload Photo</Title>
          <Button mode="contained" style={styles.items} onPress={openCamera}>
            camera
          </Button>
          <Button onPress={hideDialog}>Cancel</Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  items: {
    marginBottom: 25,
  },
});

export default AddPhotoDialog;
