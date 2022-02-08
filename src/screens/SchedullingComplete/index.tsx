import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButtom } from '../../components/ConfirmButtom';

import {
 Container,
 Content,
 Title,
 Message,
 Footer
} from './styles';
import { useNavigation } from '@react-navigation/native';



export function SchedullingComplete(){
   
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleConfirm(){
    navigation.navigate('Home' as never);
  }

  return (
    <Container>
      <StatusBar 
        barStyle={"light-content"} 
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg  width={width}/>
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a consecionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
        <Footer>
          <ConfirmButtom title='OK' onPress={handleConfirm}/>
        </Footer>
      </Content>
    </Container>
  );
}