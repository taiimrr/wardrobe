import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FONTS, IMAGES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const MyadsSheet = (props, ref) => {
    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => [210], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
    );


    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        openSheet: () => { openSheet() }
    }))
    // internal method
    const openSheet = () => {
        bottomSheetRef.current.snapToIndex(0)
    }

    const theme = useTheme();
    const { colors } = theme;


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            handleStyle={{ top: 0 }}
            handleIndicatorStyle={{ backgroundColor: colors.border, width: 92 }}
            backgroundStyle={{ backgroundColor: colors.card }}
        >

            <View style={GlobalStyleSheet.container}>
                <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Image
                        style={[GlobalStyleSheet.image, { tintColor: 'red' }]}
                        source={IMAGES.delete}
                    />
                    <Text style={[GlobalStyleSheet.text, { color: 'red' }]}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Image
                        style={[GlobalStyleSheet.image, { tintColor: colors.title }]}
                        source={IMAGES.disable}
                    />
                    <Text style={[GlobalStyleSheet.text, { color: colors.title }]}>Deactivate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Image
                        style={[GlobalStyleSheet.image, { tintColor: colors.title }]}
                        source={IMAGES.write}
                    />
                    <Text style={[GlobalStyleSheet.text, { color: colors.title }]}>Edit</Text>
                </TouchableOpacity>
            </View>

        </BottomSheet>
    );
};



export default forwardRef(MyadsSheet);