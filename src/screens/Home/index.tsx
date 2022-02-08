import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, 
{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarsDto';
import { LoadAnimation } from '../../components/LoadAnimation';



import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';


export function Home(){

  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;      
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  }); 

  const  navigation  = useNavigation();
  const theme = useTheme();

  function handleCarDetails(carDTO : CarDTO){
    navigation.navigate('CarDetails', { carDTO });
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }

  useEffect(() =>{
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }    

    fetchCars();
  },[])

  useEffect(() =>{
    BackHandler.addEventListener('hardwareBackPress', () => { return true;})
  },[])
 
   return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          { !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      { loading ? <LoadAnimation/> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
          <Car 
            data={item} 
            onPress={() => handleCarDetails(item)}
          />}
        />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[myCarButtonStyle,  
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }

          ]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
            style={[styles.buttom, { backgroundColor: theme.colors.main}]}  
          >
            <Ionicons 
              name='ios-car-sport'
              size={32}
              color={theme.colors.shape}
              />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttom: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})