// OfflineScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function OfflineScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(true);

  // Internet status check
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // Retry function
  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        navigation.goBack(); // इंटरनेट आने पर पिछली स्क्रीन पर लौटेगा
      } else {
        alert("अब भी इंटरनेट नहीं है!");
      }
    });
  };

  if (isConnected) return null; // अगर इंटरनेट है तो स्क्रीन मत दिखाओ

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/offline3.png")} // ✅ तुम एक Wi-Fi cut image रख सकते हो assets में
        style={styles.image}
      />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your network and try again.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F5A623",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
