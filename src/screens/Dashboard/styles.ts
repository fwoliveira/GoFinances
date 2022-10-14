import styled from 'styled-components/native';
import{ Feather } from '@expo/vector-icons'
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize'
// npm i react-native-iphone-x-helper --save
// import { getStatusBarHeight } from 'react-native-iphone-x-helper'



export const Container =styled.View`
flex:1;

background-color: ${({theme}) => theme.colors.background};

`;

export const Header =styled.View`
width: 100%;
background-color: ${({theme}) => theme.colors.blue};
height: ${RFPercentage(42)}px;
`
export const Userinfo= styled.View`
flex-direction: row;
align-items: center;




`
export const Photo= styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;
border-radius: 10px;

`
export const User = styled.View`
    margin-left: 17px;

`
export const UserGreething= styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size:${RFValue(18)}px ;
    font-family: ${({theme}) => theme.fonts.regular} ;

`
export const UserName= styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size:${RFValue(18)}px ;
    font-family: ${({theme}) => theme.fonts.bold} ;

`
export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 25px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(58)}px;
    /* margin-top:  $(getStatusBarHeight) + ${RFPercentage(58)}px; */
    /* para iphone */
`;
export const Icon =styled(Feather)`
     color: ${({theme}) => theme.colors.Orange};
     font-size: ${RFValue(24)}px;
     
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal:true ,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle:{paddingLeft:24}
})`
    flex-direction: row;
    width:100%;
    position: absolute;
     margin-top:${RFPercentage(24)}px; 
   

    
`

