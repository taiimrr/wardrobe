import React ,{useState} from 'react'
import { View, Text ,ScrollView, Image, TouchableOpacity ,} from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { COLORS,FONTS, SIZES } from '../constants/theme';

const CheckoutItems = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [itemQuantity, setItemQuantity] = useState(14);

  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <TouchableOpacity
            onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
            style={{
                height: 30,
                width: 30,
                backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':'#DCDCDC',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Feather size={16} color={colors.title} name='minus' />
        </TouchableOpacity>
        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title, width: 40, textAlign: 'center' }}>{itemQuantity}</Text>
        <TouchableOpacity
            onPress={() => setItemQuantity(itemQuantity + 1)}
            style={{
                height: 30,
                width: 30,
                backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':'#DCDCDC',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Feather size={16} color={colors.title} name='plus' />
        </TouchableOpacity>
    </View>
  )
}

export default CheckoutItems