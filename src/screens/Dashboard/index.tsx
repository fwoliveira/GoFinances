import React from 'react'
import { Container,Header,Userinfo,Photo,User,UserGreething,UserName,UserWrapper,Icon,HighlightCards } from './styles'
import { HighlightCard } from '../../components/HighlightCard'

export function Dashboard() {
 return(
      <Container>
        <Header>
          <UserWrapper>
          <Userinfo>
            <Photo
            source={ { uri:'https://avatars.githubusercontent.com/u/91294303?v=4' } }
            />
            <User>
              <UserGreething>Olá</UserGreething>
              <UserName>William</UserName>
            </User>
          </Userinfo>
          <Icon name="power" />
          </UserWrapper>
        </Header>
        <HighlightCards>
        <HighlightCard
        type="up"
        title='Entradas'
        amount='R$ 17.400,00'
        lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
        type="down"
        title='Saídas'
        amount='R$ 1.259,00'
        lastTransaction='Última saída dia 03 de abril'
        />
        <HighlightCard
        type="total"
        title='Total'
        amount='R$ 16.141,00'
        lastTransaction='01 à 16 de abril'/>
        </HighlightCards>
     </Container>
    )
  
}
   
  
