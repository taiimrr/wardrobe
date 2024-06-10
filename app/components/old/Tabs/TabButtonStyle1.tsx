import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

const TabButtonStyle1 = ({ buttons, onClick, scrollX }) => {

    const theme = useTheme();
    const { colors } = theme;

    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
        inputRange: [0, SIZES.width - 60],
        outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
        inputRange: [0, SIZES.width - 60],
        outputRange: [0, -btnWidth],
    });

    return (
        <View
            style={{ ...styles.btnContainer, borderBottomWidth: 1, borderColor: colors.border }}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>

            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onClick(i)}>
                    <Text style={{ ...FONTS.font, ...FONTS.fontTitle, color: colors.text }}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    //{backgroundColor:'red'},
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={{ ...FONTS.font, ...FONTS.fontTitle, color: colors.title }}>{btn}</Text>
                        <View
                            style={{
                                height: 3,
                                width: btnWidth,
                                backgroundColor: COLORS.primary,
                                position: 'absolute',
                                bottom: 0,
                            }}
                        />
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        height: 45,
        flexDirection: 'row',
        width: '100%',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBtnContainer: {
        height: 45,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
    },
    animatedBtn: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default TabButtonStyle1;