import React, { useState, useEffect,useCallback } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from "victory-native";
import { useTheme } from 'styled-components';
import { categories } from '../../Utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import { 
    Container, 
    Header,
    Title,
    Content,
    ChartContainer
 } from './styles';

 export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category:string;
    date: string;
}

export interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume(){
    const [totalsByCategory, setTotalsByCategory] = useState<CategoryData[]>([]);
    const theme = useTheme();

    async function loadData(){
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
  
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
        .filter( (expensive: TransactionData) => expensive.type === 'negative')

        const totalByCategory: CategoryData[] =[];

        const expensivesTotal= expensives.reduce((acumulator:number,expensive:TransactionData)=>{
            return acumulator + Number(expensive.amount);
        },0);
        console.log(expensivesTotal)

        categories.forEach(category =>{
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum >0){
                const totalFormatted = categorySum
                .toLocaleString('pt-BR', {
                    style:'currency',
                    currency: 'BRL'
                })
                const percent = `${(categorySum / expensivesTotal *100).toFixed(0)}%`
                
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                    
                })
            }

        })
        console.log(totalByCategory);

        setTotalsByCategory(totalByCategory)
    }    

    useEffect( () => {
        loadData();
    },[])
    useFocusEffect(
        useCallback(() => {
          loadData();
        },[])
      )

    return (
        <Container>
            <Header>
                <Title>Resumo por Categorias</Title>
            </Header>
            <Content
            showsVerticalScrollIndicator={false}
             contentContainerStyle= {{
                
                paddingBottom:useBottomTabBarHeight()}}
            >
            <ChartContainer>
                <VictoryPie
                    data={totalsByCategory}
                    colorScale={totalsByCategory.map(category => category.color)}
                    style={{
                        labels: {
                            fontSize: RFValue(17),
                            fontWeight:'bold',
                            fill: theme.colors.shape
                        }
                    }}
                    labelRadius={60}
                    x="percent"
                    y="total"

                />
                </ChartContainer>
                { totalsByCategory.map(item =>(
                    <HistoryCard
                        key= {item.key}
                        title= {item.name}
                        amount= {item.totalFormatted}
                        color={item.color}
                    />
                    ))
                }
            </Content>
        </Container>    
    )
}

