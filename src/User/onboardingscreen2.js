import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  useEffect(() => {
    RNStatusBar.setHidden(true);

    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('inset-swipe');
    }
  }, []);

  const handleBack = () => {
    console.log('🔙 Back button pressed');
  };

  const handleGetStarted = () => {
    console.log('🚀 Get Started pressed');
    // navigation.navigate('Login'); // If using React Navigation
  };

  return (
    <>
      <RNStatusBar hidden translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {/* 🔙 Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={28} color="#333" />
        </TouchableOpacity>

        {/* 🖼 Image */}
        <Image
          source={require('./assets/onboarding.png')}
          style={styles.image}
        />

        {/* 📝 Text */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>🎉 अब भोज में कोई टेंशन नहीं!</Text>

          <Text style={styles.subtitle}>
            शादी, मुंडन, उपनयन – सबकुछ एक App से मैनेज!  
            परिवार भी खुश, मेहमान भी खुश! 😍
          </Text>
        </View>

        {/* 🚀 Get Started Button */}
        <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 20,
    resizeMode: 'contain',
    marginTop: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6B00',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif-medium',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: '#444',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  getStartedBtn: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  getStartedText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});