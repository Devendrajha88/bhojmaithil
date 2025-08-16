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
    RNStatusBar.setHidden(true); // Hide top bar

    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden'); // Hide bottom nav on Android
      NavigationBar.setBehaviorAsync('inset-swipe'); // Optional for smoother feel
    }
  }, []);

  return (
    <>
      <RNStatusBar hidden translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Image
          source={require('./assets/Welcome.jpg')}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Welcome to MaithilBhoj</Text>

          <Text style={styles.subtitle}>
            अब हर भोज की शुरुआत – MaithilBhoj App से! ❤
          </Text>
        </View>

        {/* Only Next Button */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity>
            <AntDesign name="arrowright" size={38} color="#007AFF" />
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
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 340,
    height: 340,
    borderRadius: 20,
    resizeMode: 'contain',
    marginTop: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -10,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e67e22',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 26,
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Right align since only one button
    alignItems: 'center',
  },
});
