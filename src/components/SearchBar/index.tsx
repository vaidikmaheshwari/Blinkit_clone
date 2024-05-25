import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { cancel, leftArrow, microphone, search } from '../../assets'
import { useNavigation } from '@react-navigation/native'

type Props = {
  placeholderTxt?: string;
  searchTxt?: string;
  setSearchTxt?: React.Dispatch<React.SetStateAction<string>> | any;
}

export const SearchBar = ({ placeholderTxt, searchTxt, setSearchTxt }: Props) => {

  const [showCancel, setShowCancel] = useState<boolean>(false);

  const navigation = useNavigation();
  const onChangeTxt = (value: string) => {
    setSearchTxt(value);
    setShowCancel(true);
  }

  return (
    <View style={styles.searchContainer}>

      <View style={styles.searchView}>
        <View style={styles.iconLeftContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={leftArrow} style={{ height: responsiveHeight(22), width: responsiveWidth(30) }} />

          </Pressable>

        </View>
        <View style={styles.inputContainer}>

          <TextInput
            cursorColor={COLORS.BLACK}
            value={searchTxt}
            style={styles.input}
            placeholder={`Search for ${placeholderTxt}`}
            onChangeText={(value: string) => onChangeTxt(value)}

          />
          {showCancel && <>
            <Pressable onPress={() => {
              setSearchTxt('');
              setShowCancel(false);
            }}>
              <Image source={cancel} style={{ height: responsiveHeight(14), width: responsiveWidth(14), opacity: 0.5, tintColor: COLORS.LIGHT_PENCIL }} />
            </Pressable>
            <View style={{ width: 1, backgroundColor: COLORS.LIGHT_PENCIL, height: responsiveHeight(20), opacity: 0.2, marginLeft: responsiveWidth(5) }}></View>
          </>
          }
        </View>
      </View>

      <View style={styles.iconContainer}>


        <Image source={microphone} style={{ height: responsiveHeight(20), width: responsiveWidth(16) }} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: responsiveHeight(8),
    height: responsiveHeight(45),
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(380),
  },
  iconLeftContainer: {
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(5)

  },
  iconContainer: {
    marginRight: responsiveWidth(10),


  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: responsiveWidth(5),
    width: responsiveWidth(315),

  },
});

