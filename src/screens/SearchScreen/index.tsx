import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { DeliveryFooter, SearchBar, SearchComponent, SearchResultComponent } from '../../components'
import { COLORS } from '../../constants'


type Props = {

}

export const SearchScreen = ({ }: Props) => {
    const [searchTxt, setSearchTxt] = useState<string>('');
    return (
        <SafeAreaView style={styles.container} >
            <SearchBar placeholderTxt='atta, dal, coke and more' searchTxt={searchTxt} setSearchTxt={setSearchTxt} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {
                    searchTxt != '' ? <SearchResultComponent /> : <SearchComponent />
                }
            </ScrollView>

            <DeliveryFooter />


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    }
})
