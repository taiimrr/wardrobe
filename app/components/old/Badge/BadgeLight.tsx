import React from 'react'
import { View, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme'

const BadgeLight = ({ title, color, style, rounded, size, text }) => {
    return (
        <View
            style={[{ position: 'relative', height: 20 },
            size === 'md' && {
                height: 26,
            },
            size === 'lg' && {
                height: 32,
            },
            style && { ...style }]}
        >
            <View
                style={[{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: color ? color : COLORS.primary,
                    opacity: .15,
                    borderRadius: SIZES.radius,
                }, rounded && {
                    borderRadius: 30,
                }]}
            />
            <View
                style={[{
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                }, size === "md" && {
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                }, size === "lg" && {
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                }]}
            >
                <Text style={[
                    {
                        ...FONTS.fontXs,
                        color: color ? color : text ? COLORS.title : COLORS.primary
                    },
                    size === "md" && {
                        fontSize: 13,
                    },
                    size === "lg" && {
                        fontSize: 15,
                        lineHeight: 20,
                    }]}>{title}</Text>
            </View>
        </View>
    )
}

export default BadgeLight