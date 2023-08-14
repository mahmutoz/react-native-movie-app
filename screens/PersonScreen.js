import React, { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native"
import { IOS, WIDTH, HEIGHT } from "../constants/appConstants"
import { styles, theme } from "../theme"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Loading, MovieList } from "../components"
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342
} from "../api"

const verticalMargin = IOS ? "" : "my-3"

export default function PersonScreen() {
  const { params: item } = useRoute()
  const navigation = useNavigation()

  const [isFavourite, setIsFavourite] = useState(false)
  const [person, setPerson] = useState({})
  const [personMovies, setPersonMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([getPersonDetails(item?.id), getPersonMovies(item?.id)]).finally(() =>
      setLoading(false)
    )
  }, [item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    if (data) {
      setPerson(data)
    }
  }
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    if (data && data.cast) {
      setPersonMovies(data.cast)
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={`flex-row justify-between items-center mx-4 z-10 ${verticalMargin}`}
      >
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
              <Image
                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                style={{ height: HEIGHT * 0.43, width: WIDTH * 0.74 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {/* Keanu Reeves */}
              {person?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {person?.place_of_birth}
              {/* Beirut, Lebanon */}
            </Text>
          </View>

          <View className="mx-3 px-4 py-2 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {/* Male */}
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <Text className="border-r border-r-neutral-400 items-center"></Text>
            <View className="items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday ? person?.birthday : "-"}
              </Text>
            </View>
            <Text className="border-r border-r-neutral-400 items-center"></Text>
            <View className="items-center">
              <Text className="text-white font-semibold">Known For:</Text>
              <Text className="text-neutral-300 text-sm">
                {/* Acting */}
                {person?.known_for_department ? person?.known_for_department : "-"}
              </Text>
            </View>
            <Text className="border-r border-r-neutral-400 items-center"></Text>
            <View className="">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {/* 84.23 % */}
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography ? person?.biography : "-"}
            </Text>
          </View>

          {/* person movies */}
          {person?.id && personMovies.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  )
}
