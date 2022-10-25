import styled,{css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';

interface IconProps{
    type: 'up'| 'down'
    isActive: boolean
}

interface ContainerProps{
  type: 'up'| 'down'
  isActive: boolean
  
}



export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-direction: row;
  width: 48%;  
  align-items: center;
  justify-content: center;
  padding: 18px 36px;
  border-width: ${({isActive})=> isActive ? 0 : 1.5 }px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text} ;
  border-radius: 5px;
  ${({type,isActive}) => isActive && type === 'up' && css` background-color:${({theme}) => theme.colors.green_light}`}
  ${({type,isActive}) => isActive && type === 'down' && css` background-color:${({theme}) => theme.colors.red_light}`}


    
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular} ;
  color:${({theme}) => theme.colors.title} ;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color:${({theme,type,}) => type === 'up' ? theme.colors.green : theme.colors.red_light} ;
  ${({type,isActive}) => isActive && type === 'up' && css` color:${({theme}) => theme.colors.green_light}`}
  ${({type,isActive}) => isActive && type === 'down' && css`color:${({theme}) => theme.colors.red_light}`}

`;