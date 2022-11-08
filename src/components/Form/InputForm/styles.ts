import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
`;
export const Error = styled.Text`
    color: ${({theme}) => theme.colors.red}
    font-family: ${({theme}) => theme.fonts.regular};
    font-sze: ${RFValue(14)}px;    
`
    
