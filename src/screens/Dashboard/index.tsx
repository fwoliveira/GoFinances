import React,{useEffect, useState } from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import { Amount } from '../../components/HighlightCard/styles';
import { 
  Container, 
  Header,
  UserInfo,
  Photo,
  User,
  UserGreething,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,

} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}

export function Dashboard() {
    // const data: DataListProps[] = [
    //   {
    //     id: '1',
    //     type: 'positive',
    //     title:'Desenvolvimento de Sites',
    //     amount:'R$ 12.000,00',
    //     category:{
    //       name:'Vendas',
    //       icon:'dollar-sign'
    //     },
    //     date:'13/04/2020'
    //   },
    //   {
    //     id: '2',
    //     type: 'negative',
    //     title:'Pizza Hutt',
    //     amount:'R$59,00',
    //     category:{
    //       name:'Alimentação',
    //       icon:'coffee'
    //     },
    //     date:'10/04/2020'
    //   },
    //   {
    //     id: '3',
    //     type: 'negative',
    //     title:'Aluguél do apartamento',
    //     amount:'R$1.200,00',
    //     category:{
    //       name:'Casa',
    //       icon:'home'
    //     },
    //     date:'23/03/2020'
    //   }      

    // ]
    const[ data , setData] = useState<DataListProps[]>([])

    async function loadTransaction () {
      const dataKey = "@gofinances:transactions";
      const response = await AsyncStorage.getItem(dataKey);

      const transaction = response ? JSON.parse(response) : [];

      const trasactionsFormatted: DataListProps[] = transaction.map((item:DataListProps) =>{
        const amount = Number(item.amount).toLocaleString('pt-BR',{
          style:'currency',
          currency:'BRL'
        })
        const date = intl.DateTimeFormat(pt-BroadcastChannel,{
          day: '2-digit',
          month:'2-digit',
          year:'2-digit'
        }).format(new Date(item.date));
        return{
          id: item.id,
          name: item.title,
          amount: item.amount,
          
        }
      })
     
    }
    useEffect(()=>{
      loadTransaction();
    })

    return (
      <Container>
        <Header>
          <UserWrapper>

            <UserInfo>
              <Photo 
                source={ {uri:'https://avatars.githubusercontent.com/u/91294303?v=4'} }
              />
              <User>
                <UserGreething>Olá,</UserGreething>
                <UserName>William</UserName>
              </User>
            </UserInfo>

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
            title='Saidas'
            amount='R$ 1.259,00'
            lastTransaction='Última saída dia 03 de abril'
          />
          <HighlightCard 
            type="total"
            title='Total'
            amount='R$ 16.141,00'
            lastTransaction='01 à 16 de abril'
          />
        </HighlightCards>
        <Transactions>
          <Title>Listagem</Title>
          <TransactionList 
            data={data}
            keyExtractor={ item => item}
            renderItem={
              ( { item }) => 
              <TransactionCard data={item} />
            }
            
          />
        </Transactions>

      </Container>
    )
}