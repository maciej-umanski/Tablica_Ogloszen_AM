import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      outlineColor="lightgrey"
      mode="outlined"
      placeholderTextColor="grey"
      {...props}
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
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.primary,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
