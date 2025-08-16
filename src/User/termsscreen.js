import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TermsScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      navigation.navigate("Login"); // Next screen
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* App Name */}
      <Text style={styles.appName}>MaithilBhoj</Text>

      {/* Terms Scroll */}
      <ScrollView style={styles.termsBox}>
        <Text style={styles.termsTitle}>Terms & Conditions</Text>
        <Text style={styles.termsText}>
          1. MaithilBhoj connects you with trusted and verified vendors for your events.{"\n\n"}
          2. All prices shown are provided by vendors; final costs may vary.{"\n\n"}
          3. Payments are processed securely and split between MaithilBhoj and vendors as per the service agreement.{"\n\n"}
          4. Cancellations and refunds will follow our official refund policy mentioned on the app.{"\n\n"}
          5. Vendor availability is subject to change without prior notice.{"\n\n"}
          6. We do not guarantee the quality of services beyond what is committed by vendors.{"\n\n"}
          7. MaithilBhoj is not liable for delays or disruptions caused by vendor issues, weather, or unforeseen circumstances.{"\n\n"}
          8. User data is protected under our Privacy Policy, but we may share necessary details with vendors for booking purposes.{"\n\n"}
          9. You agree not to misuse our platform for fraudulent activities.{"\n\n"}
          10. By continuing, you confirm that you have read and understood all terms and agree to follow them.
        </Text>
      </ScrollView>

      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAgreed(!agreed)}
      >
        <Ionicons
          name={agreed ? "checkbox" : "square-outline"}
          size={24}
          color={agreed ? "#e67e22" : "#888"}
        />
        <Text style={styles.checkboxText}>
          I agree to the Terms & Conditions
        </Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueBtn, { backgroundColor: agreed ? "#e67e22" : "#ccc" }]}
        onPress={handleContinue}
        disabled={!agreed}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e67e22",
    marginTop: 2,
    marginBottom: 20,
  },
  termsBox: {
    flex: 1,
    backgroundColor: "#FFF8E7",
    borderRadius: 20,
    borderColor:"#a50808ff",
    borderWidth:1.5,
    padding: 15,
  },
  termsTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  termsText: { fontSize: 16, lineHeight: 20, color: "#555" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkboxText: { marginLeft: 8, fontSize: 14, color: "#333" },
  continueBtn: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  continueText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
