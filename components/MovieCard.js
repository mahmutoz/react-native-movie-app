import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import { image500 } from "../api"
import { HEIGHT, WIDTH } from "../constants/appConstants"
import { theme } from "../theme"

export default function MovieCard({ item, handleClick, index }) {
  return (
    <TouchableWithoutFeedback key={index} onPress={() => handleClick(item)}>
      <View className="relative">
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: WIDTH * 0.6,
            height: HEIGHT * 0.4
          }}
          className="rounded-3xl"
        />
        <Text
          className="absolute right-2 top-2 text-white p-1 text-lg font-bold rounded-full"
          style={{ backgroundColor: theme.background }}
        >
          {item?.vote_average > 0 ? item?.vote_average?.toFixed(1) : "N/A"}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
