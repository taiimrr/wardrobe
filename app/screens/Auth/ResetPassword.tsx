import { View, Text,  ScrollView,TouchableOpacity,Image, Platform } from 'react-native'
import React from 'react'
import {  useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons,Feather } from '@expo/vector-icons';
import { IMAGES } from '../../constants/Images';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

type ResetPasswordScreenProps = StackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetPassword = ({navigation} : ResetPasswordScreenProps) => {

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    
  return (
    <View style={{backgroundColor:colors.card,flex:1}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View style={{height:undefined,width:'100%',aspectRatio:1/.5,backgroundColor:COLORS.secondary,borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                    <View style={{marginTop:-30,marginLeft:5}}>
                        <Text style={[FONTS.fontJostExtraLight,{fontSize:105,color:'rgba(255,255,255,0.50)'}]}>SHOES</Text>
                        <Text style={[FONTS.fontBold,{fontSize:100,color:'rgba(255,255,255,0.50)',marginTop:Platform.OS === 'android' ? -40 :-60}]}>SHOES</Text>
                    </View>
                    <View style={{position:'absolute',top:10,left:10,zIndex:15}}>
                        <TouchableOpacity 
                            onPress={() =>  navigation.goBack()}
                            style={[GlobalStyleSheet.backbtn,{backgroundColor:theme.dark ? COLORS.primary :colors.card}]}
                            >
                                <Ionicons size={24} color={colors.title} name='chevron-back'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute',height:'100%',width:'100%',left:Platform.OS === 'android' ? 60 : 30,top:Platform.OS === 'android' ? -55 : 0}}>
                        <Image
                            style={{height:Platform.OS === 'android' ? '180%':'130%',aspectRatio:1/1,resizeMode:'contain'}}
                            source={IMAGES.item1}
                        />
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <View style={{marginTop:60}}>
                        <Text style={[FONTS.fontMedium,{fontSize:24,color:colors.title}]}>Enter New Password</Text>
                        <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Your new password must be different from previously used password.</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <View>
                            <Input
                                backround
                                inputLg
                                // value={''}
                                type='password'  
                                placeholder="Password"
                                onChangeText={(value)=> console.log(value)}
                                icon={<Feather style={{}} name={'lock'} size={20} color={colors.title}/> }
                            />
                        </View>
                        <View style={{marginTop:15}}>
                            <Input
                                backround
                                inputLg
                                // value={''}
                                type='password'   
                                placeholder="Confirm Password"
                                onChangeText={(value)=> console.log(value)}
                                icon={<Feather style={{}} name={'lock'} size={20} color={colors.title}/> }
                            />
                        </View>
                    </View>
                
                </View>
            </View>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                <Button
                    title='Continue'
                    color={theme.dark ? COLORS.white :COLORS.primary}
                    text={theme.dark ? COLORS.primary : COLORS.white}
                    onPress={() => navigation.navigate('Login')}
                />
                <View style={{paddingTop:10}}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Back To</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{
                                ...FONTS.fontMedium,
                                // borderBottomWidth: 1,
                                // borderBottomColor: colors.title,
                                color: colors.title,
                                textDecorationLine:'underline'
                            }}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default ResetPassword