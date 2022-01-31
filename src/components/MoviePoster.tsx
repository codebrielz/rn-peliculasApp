import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface';
import { DetailScreen } from '../screens/DetailScreen';


interface Props {
    movie: Movie;
    height?:number;
    width?:number;
}

export const MoviePoster = ({ movie, height=420, width=300 }: Props) => {

    // Aqui llamo simplemente la imagen de la pelicula
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const navigation:any = useNavigation();


    return (
        // Cuando nosotros seleccionamos alguna pelicula, se activa la ruta DetailScreen, a su vez, mandamos como segundo argumento la movie, que movie, contiene toda la data de la pelicula seleccionada.
        <TouchableOpacity
        onPress={()=>navigation.navigate('DetailScreen', movie)}
        activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal:2,
                paddingBottom:20,
                paddingHorizontal:7
            }}
        >
            <View
                style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18
    },
    imageContainer: {
        flex:1,
        borderRadius:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    }
});