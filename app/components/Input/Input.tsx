import React, { useState } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

type Props = {
    placeholder ?: string,
    value ?: string,
    defaultValue ?: string,
    onChangeText ?: (e:any) => void,
    onFocus ?: (e:any) => void,
    onBlur ?: (e:any) => void,
    type ?: string,
    numberOfLines ?: any,
    icon ?: any,
    inputSm ?: any,
    inputLg ?: any,
    inputRounded ?: any,
    style ?: any,
    multiline ?: boolean,
    backround ?: any,
    keyboardType?:string
}

const Input = ({
    placeholder,
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    type,
    numberOfLines,
    multiline,
    icon,
    inputSm,
    inputLg,
    inputRounded,
    style,
    backround,
    keyboardType
}: Props) => {

    const [showPass , setShowPass] = useState<boolean>(true);
    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    return (
        <View>
            {icon &&
                <View
                    style={{
                        position:'absolute',
                        height:'100%',
                        width:58,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRightWidth:1,
                        borderRightColor:colors.border,
                        zIndex:9
                    }}
                >
                    {icon}
                </View>
            }
            <TextInput
                style={[styles.input,{
                    backgroundColor:backround ? colors.card :colors.input,
                    borderColor:colors.border,
                    color: colors.title,
                    fontSize:backround ? 18 : 14,
                },numberOfLines && {
                    height : 'auto',
                    paddingVertical:14,
                    textAlignVertical:'top',
                },icon && {
                    paddingLeft:70,
                },inputRounded && {
                    borderRadius:45,
                },inputSm && {
                    height:40,
                },inputLg && {
                    height:60,
                },style && {
                    ...style
                }]}
                multiline={multiline ? multiline : false}
                secureTextEntry={type === 'password' ? showPass : false}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                onFocus={onFocus}
                //keyboardType={'number-pad'}
                onBlur={onBlur}
                numberOfLines={numberOfLines}
                placeholderTextColor={theme.dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)'}
            />
            {type === "password" &&
                <TouchableOpacity
                    style={[styles.passBtn,{height:backround ? 60 :48}]}
                    onPress={() => setShowPass(!showPass)}
                >
                    <Feather size={18} color={colors.title} name={showPass ? 'eye-off' : 'eye'} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles= StyleSheet.create({
    input : {
        ...FONTS.font,
        height : 48,
        backgroundColor:'rgba(255,255,255,0.03)',
        borderRadius:8,
        paddingHorizontal:15,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'rgba(255,255,255,.1)',
        color:COLORS.white,
    },
    passBtn : {
        position:'absolute',
        right:0,
        top:0,
        height:48,
        width:48,
        alignItems:'center',
        justifyContent:'center',
        opacity:.7,
    }
})

export default Input;