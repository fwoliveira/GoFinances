
import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen'
import theme from './src/global/styles/theme';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
}from '@expo-google-fonts/poppins'
SplashScreen.preventAutoHideAsync();
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn/index';

import { AuthContext } from './src/Utils/AuthContext';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  if(!fontsLoaded) return null;

    SplashScreen.hideAsync();
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
      <SignIn/>
      </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}


