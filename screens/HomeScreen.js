import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IOS } from "../constants/appConstants"
import { StatusBar } from "expo-status-bar"
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from "../theme"
import { useEffect, useState } from "react"
import TrendingMovies from "../components/TrendingMovies"
import MovieList from "../components/MovieList"
import { useNavigation } from "@react-navigation/native"
import { Loading } from "../components"
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api"

export default function HomeScreen() {
  const navigation = useNavigation()

  const [trending, setTrending] = useState([1, 2, 3])
  const [upcoming, setUpcoming] = useState([1, 2, 3])
  const [topRated, setTopRated] = useState([1, 2, 3])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([getTrendingMovies(), getUpcomingMovies(), getTopRatedMovies()]).finally(
      () => setLoading(false)
    )
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    if (data && data.results) {
      setTrending(data.results)
    }
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    if (data && data.results) setUpcoming(data.results)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    if (data && data.results) setTopRated(data.results)
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={IOS ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="#fff" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousel */}
          {trending?.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming?.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

          {/* top rated movies row */}
          {topRated?.length > 0 && <MovieList title="Top Rated" data={topRated} />}
        </ScrollView>
      )}
    </View>
  )
}
