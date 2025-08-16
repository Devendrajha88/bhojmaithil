import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Gradient import

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'आपका लॉगिन सफल रहा!');
    }, 2000);
  };

  return (
    <LinearGradient colors={['#ffffff', '#f3e5f5']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <TextInput
          style={styles.input}
          placeholder="मोबाइल नंबर"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="पासवर्ड"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>पासवर्ड भूल गए?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login करिए</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.or}>या</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleButtonText}>Google से लॉगिन करें</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerText}>
            अहाँक खाता बनल नै अछि ?<Text style={styles.registerLink}>   खाता बना लिय ना</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
  },
  forgot: {
    color: '#0066cc',
    textAlign: 'right',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#ea4335',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  registerText: {
    marginTop: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize:15,
  },
  registerLink: {
    color: '#f63bd4ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline', // ✅ underline added
    fontSize: 22,

  },
});