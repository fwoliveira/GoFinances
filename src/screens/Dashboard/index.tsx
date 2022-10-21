import React from 'react'
import { Container,Header,Userinfo,Photo,User,UserGreething,UserName,UserWrapper,Icon,HighlightCards,Transactions,Title, TransactionsList } from './styles'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

export interface DataListProps extends TransactionCardProps{
  id:string

}

export function Dashboard() {

    const data: DataListProps[] =[
      {
        type: 'positive',
        id:"1",
        title:"Desenvolvimento de site",
            amount:"R$ 12.000,00",
            category:{
            name:"Vendas",
            icon:"dollar-sign"
           },
            date:"13/04/2020"
      },
      {
        id:"2",
        type:'negative',
        title:"Hamburgueria Pizzy",
          amount:"R$ 59,00",
          category:{
            name:"Alimentação" ,
            icon:"coffee"
          },
          date:"10/04/2020"
      },
      {
        id:"3",
        type:'negative',
        title:"Aluguel do apartamento",
          amount:"R$ 1.200,00",
          category:{name:"Casa",
        icon:"home"},
        date:"27/03/2020"
      }
    ]

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
        <Transactions>
          <Title>
          Listagem
          </Title>
          <TransactionsList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>
            <TransactionCard data={item}/>}
          
          />
          {/* <TransactionCard />
          <TransactionCard/>
           <TransactionCard/>
          </TransactionsList> */}

        </Transactions>


     </Container>
    )
  
}
   
  
