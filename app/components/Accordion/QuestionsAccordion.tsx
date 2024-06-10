import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';

const QuestionsAccordion = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections:any) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const SECTIONS = [
        {
            title: 'What is included with my purchase?',
            content: 'Package have the JavaScript JS, JavaScript JSON, XML, .apk, .java, JavaScript JSON, .java, .plist, Well Define Documentation, Fonts and Icons, Responsive Designs, Image Assets, Customization Options, and many more.',
        },
        {
            title: 'What features does FootFlare offer?',
            content: 'FootFlare offers a wide range of features including responsive design, customizable layouts, product catalog pages, shopping cart functionality, checkout pages, user account management, and more.',

        },
        {
            title: "Can I customize the template's design?",
            content: 'Absolutely! FootFlare is built using JSX, which makes it highly customizable. You can easily adjust colors, fonts, layout structures, and more to match your brand identity.',

        },
        {
            title: 'Are there pre-designed page templates included?',
            content: 'Yes, FootFlare typically includes pre-designed templates for essential pages like the homepage, product listings, product details, shopping cart, checkout, and user account pages.',
        },
        {
            title: 'Does FootFlare provide customer support?',
            content: 'FootFlare offers customer support options for their clients. Check the template documentation or you can directly contact to our support team from here - Click Here',

        },
        {
            title: "Is coding knowledge required to use FootFlare?",
            content: "Basic knowledge of JavaScript JS, XML, and JSX can be helpful for customizing FootFlare to your needs. However, it's designed to be user- friendly and doesn't necessarily require extensive coding skills.",

        },
        {
            title: 'How can I get started with FootFlare?',
            content: "To get started, purchase and download the FootFlare template. Then, follow the included documentation to set up and customize your e-commerce website based on your specific requirements.",
        },
    ];

    const AccordionHeader = (item:any, _:any, isActive:any) => {

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15
            }}>
                <Text style={[FONTS.fontMedium, { fontSize: 14, color: colors.title, flex: 1 }]}>{item.title}</Text>
                <Feather name={isActive ? "chevron-up" : "chevron-down"} size={18} color={colors.title} />
            </View>
        )
    }

    const AccordionBody = (item:any, _:any, isActive:any) => {
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingVertical: 10,
                paddingHorizontal: 15
            }}>

                <Text style={[FONTS.fontSm, { color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                duration={300}
                sectionContainerStyle={{
                    // borderWidth: 1,
                    // borderColor: theme.dark ? COLORS.white : colors.borderColor,
                    marginBottom: 15,
                    //paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':colors.background
                }}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
}

export default QuestionsAccordion