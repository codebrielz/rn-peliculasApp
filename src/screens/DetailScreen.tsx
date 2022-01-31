import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';


const screenHeight = Dimensions.get('screen').height;

// Creamos una interface extendida de StackScreenProps, que maneja dos argumentos, principalmente cuando no sabemos de que tipo son los parametros recibidos, ponemos <any,any>, una vez sepamos que estamos recibiendo, ponemos de que tipo son, en este caso es de tipo <RootStackParams, 'DetailScreen'>
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

// Mediante la ruta, obtengo la data de la pelicula que hemos seleccionado
export const DetailScreen = ({ route, navigation }: Props) => {
  // dentro del route tengo almacenado la informacion de la pelicula que estoy recibiendo como argumento
  const movie = route.params;
  // url image
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, movieFull, cast } = useMovieDetails(movie.id);


  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <ActivityIndicator color='red' size={80} />
      </View>
    )
  }


  return (
    <ScrollView>
      <View style={styles.imageContainer}  >
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {
        (isLoading)
          ? <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />
          : <MovieDetails movieFull={movieFull!} cast={cast} />
      }
      {/* Boton para cerrar */}
      <View
          style={styles.backBottom}
      >
      <TouchableOpacity
        onPress={()=>navigation.pop()} //pop: lo lleva de vuelta a una pantalla anterior en la pila
      >
        <Icon
          color="white"
          name="arrow-back-outline"
          size={60}
        />
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    // overflow: 'hidden',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,

    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backBottom: {
    position: 'absolute',
    elevation: 9,
    top: 10,
    left: 10
  }
});