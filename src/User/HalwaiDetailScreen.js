import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HalwaiDetailsModal({ visible, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Demo Data
  const halwai = {
    name: 'श्री राम हलवाई',
    price: '₹2200 से शुरू',
    location: '📍 दरभंगा',
    images: [
      require('./assets/halwai1.jpg'),
      require('./assets/halwai2.jpg'),
      require('./assets/halwai3.jpg')
    ],
    experience: '10 वर्ष',
    speciality: 'शुद्ध देसी घी की मिठाइयाँ, शादी-ब्याह कैटरिंग',
    language: 'हिंदी, मैथिली, अंग्रेज़ी',
    description:
      'श्री राम हलवाई आपके कार्यक्रम को मीठे स्वाद और बेहतरीन व्यंजनों से खास बना देगा। यहाँ आपको पारंपरिक व्यंजनों के साथ-साथ आधुनिक मिठाइयाँ भी मिलेंगी।',
    services: [
      'शुद्ध देसी घी की मिठाइयाँ',
      'वेज / नॉन-वेज कैटरिंग',
      'विवाह एवं विशेष आयोजन',
      'ऑर्डर कस्टमाइजेशन'
    ]
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Image Gallery */}
            <Image source={halwai.images[currentImage]} style={styles.image} />

            <View style={styles.galleryRow}>
              {halwai.images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setCurrentImage(idx)}
                >
                  <Image source={img} style={[
                    styles.thumb,
                    currentImage === idx && { borderColor: '#F57C00', borderWidth: 2 }
                  ]} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Details */}
            <View style={styles.headerBox}>
              <Text style={styles.name}>{halwai.name}</Text>
              <Text style={styles.meta}>{halwai.location}</Text>
              <Text style={styles.price}>{halwai.price}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>अनुभव</Text>
              <Text style={styles.sectionText}>{halwai.experience}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>भाषा</Text>
              <Text style={styles.sectionText}>{halwai.language}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>विशेषता</Text>
              <Text style={styles.sectionText}>{halwai.speciality}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>विवरण</Text>
              <Text style={styles.sectionText}>{halwai.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>सेवाएं</Text>
              {halwai.services.map((s, i) => (
                <Text key={i} style={styles.sectionText}>• {s}</Text>
              ))}
            </View>

            {/* Book Button */}
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>बुक करें</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    zIndex: 1
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    gap: 6
  },
  thumb: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 6
  },
  headerBox: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 20, fontWeight: '900', color: '#222' },
  meta: { fontSize: 18, color: '#555', marginTop: 2 },
  price: { fontSize: 18, fontWeight: '700', color: '#F57C00', marginTop: 2 },

  section: { paddingHorizontal: 12, paddingVertical: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '700', marginBottom: 2, color: '#333' },
  sectionText: { fontSize: 17, color: '#444', lineHeight: 20 },

  bookBtn: {
    backgroundColor: '#F57C00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10
  },
  bookBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 }
});
