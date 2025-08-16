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

  return (
    <>
      <RNStatusBar hidden translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Image
          source={require('./assets/shaddi.png')}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            🌾 बिना MaithilBhoj के Shaadi अधूरी है!
          </Text>

          <Text style={styles.subtitle}>
            मिथिला की परंपरा और स्वाद – अब एक क्लिक पर।
          </Text>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity>
            <AntDesign name="arrowright" size={36} color="#FF6B00" />
          </TouchableOpacity>
        </View>
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
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif-medium',
    color: '#DA5B1F',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});