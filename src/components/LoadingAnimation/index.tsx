import React from 'react';
import LottierView from 'lottie-react-native';

import {Container} from './styles';

export default function LoadingAnimator() {
  return (
    <Container>
        <LottierView
            source= {require('../../assets/pie-chart.json')}
            style={{height:300}}
            resizeMode="contain"
            loop
            autoPlay
            />
      </Container>
      )
      }