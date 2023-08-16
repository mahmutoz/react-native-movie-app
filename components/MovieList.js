import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native"
import { styles, theme } from "../theme"
import { WIDTH, HEIGHT } from "../constants/appConstants"
import React from "react"
import { fallbackMoviePoster, image185 } from "../api"
import { useNavigation } from "@react-navigation/native"

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation()

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="relative mr-4">
                <Image
                  source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                  className="rounded-3xl mb-1"
                  style={{
                    width: WIDTH * 0.33,
                    height: HEIGHT * 0.22
                  }}
                />
                <Text
                  className="absolute right-2 top-2 text-white p-1 text-[9px] font-bold rounded-full"
                  style={{ backgroundColor: theme.background }}
                >
                  {item?.vote_average > 0 ? item?.vote_average?.toFixed(1) : "N/A"}
                </Text>
                <Text
                  className={`text-neutral-300 ml-1 whitespace-pre-wrap max-w-[130px]`}
                >
                  {item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}
