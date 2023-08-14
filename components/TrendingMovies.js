import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import Carousel from "react-native-snap-carousel"
import { WIDTH, HEIGHT } from "../constants/appConstants"
import { useNavigation } from "@react-navigation/native"
import { image500 } from "../api"

export default function TrendingMovies({ data }) {
  const navigation = useNavigation()
  const handleClick = (item) => {
    navigation.navigate("Movie", item)
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item, index }) => (
          <MovieCard item={item} index={index} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={WIDTH}
        itemWidth={WIDTH * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick, index }) => {
  return (
    <TouchableWithoutFeedback key={index} onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: WIDTH * 0.6,
          height: HEIGHT * 0.4
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
}
