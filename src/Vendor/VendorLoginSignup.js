// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();
const BRAND_GRADIENT = ['#ff9966', '#ff5e62'];

export default function App() {
  const [hasSignedUp, setHasSignedUp] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSignedUp ? (
          <>
            <Stack.Screen name="VendorSignup">
              {(props) => (
                <VendorSignupScreen {...props} onSignup={() => setHasSignedUp(true)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
            <Stack.Screen name="VendorDashboard" component={VendorDashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------------- LOGIN SCREEN ----------------
function VendorLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      navigation.replace('VendorDashboard');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar hidden />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Back Button Header */}
        <TouchableOpacity style={styles.backBtnTop} onPress={() => navigation.navigate('VendorSignup')}>
          <Ionicons name="arrow-back" size={22} color="#FF5E62" />
          <Text style={styles.backText}>Back to Signup</Text>
        </TouchableOpacity>

        <Image source={require('./assets/vendorlogo.png')} style={styles.logo} />
        <Text style={styles.title}>Vendor Login</Text>
        <Text style={styles.tagline}>Connecting Events with Best Vendors</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password + Eye Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => alert('Forgot password flow here')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <LinearGradient colors={BRAND_GRADIENT} style={styles.gradientBtn}>
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ---------------- SIGNUP SCREEN ----------------
function VendorSignupScreen({ navigation, onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPass) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPass) {
      alert('Passwords do not match');
      return;
    }
    alert('Signup successful! Please login.');
    onSignup();
    navigation.navigate('VendorLogin');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar hidden />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Back Button Header */}
        <TouchableOpacity style={styles.backBtnTop} onPress={() => navigation.navigate('VendorLogin')}>
          <Ionicons name="arrow-back" size={22} color="#FF5E62" />
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>

        <Image source={require('./assets/vendorlogo.png')} style={styles.logo} />
        <Text style={styles.title}>Vendor Signup</Text>
        <Text style={styles.tagline}>Join MaithilBhoj Vendor Network</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email or Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password + Eye Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password + Eye Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
          <LinearGradient colors={BRAND_GRADIENT} style={styles.gradientBtn}>
            <Text style={styles.loginText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ---------------- DASHBOARD ----------------
function VendorDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to Vendor Dashboard</Text>
      <Text style={styles.tagline}>Manage your bookings & profile here</Text>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    paddingHorizontal: 20
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 55
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  tagline: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 25
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  passwordContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15
  },
  passwordInput: {
    flex: 1
  },
  forgotText: {
    color: '#FF5E62',
    textAlign: 'right',
    marginBottom: 20
  },
  loginBtn: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  gradientBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  backBtnTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  backText: {
    color: '#FF5E62',
    fontSize: 14,
    marginLeft: 6
  }
});
