import { View, Text } from 'react-native'
import React from 'react'
import { RecentSearch } from '../RecentSearch'
import { DiscoverBrands } from '../DiscoverBrands'
import { HorizontalProductList } from '../HorizontalProductList'

type Props = {}

export const SearchComponent = (props: Props) => {
  return (
    <View>
      <RecentSearch />
      <DiscoverBrands />
      <HorizontalProductList />
    </View>
  )
}

