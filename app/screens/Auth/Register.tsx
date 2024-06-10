import React, {useState} from 'react'
import { View, Text,  ScrollView, Image,TouchableOpacity, Platform } from 'react-native'
import {  useTheme } from '@react-navigation/native';
import { COLORS ,FONTS} from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input/Input';
import { Feather,FontAwesome } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import SocialBtn from '../../components/Socials/SocialBtn';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import Checkbox from 'expo-checkbox';


type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation} : RegisterScreenProps) => {

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    const [isChecked, setChecked] = useState(false);

  return (
    <View style={{backgroundColor:colors.card,flex:1}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{padding:0,}]}>
                <View style={{height:undefined,width:'100%',aspectRatio:1/.5,backgroundColor:COLORS.secondary,borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                    <View style={{marginTop:-30,marginLeft:5}}>
                        <Text style={[FONTS.fontJostExtraLight,{fontSize:105,color:'rgba(255,255,255,0.50)'}]}>SHOES</Text>
                        <Text style={[FONTS.fontBold,{fontSize:100,color:'rgba(255,255,255,0.50)',marginTop:Platform.OS === 'android' ? -40 :-60}]}>SHOES</Text>
                    </View>
                    <View style={{position:'absolute',top:10,left:10}}>
                        <TouchableOpacity 
                            onPress={() =>  navigation.goBack()}
                            style={[GlobalStyleSheet.backbtn,{backgroundColor:theme.dark ? COLORS.primary :colors.card}]}
                            >
                                <Ionicons size={24} color={colors.title} name='chevron-back'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute',height:'100%',width:'100%',left:Platform.OS === 'android' ? 70 : 50,top:Platform.OS === 'android' ? -50 : 0}}>
                        <Image
                            style={{height:Platform.OS === 'android' ? '170%':'130%',width:'100%',aspectRatio:1/1,resizeMode:'contain'}}
                            source={IMAGES.item2}
                        />
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                        <View style={{marginTop:60}}>
                            <Text style={[FONTS.fontMedium,{fontSize:24,color:colors.title}]}>Create Your Account</Text>
                            <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Welcome Back! Please Enter Your Details</Text>
                        </View>
                        <View style={{marginTop:20}}>
                            <View>
                                <Input
                                    backround
                                    inputLg
                                    placeholder="Name"
                                    onChangeText={(value)=> console.log(value)}
                                    icon={<Feather style={{}} name={'user'} size={20} color={colors.title}/> }
                                />
                            </View>
                            <View style={{marginTop:15,}}>
                                <Input
                                    backround
                                    inputLg
                                    placeholder="Email Address"
                                    onChangeText={(value)=> console.log(value)}
                                    icon={<Feather style={{}} name={'mail'} size={20} color={colors.title}/> }
                                />
                            </View>
                            <View style={{marginTop:15,}}>
                                <Input
                                    backround
                                    inputLg
                                    type={'password'}
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                    icon={<Feather style={{}} name={'lock'} size={20} color={colors.title}/> }
                                />
                                <View style={{flexDirection:'row',alignItems:'center',margin:10,}}>
                                    <Checkbox
                                        //style={{}}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ?theme.dark?COLORS.primary: colors.title : undefined}
                                    />
                                    <Text 
                                        style={{...FONTS.fontRegular,
                                            fontSize: 15,
                                            color: colors.title,
                                            textAlign: 'left',
                                        }}
                                    > I agree to all Term, Privacy and Fees</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop:10,marginBottom:20}}>
                            <Button
                                title='Sign Up'
                                color={theme.dark ? COLORS.white :COLORS.primary}
                                text={theme.dark ? COLORS.primary : COLORS.white}
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom:20
                            }}
                        >
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: colors.title,
                                }}
                            />
                            <Text style={{
                                ...FONTS.fontMedium,
                                color: colors.title,
                                marginHorizontal: 15,
                                fontSize: 13
                            }}>Or continue with</Text>
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: colors.title,
                                }}
                            />
                        </View>
                        <View style={GlobalStyleSheet.row}>
                            <View style={[GlobalStyleSheet.col50,{marginBottom:20}]}>
                                <SocialBtn
                                    icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.google2} />}
                                    color={colors.card}
                                    rounded
                                    text='Google'
                                    //gap
                                />
                            </View>
                            <View style={[GlobalStyleSheet.col50,{marginBottom:20}]}>
                                <SocialBtn
                                    icon={<FontAwesome name='apple' size={20} color={colors.title} />}
                                    color={colors.card}
                                    rounded
                                    text='Apple'
                                    //gap
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                       justifyContent: 'center',
                       position:'absolute',
                       width:'100%',
                       left:0,
                       right:0,
                       bottom:-20,
                    }}
                >
                    <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Already have and account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{
                            ...FONTS.fontMedium,
                            // borderBottomWidth: 1,
                            // borderBottomColor: colors.title,
                            color: colors.title,
                            textDecorationLine:'underline'
                        }}> Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default Register