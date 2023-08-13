import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native";
import { styles } from "../theme";
import { WIDTH, HEIGHT } from "../constants/appConstants";
import React from "react";

export default function MovieList({ title, data }) {
  let movieName = "MovieList";

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See all
          </Text>
        </TouchableOpacity>
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
              <View className="mr-4">
                <Image
                  source={require("../assets/img/moviePoster2.png")}
                  className="rounded-3xl"
                  style={{
                    width: WIDTH * 0.33,
                    height: HEIGHT * 0.22
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title?.length > 14
                    ? item?.title?.slice(0, 14) + "..."
                    : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
      <Text>MovieList</Text>
    </View>
  );
}
