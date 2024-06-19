import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type WardrobeScreenProps = StackScreenProps<RootStackParamList, 'Wardrobe'>;

const Wardrobe: React.FC<WardrobeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [activeTab, setActiveTab] = useState<'Items' | 'Outfits'>('Items');
  const scaleValue = new Animated.Value(1);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedImageItems, setSelectedImageItems] = useState<string[]>([]);
  const [selectedImageOutfits, setSelectedImageOutfits] = useState<string[]>(
    []
  );
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const [deleteImage, setDeleteImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(permission.status === 'granted');
    })();
  }, []);

  const handleImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      console.log('User cancelled image picker');
    } else {
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImageItems([...selectedImageItems, ...uris]);
      setMenuVisible(false);
      setActiveTab('Items');
    }
  };

  const handleCamera = async () => {
    if (cameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (result.canceled) {
        console.log('User cancelled camera');
      } else {
        setSelectedImageOutfits([
          ...selectedImageOutfits,
          result.assets[0].uri,
        ]);
        setMenuVisible(false);
        setActiveTab('Outfits');
      }
    } else {
      console.log('Camera permission denied');
    }
  };

  const handleDeleteImage = () => {
    if (activeTab === 'Items') {
      setSelectedImageItems((prevImages) =>
        prevImages.filter((image) => image !== deleteImage)
      );
    } else {
      setSelectedImageOutfits((prevImages) =>
        prevImages.filter((image) => image !== deleteImage)
      );
    }
    setIsModalVisible(false);
  };

  const confirmDeleteImage = (uri: string) => {
    setDeleteImage(uri);
    setIsModalVisible(true);
  };

  const renderContent = () => {
    const images =
      activeTab === 'Items' ? selectedImageItems : selectedImageOutfits;
    if (images.length > 0) {
      return (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => confirmDeleteImage(item)}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.content}
        />
      );
    } else {
      return (
        <View style={styles.content}>
          <Text>{activeTab === 'Items' ? 'Items List' : 'Outfits List'}</Text>
          <View style={styles.emptyWardrobe}>
            <Text style={styles.emptyWardrobeText}>
              No items in wardrobe. Tap the button to add items.
            </Text>
          </View>
        </View>
      );
    }
  };

  const onPressAddButton = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingBottom: 30,
          }}
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 50 }}
            source={IMAGES.small1}
          />
          <Text
            style={{ ...FONTS.fontRegular, fontSize: 24, color: colors.title }}
          >
            Hello,<Text style={{ ...FONTS.fontSemiBold }}> Alishba</Text>
          </Text>
        </View>
        <View style={styles.wardrobeStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{selectedImageItems.length}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{selectedImageOutfits.length}</Text>
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
            {activeTab === 'Items' && <View style={styles.underline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Outfits' && styles.tabActive]}
            onPress={() => setActiveTab('Outfits')}
          >
            <Text style={styles.tabText}>Outfits</Text>
            {activeTab === 'Outfits' && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>

        {renderContent()}

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(colors.primary, true)}
          onPress={onPressAddButton}
        >
          <Animated.View
            style={[styles.addButton, { transform: [{ scale: scaleValue }] }]}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableNativeFeedback>

        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleImageLibrary}
            >
              <Text style={styles.menuText}>Add items from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleCamera}>
              <Text style={styles.menuText}>Capture outfit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log('Create lookbook pressed')}
            >
              <Text style={styles.menuText}>Create lookbook</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to delete this image?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonDelete]}
                  onPress={handleDeleteImage}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#eee',
  },
  underline: {
    height: 3,
    backgroundColor: '#000',
    marginTop: 2,
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWardrobe: {
    marginBottom: 20,
  },
  emptyWardrobeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  addButton: {
    backgroundColor: '#000000',
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  menu: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#fff',
    borderRadius: 15,
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
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalButtonDelete: {
    backgroundColor: '#ff5252',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Wardrobe;
