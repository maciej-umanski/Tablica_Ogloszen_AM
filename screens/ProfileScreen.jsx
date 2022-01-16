import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import InfoPopup from "../components/InfoPopup";

import { logoutUser } from "../store/actions/system";
import { updateUser, getUsers } from "../store/actions/users";
import { isPasswordInvalid, isPhoneNumberInvalid } from "../utils/utils";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedUser = useSelector((state) => state.system.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [infoOpen, isInfoOpen] = useState(false);

  const openModal = () => isInfoOpen(true);
  const closeModal = () => isInfoOpen(false);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
    setName(loggedUser.name);
    setSurname(loggedUser.surname);
    setPassword(loggedUser.password);
    setRePassword(loggedUser.password);
    setEmail(loggedUser.email);
    setPhoneNumber(loggedUser.phone_number);
  }, []);

  const clearErrors = () => {
    setPasswordError(false);
    setErrorMessage("");
    setPhoneNumberError(false);
  };

  const onLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Login");
  };

  const onEdit = () => {
    clearErrors();
    if (isPasswordInvalid(password, rePassword, setErrorMessage)) {
      setPasswordError(true);
    } else if (isPhoneNumberInvalid(phoneNumber, setErrorMessage)) {
      setPhoneNumberError(true);
    } else {
      dispatch(
        updateUser(
          { ...loggedUser, name: name, surname: surname, email: email, password: password, phone_number: phoneNumber },
          (responseData) => {
            openModal();
            setTimeout(closeModal, 1000);
          }
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput label="Name" value={name} onChangeText={setName} />
      <TextInput label="Surname" value={surname} onChangeText={setSurname} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        disabled
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType={"phone-pad"}
        error={phoneNumberError}
        errorText={errorMessage}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={passwordError}
        errorText={errorMessage}
      />
      <TextInput
        label="Repeat Password"
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry
        error={passwordError}
        errorText={errorMessage}
      />
      <Button mode="contained" onPress={onEdit} style={styles.button}>
        Edit
      </Button>
      <Button mode="contained" onPress={onLogout}>
        Logout
      </Button>
      <InfoPopup visible={infoOpen} message="Edited !!" />
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
});

export default ProfileScreen;
