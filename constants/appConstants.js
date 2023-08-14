import { Dimensions, Platform } from "react-native"

export const IOS = Platform.OS === "ios"
export const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")
export const MIN_SEARCH_LENGTH = 2
