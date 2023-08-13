import { Dimensions, Platform } from "react-native";

export const IOS = Platform.OS === "ios";
export const ANDROID = Platform.OS === "android";
export const { WIDTH, HEIGHT } = Dimensions.get("window");
