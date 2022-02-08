import React from "react";
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { SchedullingComplete } from "../screens/SchedullingComplete";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

import { RootStackParamList } from ".";

const { Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return(
    <Navigator screenOptions={{headerShown:false }} initialRouteName="Splash">
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Schedulling"
        component={Schedulling}
      />
      <Screen
        name="SchedullingDetails"
        component={SchedullingDetails}
      />
      <Screen
        name="SchedullingComplete"
        component={SchedullingComplete}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}