import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const halwais = [
  { id: 1, name: 'श्री राम हलवाई', price: '₹2200 से शुरू', location: '📍 दरभंगा', image: require('./assets/halwai1.jpg') },
  { id: 2, name: 'मधुर मिलन हलवाई', price: '₹2400 से शुरू', location: '📍 मुजफ्फरपुर', image: require('./assets/halwai2.jpg') },
  { id: 3, name: 'लड्डू वाला ठिकाना', price: '₹2000 से शुरू', location: '📍 पटना', image: require('./assets/halwai3.jpg') },
  { id: 4, name: 'मीठा संसार', price: '₹2600 से शुरू', location: '📍 सहरसा', image: require('./assets/halwai4.jpg') },
  { id: 5, name: 'देसि स्वाद हलवाई', price: '₹2300 से शुरू', location: '📍 मधुबनी', image: require('./assets/halwai5.jpg') },
  { id: 6, name: 'परंपरा मिठाईघर', price: '₹2500 से शुरू', location: '📍 बागवाह', image: require('./assets/halwai6.jpg') },
  { id: 7, name: 'स्वादिष्ट हलवाई', price: '₹2100 से शुरू', location: '📍 दरभंगा', image: require('./assets/halwai7.jpg') },
  { id: 8, name: 'लड्डू भंडार', price: '₹2700 से शुरू', location: '📍 रोहतास', image: require('./assets/halwai8.jpg') },
  { id: 9, name: 'शाही मिठाई केंद्र', price: '₹3000 से शुरू', location: '📍 भागलपुर', image: require('./assets/halwai9.jpg') },
  { id: 10, name: 'मिठास घराना', price: '₹2800 से शुरू', location: '📍 पटना', image: require('./assets/halwai10.jpg') },
];

export default function HalwaiListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.meta}>{item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() => navigation.navigate('HalwaiDetails', { item })}
        >
          <Text style={styles.detailsBtnText}>विवरण</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('MyBookings', { prefill: item })}
        >
          <Text style={styles.bookBtnText}>बुक करें</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* header with text logo */}
      <View style={styles.header}>
        <Text style={styles.logoText}>MaithilBhoj</Text>
        <Text style={styles.headerTitle}>हलवाई — उपलब्ध विक्रेता</Text>
      </View>

      <FlatList
        data={halwais}
        keyExtractor={(i) => i.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff8f0',
    borderBottomWidth: 1,
    borderColor: '#f0e6de',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#F57C00',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
    marginTop: 4,
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1e8e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 0.85, // image height बढ़ाया
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 8,
    marginHorizontal: 10,
  },
  meta: {
    color: '#555',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
  },
  price: {
    color: '#F57C00',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 10,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 8,
  },

  detailsBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F57C00',
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 6,
    alignItems: 'center',
  },
  detailsBtnText: { color: '#F57C00', fontWeight: '700' },

  bookBtn: {
    flex: 1,
    backgroundColor: '#F57C00',
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontWeight: '800' },
});
