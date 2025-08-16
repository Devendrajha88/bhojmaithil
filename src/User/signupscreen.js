import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New states for location flow
  const [step, setStep] = useState(1); // 1: Basic info, 2: Location
  const [location, setLocation] = useState('');

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10) {
      alert('कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }
    setOtpSent(true);
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('पहिने परिचय, फेर पकवान!');
      return;
    }
    // Password confirm हो गया → अब location step पर ले जाएं
    setStep(2);
  };

  const handleFinishSignUp = () => {
    if (!location.trim()) {
      alert('कृपया अपना स्थान दर्ज करें');
      return;
    }
    // यहां profile save करने की logic जाएगी
    navigation.replace('Login'); // Direct Home पर भेजना
  };

  return (
    <LinearGradient colors={['#ffffff', '#f3e5f5']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {step === 1 && (
          <>
            <Text style={styles.heading}>पहिने अपन थारी बुक करू! 😄</Text>

            <TextInput
              style={styles.input}
              placeholder="👤 पूरा नाम"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              style={styles.input}
              placeholder="📱 मोबाइल नंबर"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />

            {otpSent && (
              <TextInput
                style={styles.input}
                placeholder="🔢 ओटीपी दर्ज करें"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
              />
            )}

            {!otpSent ? (
              <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>📤 ओटीपी भेजें</Text>
              </TouchableOpacity>
            ) : (
              <>
                {/* Password Input */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="🔐 पासवर्ड"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="🔐 Confirm पासवर्ड"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>➡ आगे बढ़ें</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.heading}>📍 अपनी लोकेशन बताइए</Text>
            <TextInput
              style={styles.input}
              placeholder="🏙️ शहर / गांव का नाम"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.button} onPress={handleFinishSignUp}>
              <Text style={styles.buttonText}>✅ साइन अप पूरा करें</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#4A148C',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#7B1FA2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
  },
});
