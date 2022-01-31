import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MoviePoster } from './MoviePoster';

interface Props{
    title?:string,
    movies: Movie[]
}

export const HorizontalSlider = ({title,movies}:Props) => {
  return (
    <View style={{
        height: (title) ? 260 : 220
      }}>
        {/* FlatList propio de rn */}
        {
            // Si existe el title, entonces muestra este componente, si no no hagas nada.
            (title) && (<Text
            style={{ fontSize: 30, fontWeight: 'bold', marginLeft:10 }}
          >{title}</Text>)
        }
        <FlatList
          data={movies}
          renderItem={({ item }: any) => (
            <MoviePoster
              movie={item}
              width={140}
              height={200}
            />
          )}
          // keyExtractor comprende que el item es de tipo Movie ya que el componente a renderizar contiene una interface que pide una movie de tipo Movie, entonces simplemente accedemos al item de tipo Movie y buscamos el id, como el id es de tipo number, lo convertimos a string ya que la funcion keyExtractor retorna un string
          keyExtractor={(item) => item.id.toString()}
          // horizontal es para hacer scroll horizontalmente ya que por defecto es vertical
          horizontal={true}
          // oculta la barra de scroll horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
  );
};
