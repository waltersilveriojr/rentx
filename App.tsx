import React  from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components'

import { Routes } from './src/routes';

import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold  
} from '@expo-google-fonts/archivo'


import theme from './src/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold 
  });

  if(!fontLoaded){
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Routes/>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

