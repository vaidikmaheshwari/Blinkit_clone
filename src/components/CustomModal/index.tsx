import { View, Text, StyleSheet, Animated, PanResponder, Pressable, Image } from "react-native";
import React, { useRef } from "react";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";
import { cancelIcon } from "../../assets";



type Props = {
    children: React.ReactNode,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>,
};

export const CustomModal = ({ children, setModalVisible, setIsEdited }: Props) => {
    const touchThreshold = 50;
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (e, gestureState) => {
            const { dx, dy } = gestureState;
            return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
        },
        onPanResponderMove: Animated.event(
            [
                null,
                { dy: pan.y }
            ],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dy > 50) {
                setIsEdited && setIsEdited(false);
                setModalVisible(false);
            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            }
        }
    });
    return (
        <View style={[styles.modalView]}>
            <Animated.View style={[styles.container, { transform: [{ translateY: pan.y }] }]}
                {...panResponder.panHandlers}
            >
                <View style={styles.imageView}>
                    <Pressable onPress={() => {
                        setModalVisible(false);
                        setIsEdited && setIsEdited(false)
                    }}>
                        <View style={styles.imageBGcontainer}>
                            <Image source={cancelIcon} style={styles.image} />
                        </View>
                    </Pressable>
                </View>
                {children}
            </Animated.View>
        </View>
    );
};


const styles = StyleSheet.create({

    modalView: {
        flex: 1,
        backgroundColor: COLORS.TRANSPARENT,

    },
    container: {
        // height: responsiveHeight(800),
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        backgroundColor: COLORS.WHITE,

        maxHeight: screenHeight - responsiveHeight(120),
        borderTopLeftRadius: responsiveHeight(20),
        borderTopRightRadius: responsiveHeight(20),
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    imageView: {
        marginTop: -responsiveHeight(60),
    },
    imageBGcontainer: {
        backgroundColor: COLORS.BLACK,
        width: responsiveHeight(50),
        height: responsiveHeight(50),
        borderRadius: responsiveHeight(25),
        marginLeft: responsiveWidth(190),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        zIndex: 30,
        width: responsiveWidth(44),
        height: responsiveWidth(44),
        tintColor: COLORS.WHITE
    },

})

