
import React from 'react'
import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransiction,

} from './styles';



export function HighlightCard() {
  return (
    <Container>
    <Header>
    <Title>
    Entradas
    </Title>
    <Icon
    name="arrow-up-circle"
    />
    </Header>
    <Footer>
    <Amount>R$ 17.400,00 </Amount>
    <LastTransiction>
    Última entrada dia 13 de abril
    </LastTransiction>
    </Footer>
    </Container>
  )
}
