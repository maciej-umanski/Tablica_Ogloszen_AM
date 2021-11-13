import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

type Props = {
  visible: boolean;
  hideDialog: () => void;
};

const AddPhotoDialog = ({ visible, hideDialog }: Props) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Upload Photo</Dialog.Title>
          <Dialog.Content
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button mode="contained" onPress={() => null}>
              gallery
            </Button>
            <Button mode="contained" onPress={() => null}>
              camera
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddPhotoDialog;
