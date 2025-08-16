import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';

const vendors = [
  { id: 1, title: 'Aarkestra', icon: require('./assets/aarkestra2.png') },
  { id: 2, title: 'Pandit Jii', icon: require('./assets/pandit7.png') },
  { id: 3, title: 'Tent', icon: require('./assets/tent15.jpg') },
  { id: 4, title: 'Halwai', icon: require('./assets/halwai13.jpg') },
  { id: 5, title: 'Photographer', icon: require('./assets/photography16.jpg') },
  { id: 6, title: 'Makeup', icon: require('./assets/makeup1.jpg') },
  { id: 7, title: 'DJ', icon: require('./assets/dj2.png') },
  { id: 8, title: 'Furniture', icon: require('./assets/furniture2.png') },
  { id: 9, title: 'Card', icon: require('./assets/card2.png') },
  { id: 10, title: 'Mehndi', icon: require('./assets/mehndi.png') },
  { id: 11, title: 'Waiter', icon: require('./assets/waiter.png') },
  { id: 12, title: 'WaterSupplier', icon: require('./assets/watersupplier.png') },
  { id: 13, title: 'Car Booking', icon: require('./assets/car13.jpg') },
  { id: 14, title: 'Fatakka', icon: require('./assets/fatakaa.png') },
  { id: 15, title: 'Meat', icon: require('./assets/meatwala.png') },
  { id: 16, title: 'Maach', icon: require('./assets/maachwala.png') },
  { id: 17, title: 'Puja Saamagri', icon: require('./assets/pujawala.png') },
  { id: 18, title: 'Ghoori Waala', icon: require('./assets/ghoriwala.png') },
  { id: 19, title: 'Gift', icon: require('./assets/gift.png') },
  { id: 20, title: 'Dulhan Kapra', icon: require('./assets/dulhankapra.png') },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const scaleAnim = useRef({}).current;

  vendors.forEach(v => {
    if (!scaleAnim[v.id]) {
      scaleAnim[v.id] = new Animated.Value(1);
    }
  });

  const handleCardPress = (id) => {
    Animated.spring(scaleAnim[id], {
      toValue: 1.15,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.spring(scaleAnim[id], {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }).start();
      }, 300);
    });
  };

  const renderVendorCard = ({ item }) => (
    <Animated.View style={[styles.vendorCard, { transform: [{ scale: scaleAnim[item.id] }] }]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleCardPress(item.id)}
        style={{ alignItems: 'center' }}
      >
        <Image source={item.icon} style={styles.vendorIcon} />
        <Text style={styles.vendorTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>View More</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#ffecd2', '#fcb69f']} style={styles.container}>
      <StatusBar hidden />

      {/* Header */}
      <View style={styles.header}>
        <MaskedView
          maskElement={
            <Text style={[styles.logo, { backgroundColor: 'transparent' }]}>
              MaithilBhoj
            </Text>
          }
        >
          <LinearGradient
            colors={['#ff7e5f', '#feb47b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.logo, { opacity: 0 }]}>MaithilBhoj</Text>
          </LinearGradient>
        </MaskedView>
        <TouchableOpacity>
          <Ionicons name="notifications" size={26} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navTabs}>
        {[
          { name: 'Geet', icon: 'musical-notes' },
          { name: 'Panchang', icon: 'calendar' },
          { name: 'Bhoj Planner', icon: 'calculator' }, // NEW
        ].map((tab, i) => (
          <TouchableOpacity key={i} style={styles.tabBtn} activeOpacity={0.7}>
            <Ionicons name={tab.icon} size={20} color="#444" />
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Vendor Grid */}
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVendorCard}
        numColumns={2}
        contentContainerStyle={styles.vendorGrid}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons name="home" size={24} color="#222" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.navItem}
          onPress={() => setActiveTab('Bookings')}
        >
          <Ionicons name="book" size={24} color="#222" />
          <Text style={styles.navLabel}>My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.navItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Ionicons name="person" size={24} color="#222" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 6,
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  navTabs: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
   
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1.7,
    borderColor: '#000',
    minHeight: 40,
  },
  tabText: {
    fontWeight: '700',
    color:'#e67e22',
    marginLeft: 2,
    fontSize: 18,
    lineHeight: 20,
  },

  vendorGrid: { paddingHorizontal: 15, paddingBottom: 100 },
  vendorCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
    elevation: 4,
  },
  vendorIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fcb69f',
    marginBottom: 12,
  },
  vendorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  detailsBtn: {
    backgroundColor: '#e67e22',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  detailsBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#f0d9b5',
    backgroundColor: '#fff3e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 6,
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 15, marginTop: 2, color: '#222', fontWeight: '600' },
});
