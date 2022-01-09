import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";

import { register, getUsers } from "../store/actions/users";

const Register = ({ navigation, register, users, getUsers }) => {
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
    getUsers();
  }, []);

  //TODO: uzupełnić walidację dla numeru telefonu i nazwiska
  //TODO: Uwaga name to imie wiec moze sie powtarzać, a logowanie odbywa sie poprzez unikalny email i haslo

  const clearErrors = () => {
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    setPhoneNumberError(false);
  };

  const isNameInvalid = () => {
    if (users.find((user) => user.name == name)) {
      setErrorMessage("Username is taken!");
      return true;
    } else if (name.length <= 5) {
      setErrorMessage("Username must contain more than 5 characters!");
      return true;
    }
    return false;
  };

  const isPasswordInvalid = () => {
    if (password.length <= 5) {
      setErrorMessage("Password must contain more than 5 characters!");
      return true;
    } else if (!password.match(rePassword)) {
      setErrorMessage("Provided passwords are not equal!");
      return true;
    }
    return false;
  };

  const onSignUp = () => {
    clearErrors();
    if (isNameInvalid()) {
      setNameError(true);
    } else if (isPasswordInvalid()) {
      setPasswordError(true);
    } else {
      register({ name: name, surname: surname, email: email, password: password, phone_number: phoneNumber }, () => {
        navigation.navigate("Root");
      });
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
    color: "red",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  register,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
