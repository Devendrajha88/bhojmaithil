import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#ffffff', '#e0f7fa']}
      style={styles.container}
    >
      {/* Heading at Top */}
      <Text style={styles.heading}>👉 चलिए अब भोज खाते हैं!</Text>

      {/* Image in Center */}
      <View style={styles.imageWrapper}>
        <Image source={require('./assets/login.png')} style={styles.logo} />
      </View>

      {/* Buttons at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.neonButton} onPress={() => console.log('Login as User')}>
          <Text style={styles.buttonText}>Login as User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.neonButtonAlt} onPress={() => console.log('Login as Vendor')}>
          <Text style={styles.buttonText}>Login as Vendor</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
    textShadowColor: '#00FFF0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
  width: 300,
  height: 350,
  resizeMode: 'cover', // or 'contain' depending on how you want it to fit
  borderRadius: 150, // half of width/height to make it a circle
  borderWidth: 3,
  borderColor: '#2a0c60ff', // Optional neon border for swag
},

  buttonContainer: {
    marginBottom: 60,
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  neonButton: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#00FFF0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    width: '80%',
    alignItems: 'center',
  },
  neonButtonAlt: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#FF00F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});