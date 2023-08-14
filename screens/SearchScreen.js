import React, { useCallback, useState } from "react"
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native"
import { Loading } from "../components"
import { XMarkIcon } from "react-native-heroicons/outline"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { debounce } from "lodash"
import { WIDTH, HEIGHT, MIN_SEARCH_LENGTH } from "../constants/appConstants"
import { fallbackMoviePoster, image185, searchMovies } from "../api"

export default function SearchScreen() {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [textLength, setTextLength] = useState(0)

  const handleSearch = (search) => {
    if (search && search.length > MIN_SEARCH_LENGTH) {
      setLoading(true)
      searchMovies({
        query: search,
        include_adult: false,
        language: "tr-TR",
        page: "1"
      }).then((data) => {
        setLoading(false)
        if (data && data.results) setResults(data.results)
      })
    } else {
      setLoading(false)
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), [])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* search input */}
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          onTextInput={(e) => setTextLength(e.nativeEvent.text.length)}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="py-2 pl-4 pr-4 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-2 m-1 bg-neutral-500"
        >
          <XMarkIcon size="16" color="white" />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{ uri: image185(item?.poster_path) || fallbackMoviePoster }}
                      className="rounded-3xl"
                      style={{ width: WIDTH * 0.44, height: HEIGHT * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item?.title?.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image source={require("../assets/img/movieTime.png")} className="h-96 w-96" />
        </View>
      )}
    </SafeAreaView>
  )
}
