import React, { useRef } from 'react'
import { View, Text, ScrollView, Image,TouchableOpacity,TextInput } from 'react-native'
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';


type OutfitScreenProps = StackScreenProps<RootStackParamList, 'Outfit'>;

const Outfit = ({navigation} : OutfitScreenProps) => {
    return (
        <View>
            <Text>Outfit</Text>
        </View>
  )
}

export default Outfit