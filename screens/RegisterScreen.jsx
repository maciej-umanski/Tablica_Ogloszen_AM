import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";

import { register, getUsers } from "../store/actions/users";
import { isPasswordInvalid, isEmailInvalid, isPhoneNumberInvalid } from "../utils/utils";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const clearErrors = () => {
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    setPhoneNumberError(false);
  };

  const onSignUp = () => {
    clearErrors();
    if (isEmailInvalid(users, email, setErrorMessage)) {
      setEmailError(true);
    } else if (isPasswordInvalid(password, rePassword, setErrorMessage)) {
      setPasswordError(true);
    } else if (isPhoneNumberInvalid(phoneNumber, setErrorMessage)) {
      setPhoneNumberError(true);
    } else {
      dispatch(
        register({ name: name, surname: surname, email: email, password: password, phone_number: phoneNumber }, () => {
          navigation.navigate("Root");
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate("Login")} />
      <Header>Create Account</Header>
      <TextInput label="Name" value={name} onChangeText={setName} error={nameError} errorText={errorMessage} />
      <TextInput label="Surname" value={surname} onChangeText={setSurname} error={surnameError} errorText={errorMessage} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        error={emailError}
        errorText={errorMessage}
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
      <Button mode="contained" onPress={onSignUp} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  error: {
    color: theme.colors.error,
    fontWeight: "bold",
  },
});

export default Register;
