import { View, Text, StyleSheet, } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const AdminHomeScreen = (props: Props) => {
    return (

        <View style={styles.container}>

        </View>
    );
};

export default AdminHomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    }
})
