import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';

// Utilizo type cuando el mapeo no va a ser extendido
// Utilizo interface cuando el mapeo puede o no ser extendido
// Creamos un type para manejar las rutas y su tipado.
export type RootStackParams = {
  // HomeScreen no recibe ningúna informacion
  HomeScreen:undefined,
  // DetailScreen recibe la data Movie de nuestro movieInterface
  DetailScreen:Movie, //recibe una pelicula como argumento
}

// Al crear la navegacion Stack, le indicamos que es de tipo RootStackParams
const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}