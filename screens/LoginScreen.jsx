import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import { Text } from "../components/Themed";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

import { loginUser } from "../store/actions/system";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogIn, isInvalidLogIn] = useState(false);

  const clearData = () => {
    setEmail("");
    setPassword("");
    isInvalidLogIn(false);
  };

  const onLogin = () => {
    dispatch(
      loginUser({ email: email, password: password }, (responseData) => {
        if (responseData?.success) {
          isInvalidLogIn(false);
          navigation.navigate("Root");
          clearData();
        } else {
          isInvalidLogIn(true);
        }
      })
    );
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Header>Login</Header>
      <TextInput
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput label="Password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
      {invalidLogIn ? (
        <View style={styles.row}>
          <Text style={styles.error}>Invalid Email or Password</Text>
        </View>
      ) : null}
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  error: {
    color: "red",
    fontWeight: "bold",
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
    backgroundColor: "white",
    color: "black",
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  emailInput: {
    lineHeight: 1.2,
    width: "80%",
  },
});

export default Login;
