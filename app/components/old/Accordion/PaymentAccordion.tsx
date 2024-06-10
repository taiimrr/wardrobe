import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import CustomInput from '../Input/CustomInput';
import Button from '../Button/Button';
import ButtonOutline from '../Button/ButtonOutline';
import DropShadow from 'react-native-drop-shadow';
import { CollapsedItem } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';


const PaymentAccordion = () => {

    const theme = useTheme();
    const { colors } = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const SECTIONS = [
        {
            icon: IMAGES.dollar,
            title: 'Cash on Delivery(Cash/UPI)',
            content: 'Carry on your cash payment..\nThanx!',
        },
        {
            icon: IMAGES.payment,
            title: 'Google Pay/Phone Pay/BHIM UPI',
            content: 'Your UPI ID Will be encrypted and is\n100% safe with us.',
            component: true
        },
        {
            icon: IMAGES.folder,
            title: 'Payments/Wallet',
            payment: true
        },
        {
            icon: IMAGES.bank,
            title: 'Netbanking',
            netbanking: true,
        },
    ];

    const AccordionHeader = (item, _, isActive) => {

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15
            }}>
                <Image
                    style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: COLORS.primary,
                        marginRight: 10,
                    }}
                    source={item.icon}
                />
                <Text style={[FONTS.fontMedium, { fontSize: 14, color: colors.title, flex: 1 }]}>{item.title}</Text>
                <View
                    style={{
                        //borderWidth: 1,
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        // borderColor: theme.dark ? COLORS.white : colors.borderColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:colors.background
                    }}
                >
                    <View style={[{
                        width: 14,
                        height: 14,
                        backgroundColor: colors.background,
                        borderRadius: 50
                    }, isActive == true && {
                        backgroundColor: COLORS.primary
                    }]}></View>
                </View>
            </View>
        )
    }

    const AccordionBody = (item, _, isActive) => {
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor: theme.dark ? COLORS.white : colors.border,
                paddingVertical: 10,
                paddingHorizontal: 15
            }}>
                {item.component ?

                    <View>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title, marginBottom: 5 }}>Link via UPI</Text>
                        <CustomInput
                            onChangeText={(value) => console.log(value)}
                            placeholder={"Enter your UPI ID"}
                            background
                        />
                        <View style={{ marginTop: 10 }}>
                            <Button
                                btnRounded
                                title={"Continue"}
                                color={colors.title}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, marginLeft: 10 }}>
                            <Image
                                style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                source={IMAGES.shieldcheck}
                            />
                            <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>{item.content}</Text>
                        </View>
                    </View>
                    :
                    item.payment ?
                        <View>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title, marginBottom: 5 }}>Link Your Wallet</Text>
                            <CustomInput
                                onChangeText={(value) => console.log(value)}
                                placeholder={"+91"}
                                keyboardType={'phone-pad'}
                                background
                            />
                            <View style={{ marginTop: 10, marginBottom: 5 }}>
                                <Button
                                    btnRounded
                                    title={"Continue"}
                                    color={colors.title}
                                />
                            </View>
                        </View>
                        :
                        item.netbanking ?
                            <View style={{ marginVertical: 10 }}>
                                <ButtonOutline
                                    color={colors.title}
                                    title={"Netbanking"}
                                />
                            </View>
                            :
                            <Text style={[FONTS.fontSm, { color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
                }
            </View>
        )
    }

    return (
        
            <>
                <Accordion
                    sections={SECTIONS}
                    duration={300}
                    sectionContainerStyle={[{
                        marginBottom:15,
                        borderRadius: 10,
                        backgroundColor:colors.card
                    },Platform.OS === "ios" && {}]}
                    activeSections={activeSections}
                    onChange={setSections}
                    touchableComponent={TouchableOpacity}
                    renderHeader={AccordionHeader}
                    renderContent={AccordionBody}
                />
            </>
        
    );
};

export default PaymentAccordion