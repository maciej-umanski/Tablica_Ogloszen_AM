import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { SERVER_HOST } from "../conf";
import axios from "axios";
import uuid from "react-native-uuid";

import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { IconButton } from "react-native-paper";

const CameraScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  let camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const createFormData = (photo, name) => {
    const data = new FormData();
    data.append("photo", {
      name: name,
      type: "image/jpg",
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });
    return data;
  };

  const takePhoto = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      const filename = uuid.v4() + ".jpg";
      const body = createFormData(photo, filename);
      axios
        .post(`${SERVER_HOST}/upload`, body)
        .then((response) => {
          const filename = response.data.filename;
          closeCamera(filename);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  closeCamera = (filename) => {
    if (route.params.postId) {
      navigation.navigate("EditAdvert", { itemId: route.params.postId, filename: filename });
    } else {
      navigation.navigate("AddAdvert", { filename: filename });
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          this.camera = ref;
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <IconButton icon="camera" color="grey" size={20} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});

export default CameraScreen;
