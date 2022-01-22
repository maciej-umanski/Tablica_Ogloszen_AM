import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const InfoPopup = ({ message, visible }) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Title>{message}</Title>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default InfoPopup;
