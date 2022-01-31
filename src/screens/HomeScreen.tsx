import React from 'react';
import { View, Text, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageColors from 'react-native-image-colors';

import Carousel from 'react-native-snap-carousel';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { obtenerColores } from '../helpers/obtenerColores';
import { useContext } from 'react';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidht } = Dimensions.get('window');


export const HomeScreen = () => {
  // peliculasEnCine contiene TODA LA DATA de las peliculas
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async(index:number) => {
    const movie = nowPlaying[index]
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary="green",secondary="orange"] = await obtenerColores(uri);
    setMainColors({primary, secondary});
  }

  useEffect(() => {
    if(nowPlaying.length >0){
      getPosterColors(0);
    }
  }, [nowPlaying]);
  


  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        {/* El ActivityIndicator es un indicador de actividad, en resumen, un Spinner que se va cuando la condicion es false (buenisimo para hacer cargas de API como esta) */}
        <ActivityIndicator color='red' size={80} />
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView>
      <View style={{ marginTop: top + 20 }}>

        {/* Carrousel principal */}
        <View
          style={{
            height: 440
          }}
        >
          <Carousel
            data={nowPlaying}
            // renderItem, recorre el arreglo o el 
            renderItem={({ item }: any) => <MoviePoster movie={item} />}
            sliderWidth={windowWidht}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
            onSnapToItem={(index => getPosterColors(index))}
          />
        </View>
        {/* Peliculas populares */}
        <HorizontalSlider title='Populares' movies={popular} />
        {/* Peliculas Top Rated */}
        <HorizontalSlider title='Top Rated' movies={topRated} />
         {/* Peliculas Up Coming */}
         <HorizontalSlider title='Up Coming' movies={upcoming} />
      </View>
    </ScrollView>
    </GradientBackground>

  );
};
