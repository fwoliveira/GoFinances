import React,{useCallback, useEffect, useState } from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import LoadingAnimator from '../../components/LoadingAnimation/index';




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
  LoadContainer

} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface HighlightProps{
  amount: string;
  lastTransaction: string;
} 

interface HighlightData{
  entries: HighlightProps
  expensives:HighlightProps
  total: HighlightProps

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
    function getLastTransactionDate(
      collections: DataListProps[],
      type: 'positive' | 'negative') 
    {
      const lastTransaction = new Date(
        Math.max.apply(Math, collections
          .filter(transaction => transaction.type === type)              
          .map(transaction => new Date(transaction.date).getTime())
      ))
      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month:'long'})}`; 
    }



    const [isLoading, setIsLoading] = useState(true)
    const[ transaction , setTransaction] = useState<DataListProps[]>([])
    const [highlightData , setHighlightData]= useState <HighlightData>({}as HighlightData)
    const theme = useTheme();
    async function loadTransaction () {
      const dataKey = "@gofinances:transactions";
      const response = await AsyncStorage.getItem(dataKey);

      const transaction = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal= 0;


      const trasactionsFormatted: DataListProps[] = transaction.map((item:DataListProps) =>{

         if(item.type ==='positive'){
          entriesTotal+= Number(item.amount);
         } else{
          expensiveTotal+= Number(item.amount);

         }


        
        const amount = Number(item.amount).toLocaleString('pt-BR',{
          style:'currency',
          currency:'BRL'
        })
        const date = Intl.DateTimeFormat('pt-BR',{
          day: '2-digit',
          month:'2-digit',
          year:'2-digit'
        }).format(new Date(item.date));
        return{
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date

          
        }
      })
      setTransaction(trasactionsFormatted)
    //  console.log(trasactionsFormatted);
    const lastTransactionEntries = getLastTransactionDate(transaction, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transaction, 'negative');
    const totalInterval =`01 a ${lastTransactionExpensives}`





     const total = entriesTotal - expensiveTotal

     setHighlightData({
      entries:{
        amount: entriesTotal.toLocaleString('pt-BR',{
          style:'currency',
          currency:'BRL'
        }),
        lastTransaction:`Ùltima entrada dia ${lastTransactionEntries}`

      } ,
      expensives:{
        amount: expensiveTotal.toLocaleString('pt-BR',{
          style:'currency',
          currency:'BRL'
        }),
        lastTransaction:`Ùltima saida dia ${lastTransactionExpensives}`

      } ,
      total:{
        amount: total.toLocaleString('pt-BR',{
          style:'currency',
          currency:'BRL'
        }),
        lastTransaction:totalInterval

      } 
     })
     setIsLoading(false);
    }
    useEffect(()=>{
      loadTransaction();
      //limpa
      // const dataKey = "@gofinances:transactions";
      // AsyncStorage.removeItem(dataKey);

    },[])
    useFocusEffect(
      useCallback(() => {
        loadTransaction();
      },[])
    )
    

    return (
      <Container>
        {
          isLoading ? <LoadContainer> 
            {/* <ActivityIndicator color={theme.colors.blue} size="large" /> */}
            <LoadingAnimator/>
          
           </LoadContainer> : <>
        
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
            amount={highlightData?.entries?.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          />
          <HighlightCard 
            type="down"
            title='Saidas'
            amount={highlightData?.expensives?.amount}
            lastTransaction={highlightData.expensives.lastTransaction}
          />
          <HighlightCard 
            type="total"
            title='Total'
            amount={highlightData?.total?.amount}
            lastTransaction={highlightData.total.lastTransaction}
          />
        </HighlightCards>
        <Transactions>
          <Title>Listagem</Title>
          <TransactionList 
            data={transaction}
            keyExtractor={ item => item.id}
            renderItem={
              ( { item }) => 
              <TransactionCard data={item} />
            }
            
          />
        </Transactions> 
        </>
        }


      </Container>
    )
}