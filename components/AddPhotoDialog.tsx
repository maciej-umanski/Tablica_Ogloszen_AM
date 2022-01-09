import * as React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";

type Props = {
  visible: boolean;
  hideDialog: () => void;
};

const AddPhotoDialog = ({ visible, hideDialog }: Props) => {
  return (
    <View>
      <Modal visible={visible}>
        <View style={styles.centeredView}>
          <Title>Upload Photo</Title>
          <View style={styles.row}>
            <Button mode="contained" onPress={() => null}>
              gallery
            </Button>
            <Button mode="contained" onPress={() => null}>
              camera
            </Button>
          </View>
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
  row: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
    justifyContent: "space-around",
    width: "80%",
  },
});

export default AddPhotoDialog;
