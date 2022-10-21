import React from 'react'
import { 
    Container,
    Title,
    Amount,
    Fotter,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles'

export interface TransactionCardProps{
    type:'positive'| 'negative';
    title: string;
    amount: string;
    category:Category
    date: string

}

export interface Category{
    name:string;
    icon:string;
}

interface Props{
    data:TransactionCardProps;
}


export function TransactionCard({
    data
}:Props) {
 return(
      <Container>
       <Title>{data.title}</Title>
       <Amount type= {data.type}> 
       {data.type === 'negative' && '- '}
       {data.amount}</Amount>
       <Fotter>
        <Category>
            <Icon name={data.category.icon}></Icon>
             <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
       </Fotter>

     </Container>
    )
  
}