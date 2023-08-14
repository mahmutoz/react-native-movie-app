import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IOS } from "../constants/appConstants";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loading, MovieList } from "../components";

const verticalMargin = IOS ? "" : "my-3";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavourite, setIsFavourite] = useState(false);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView
        className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}
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
                source={require("../assets/img/castImage2.png")}
                // source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                style={{ height: height * 0.43, width: width * 0.74 }}
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

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {/* Male */}
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {/* 1964-09-02 */}
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">known for</Text>
              <Text className="text-neutral-300 text-sm">
                {/* Acting */}
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
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
              {person?.biography ? person.biography : "N/A"}
            </Text>
          </View>

          {/* person movies */}
          {person?.id && personMovies.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
