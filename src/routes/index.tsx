import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './Stack.Routes';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarDTO } from '../dtos/CarsDto';
    
export type RootStackParamList = {
  Home: undefined,
  CarDetails: { carDTO : CarDTO },
  Schedulling: Object ,
  SchedullingDetails: Object,
  SchedullingComplete: undefined,
  MyCars: undefined,
  Splash:undefined

};
    
const RootStack = createNativeStackNavigator<RootStackParamList>();

export function Routes(){
   return (
     <NavigationContainer>
       <StackRoutes/>
     </NavigationContainer>
  );
}