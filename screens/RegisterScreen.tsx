import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import {theme} from "../core/theme";
import {RootStackScreenProps} from "../types";

const Register = ({navigation}: RootStackScreenProps<"Register">) => {
  let [name, setName] = useState("");
  const [nameError, setNameError] = useState(false)
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const users = require("../storage/database.json")

  const clearErrors = () => {
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setErrorMessage("")
  }

  const isNameInvalid = () => {
    if (users.find((user: User) => user.name == name)) {
      setErrorMessage("Username is taken!");
      return true;
    } else if (name.length <= 5) {
      setErrorMessage("Username must contain more than 5 characters!");
      return true;
    }
    return false;
  }

  const isPasswordInvalid = () => {
    if (password.length <= 5){
      setErrorMessage("Password must contain more than 5 characters!");
      return true;
    }else if (!password.match(rePassword)) {
      setErrorMessage("Provided passwords are not equal!");
      return true;
    }
    return false;
  }

  const onSignUp = () => {
    clearErrors()

    if (isNameInvalid()) {
      setNameError(true);
    } else if (isPasswordInvalid()) {
      setPasswordError(true);
    }else{
      navigation.navigate("Root");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate("Login")} />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        error={nameError}
        errorText={errorMessage}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        error={emailError}
        errorText={errorMessage}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        error={passwordError}
        errorText={errorMessage}
      />

      <TextInput
        label="Repeat Password"
        value={rePassword}
        onChangeText={(text) => setRePassword(text)}
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
});

export default Register;
