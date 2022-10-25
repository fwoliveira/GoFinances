import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs(({theme}) => ({
  placeholderTextColorColor: theme.colors.text,
}))`
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  background-color: ${( {theme} ) => theme.colors.orange};
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${( {theme} ) => theme.colors.shape};
`;