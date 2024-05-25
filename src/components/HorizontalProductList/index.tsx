import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { BestSellersList } from '../../utils/dataObjects'
import { HorizontalProductCard } from '../HorizontalProductCard'

type Props = {}

export const HorizontalProductList = (props: Props) => {
  return (
    <FlatList
     data={BestSellersList}
     renderItem={({item})=><HorizontalProductCard product={item} />}
     keyExtractor={(item:any)=>item.id}
     horizontal={true}
     showsHorizontalScrollIndicator={false}
    />
  )
}

