import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../core/theme";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { RootStackScreenProps } from "../types";

import { Text, View } from "../components/Themed";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    //TODO: walidacja danych logowania
    //TODO: Prawidłowe przełączenie okna lub modal informujący o niepowodzeniu
    navigation.navigate("Root");
  };
  return (
    <View style={styles.container}>
      <Header>Login</Header>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(pswd) => setPassword(pswd)}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
