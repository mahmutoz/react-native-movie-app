import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
import { WIDTH, HEIGHT } from "../constants/appConstants";

export default function Loading() {
  return (
    <View
      style={{ width: WIDTH, height: HEIGHT }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  );
}
