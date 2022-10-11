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
        <HighlightCard/>
        <HighlightCard/>
        <HighlightCard/>
        </HighlightCards>
     </Container>
    )
  
}
   
  
