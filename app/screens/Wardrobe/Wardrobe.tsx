import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type WardrobeScreenProps = StackScreenProps<RootStackParamList, 'Wardrobe'>;

const Wardrobe: React.FC<WardrobeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [activeTab, setActiveTab] = useState<'Items' | 'Outfits'>('Items');
  const scaleValue = new Animated.Value(1);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const onPress = () => {
    setMenuVisible(!menuVisible);
  };

  const menuOptions = [
    { label: 'Add items', onPress: () => console.log('Add items pressed') },
    {
      label: 'Create outfit',
      onPress: () => console.log('Create outfit pressed'),
    },
    {
      label: 'Create lookbook',
      onPress: () => console.log('Create lookbook pressed'),
    },
  ];

  const renderContent = () => {
    if (activeTab === 'Items') {
      return (
        <View style={styles.content}>
          <Text>Items List</Text>
          <View style={styles.emptyWardrobe}>
            <Text style={styles.emptyWardrobeText}>
              No items in wardrobe. Tap the button to add items.
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Text>Outfits List</Text>
          <View style={styles.emptyWardrobe}>
            <Text style={styles.emptyWardrobeText}>
              No items in wardrobe. Tap the button to add items.
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>Alishba</Text>
          <Text style={styles.handle}>@alishbasiddique07</Text>
        </View>
        <View style={styles.wardrobeStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Lookbooks</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Items' && styles.tabActive]}
            onPress={() => setActiveTab('Items')}
          >
            <Text style={styles.tabText}>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Outfits' && styles.tabActive]}
            onPress={() => setActiveTab('Outfits')}
          >
            <Text style={styles.tabText}>Outfits</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#000000', true)}
          onPress={onPress}
        >
          <Animated.View
            style={[styles.addButton, { transform: [{ scale: scaleValue }] }]}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableNativeFeedback>
        {menuVisible && (
          <View style={styles.menu}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  option.onPress();
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 70,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  handle: {
    fontSize: 14,
    color: '#888',
  },
  wardrobeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  emptyWardrobe: {
    marginBottom: 20,
  },
  emptyWardrobeText: {
    fontSize: 16,
    display: 'flex',
    marginTop: 190,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 50,
  },
  tabActive: {
    backgroundColor: '#eee',
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#000000',
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});

export default Wardrobe;
