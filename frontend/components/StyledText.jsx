import * as React from "react";

import { Text } from "./Themed";

export function MonoText({ style }) {
  return <Text {...props} style={[style, { fontFamily: "space-mono" }]} />;
}
