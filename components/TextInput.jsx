import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      {...props}
      style={styles.input}
      theme={{ colors: { primary: "#145DA0" } }}
      outlineColor={theme.colors.primary}
      mode="outlined"
      placeholderTextColor="grey"
      activeOutlineColor={theme.colors.primary}
      underlineColor="transparent"
    />
    {props.error ? (
      <HelperText type="error" visible={true}>
        {errorText}
      </HelperText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
