import React, { useState } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Cardstyle2 from './Card/Cardstyle2';
import { useNavigation } from '@react-navigation/native';

const ImageSwper3 = ({data}) => {

    const [newData] = useState([
        { key: 'space-left' },
        ...data,
        { key: 'space-right' },
      ]);
    
      const { width } = useWindowDimensions();
      const SIZE = width * 0.5;
      const SPACER = (width - SIZE) / 2;
      const x = useSharedValue(0);
    
      const onScroll = (event) => {
          x.value = event.nativeEvent.contentOffset.x;
    };

    const navigation = useNavigation();

    return (
        <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={SIZE}
        decelerationRate="fast"
        onScroll={onScroll}
        contentContainerStyle={{paddingTop:40,paddingBottom:40}}
      >
        {newData.map((item, index) => {
  
          const style = useAnimatedStyle(() => {
                const translateY = interpolate(
                    x.value,
                    [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                    [-30, 0, 30]
                );
                return {
                  transform: [
                    { translateY },
                  ],
                };
            });
            
            if (!item.image) {
              return <View style={{ width: SPACER}} key={index} />;
            }
  
  
          return (
            <View key={index} style={{ width: SIZE,alignItems:'center',}}>
                <Animated.View style={[style, { overflow: 'hidden'}]}>
                    <View style={{marginBottom:10,paddingHorizontal:10}}>
                        <Cardstyle2
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            discount={item.discount}
                            delivery={item.delivery}
                            onPress={() => navigation.navigate('Products')}
                        />
                    </View>
                </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
    )
}

export default ImageSwper3