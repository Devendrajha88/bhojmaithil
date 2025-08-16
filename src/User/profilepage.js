// ProfilePage.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePage({ navigation }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const [name, setName] = useState('Aman Pagla');
  const [location, setLocation] = useState('Bokha, Bihar');
  const [profileImage, setProfileImage] = useState(require('./assets/aman.png'));

  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    setEditModalVisible(false);
  };

  // Show modal for info
  const handleInfoModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setInfoModalVisible(true);
  };

  // Logout confirm
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => navigation.navigate('LoginScreen')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionList}>
        <ActionItem
          icon="create-outline"
          title="Edit Profile"
          onPress={() => setEditModalVisible(true)}
        />
        <ActionItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() =>
            handleInfoModal(
              "Help & Support",
              `🛠 Help & Support - MaithilBhoj App

हमारी टीम 24/7 आपके साथ है!  

❓ सामान्य प्रश्न (FAQs)  

1️⃣ मैं बुकिंग कैसे करूँ?  
- होम स्क्रीन से "Choose Services" में जाकर अपनी ज़रूरत के अनुसार सेवाएं चुनें और कन्फर्म करें।  

2️⃣ क्या मैं बुकिंग कैंसिल कर सकता हूँ?  
- हाँ, बुकिंग के 24 घंटे के भीतर आप कैंसिल कर सकते हैं।  

3️⃣ क्या पेमेंट ऑनलाइन है या ऑफलाइन?  
- दोनों विकल्प उपलब्ध हैं।  

4️⃣ मेरी समस्या कहाँ रिपोर्ट करूँ?  
- आप हमें ईमेल कर सकते हैं: support@maithilbhoj.com  
- या कॉल करें: 📞 +91-9876543210  

5️⃣ क्या मेरा डेटा सुरक्षित है?  
- हाँ, हम आपके डेटा की पूरी सुरक्षा करते हैं और किसी के साथ साझा नहीं करते।  

🙏 MaithilBhoj इस्तेमाल करने के लिए धन्यवाद!`
            )
          }
        />
        <ActionItem
          icon="document-text-outline"
          title="Privacy Policy"
          onPress={() =>
            handleInfoModal(
              "Privacy Policy",
              `📜 Privacy Policy - MaithilBhoj App

हम आपकी गोपनीयता का सम्मान करते हैं और यह सुनिश्चित करते हैं कि आपकी व्यक्तिगत जानकारी सुरक्षित और गोपनीय रखी जाए।

1️⃣ डेटा संग्रह  
- हम केवल वही जानकारी एकत्र करते हैं जो आपके भोज आयोजन और सेवाओं की बुकिंग के लिए आवश्यक है।  
- जैसे: नाम, मोबाइल नंबर, स्थान, और इवेंट की डिटेल्स।  

2️⃣ डेटा उपयोग  
- आपकी जानकारी का उपयोग केवल आपको बेहतर सेवा प्रदान करने के लिए किया जाता है।  
- हम आपके डेटा का उपयोग विज्ञापन के लिए नहीं करते और इसे किसी तीसरे पक्ष के साथ साझा नहीं करते।  

3️⃣ भुगतान सुरक्षा  
- अगर आप ऑनलाइन पेमेंट करते हैं, तो वह हमारे सुरक्षित पेमेंट गेटवे के माध्यम से ही प्रोसेस होता है।  

4️⃣ लोकेशन एक्सेस  
- हम आपके स्थान की जानकारी केवल नज़दीकी सेवाएं दिखाने के लिए लेते हैं।  

5️⃣ संपर्क करें  
- कोई भी सवाल या शिकायत के लिए हमें support@maithilbhoj.com पर ईमेल करें।  

📝 अंतिम अपडेट: अगस्त 2025`
            )
          }
        />
        <ActionItem
          icon="log-out-outline"
          title="Logout"
          onPress={handleLogout}
        />
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TouchableOpacity onPress={pickImage} style={{ alignSelf: 'center', marginBottom: 10 }}>
              <Image source={profileImage} style={styles.editAvatar} />
              <Text style={{ color: '#F5A623', marginTop: 5 }}>Change Picture</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Info Modal */}
      <Modal visible={infoModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.infoText}>{modalContent}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.saveText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Reusable Action Item
const ActionItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#F5A623" />
    <Text style={styles.actionText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#ccc" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f6fc' },

  profileSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
  },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  name: { fontSize: 20, fontWeight: '700', color: '#222', marginTop: 10 },
  location: { fontSize: 14, color: '#888', marginTop: 4 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    paddingHorizontal: 18,
    marginTop: 12,
    marginBottom: 6,
  },

  actionList: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
    color: '#333',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  infoModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#222' },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveBtn: {
    backgroundColor: '#F5A623',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: '#fff', fontWeight: '700' },
  cancelBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
  },
  cancelText: { color: '#333', fontWeight: '500' },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  }
});
