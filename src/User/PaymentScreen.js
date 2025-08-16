import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PaymentScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate('MyBookings');
      }, 2000);
    }, 2000);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>बुकिंग पूरी करें</Text>
          <Text style={styles.instruction}>QR Code स्कैन करके बुकिंग पूरी करें</Text>

          {/* QR Code */}
          <Image
            source={require('./assets/qrcode.jpg')}
            style={styles.qrCode}
          />

          {/* Amount */}
          <Text style={styles.amount}>₹ 2200</Text>

          {/* Buttons & Status */}
          {!success && !loading && (
            <TouchableOpacity style={styles.payBtn} onPress={handlePayNow}>
              <Text style={styles.payBtnText}>Pay Now</Text>
            </TouchableOpacity>
          )}

          {loading && <ActivityIndicator size="large" color="#F57C00" style={{ marginTop: 20 }} />}

          {success && <Text style={styles.success}>✅ Payment Successful!</Text>}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F57C00',
    textAlign: 'center',
    marginBottom: 8
  },
  instruction: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  qrCode: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F57C00'
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20
  },
  payBtn: {
    backgroundColor: '#F57C00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  payBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800'
  },
  success: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',
    textAlign: 'center',
    marginTop: 20
  }
});
