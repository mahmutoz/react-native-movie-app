import { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon, StarIcon } from "react-native-heroicons/solid"
import { styles, theme } from "../theme"
import Loading from "../components/Loading"
import MovieList from "../components/MovieList"
import { SafeAreaView } from "react-native-safe-area-context"
import { IOS, WIDTH, HEIGHT } from "../constants/appConstants"
import Cast from "../components/Cast"
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500
} from "../api"

export default function MovieScreen() {
  const { params: item } = useRoute()
  const navigation = useNavigation()

  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      getMovieDetails(item?.id),
      getMovieCredits(item?.id),
      getSimilarMovies(item?.id)
    ]).finally(() => setLoading(false))
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    if (data) {
      setMovie({ ...movie, ...data })
    }
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    if (data && data.cast) {
      setCast(data.cast)
    }
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    if (data && data.results) {
      setSimilarMovies(data.results)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className="bg-neutral-900 flex-1"
        >
          <View className="w-full">
            <SafeAreaView
              className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${
                IOS ? "" : " mt-3"
              }`}
            >
              <TouchableOpacity
                style={styles.background}
                className="rounded-xl p-1"
                onPress={() => navigation.goBack()}
              >
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
              </TouchableOpacity>
            </SafeAreaView>
            <View>
              <Image
                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                style={{
                  width: WIDTH,
                  height: HEIGHT * 0.66
                }}
              />
              <LinearGradient
                colors={["transparent", "rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)"]}
                style={{ width: WIDTH, height: HEIGHT * 0.5 }}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 0.5, y: 1.2 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
          <View style={{ marginTop: -(HEIGHT * 0.08) }} className="space-y-2">
            {/* title */}
            <Text className="text-white text-center text-3xl font-bold tracking-widest">
              {movie?.title}
            </Text>

            {/* status, release year, runtime */}
            {movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
                {movie?.runtime} min
              </Text>
            ) : null}

            {/* genres  */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 !== movie.genres.length
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center"
                  >
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                )
              })}
            </View>

            {/* rating */}
            <View className="flex-row justify-center items-center space-x-1">
              <StarIcon size="20" color={theme.background} />
              <Text className="text-white text-xl font-bold tracking-widest">
                {item?.vote_average > 0 ? item?.vote_average?.toFixed(1) : "N/A"}
              </Text>
            </View>

            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">{movie?.overview}</Text>
          </View>

          {/* cast */}
          {movie?.id && cast?.length > 0 && <Cast navigation={navigation} cast={cast} />}

          {/* similar movies section */}
          {movie?.id && similarMovies?.length > 0 && (
            <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />
          )}
        </ScrollView>
      )}
    </>
  )
}
