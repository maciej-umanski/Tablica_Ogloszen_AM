import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Platform} from "react-native";
import { IconButton } from "react-native-paper";
import { Camera } from "expo-camera";
import {SERVER_HOST} from "../conf";
import axios from "axios";
import uuid from 'react-native-uuid';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
    data.append('photo', {
      name: name,
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    return data;
  };

  const takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let filename = uuid.v4() + '.jpg';
      let body = createFormData(photo,filename);
      axios.post(`${SERVER_HOST}/upload`, body).then((response) => {
        console.log(response.data);
      }).catch((error) => {console.log(error)})

      //zdjęcie zostało zapisane do bazy danych pod adresem ${SERVER_HOST}/uploads/filename

      //zapis id z serwera do bazy danych jako posts.photo
      //aktualizacja zdjecia na tablicy MainWall i MyWall
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
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
  actionButton: {
    color: "red",
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default CameraScreen;
