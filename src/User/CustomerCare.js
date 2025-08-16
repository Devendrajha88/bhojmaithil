// App.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
  Modal,
  ScrollView,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BRAND_GRADIENT = ["#ffecd2", "#fcb69f"];
const CARD_BG = "#ffffff";
const PAGE_BG = "#F7FAFC";
const TEXT_PRIMARY = "#14213d";
const MUTED = "#6b7280";

const openLink = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) Linking.openURL(url);
  else Alert.alert("Oops", "Link नहीं खुल पा रहा है।");
};

const ITEMS = [
  {
    id: "faq",
    label: "FAQ",
    desc: "आम सवालों और जवाबों की लिस्ट",
    Icon: MaterialIcons,
    iconName: "help-outline",
    color: "#FF7F50",
    content: `• बुकिंग कैसे करें? → सेवा चुनें → दिनांक/समय चुनें → एडवांस पेमेंट करें → कन्फर्मेशन SMS/WhatsApp।
• क्या कस्टम पैकेज मिलते हैं? → हाँ, ‘कस्टमाइज़’ पर वेन्यू/गेस्ट काउंट दें।
• क्या मैथिली/हिंदी में सपोर्ट है? → हाँ, दोनों में।
• वेंडर कैसे चुनें? → रेटिंग/रिव्यू/प्राइस देखकर ‘सेलेक्ट’ करें।
• बदलाव/रीशेड्यूल? → इवेंट से 72 घंटे पहले तक (वेंडर उपलब्धता पर निर्भर)।`,
    extra: `📌 टिप: FAQ पढ़ने से पहले अपनी बुकिंग डिटेल्स और ऑर्डर आईडी नोट कर लें।`,
  },
  {
    id: "vendor_issue",
    label: "वेंडर/सेवा संबंधी समस्या",
    desc: "लेट पहुँचना, क्वालिटी, स्टाफ की कमी…",
    Icon: FontAwesome5,
    iconName: "store",
    color: "#DC2626",
    content: `यदि वेंडर लेट/क्वालिटी इश्यू:
1) ‘My Bookings’ → ऑर्डर खोलें → ‘Raise Issue’ पर क्लिक करें।
2) फोटो/वीडियो/बिल अपलोड करें।
3) SLA: 30 मिनट में कॉल-बैक, 4 घंटे में रिसोल्यूशन टारगेट।
रिफंड/एडजस्टमेंट: QC टीम केस-बेसिस पर 0–100% तक समायोजन कर सकती है।`,
    extra: `⚠️ ध्यान दें: सभी शिकायतें इवेंट के 24 घंटे के अंदर दर्ज करें ताकि त्वरित समाधान मिल सके।`,
  },
  {
    id: "payments",
    label: "पेमेंट और रिफंड",
    desc: "भुगतान स्टेटस, रिफंड नियम, फेल्ड पेमेंट",
    Icon: MaterialIcons,
    iconName: "payments",
    color: "#16A34A",
    content: `पेमेंट स्टेटस:
• ‘My Bookings’ में ट्रांजैक्शन ID देखें।
रिफंड पॉलिसी (इंडिकेटिव):
• 7+ दिन पहले कैंसिल → 100% रिफंड (PG शुल्क छोड़कर)
• 3–6 दिन पहले → 50% रिफंड
• 0–2 दिन → No Refund (वेंडर कमिटमेंट)
फेल्ड पेमेंट: 48 घंटे में ऑटो-रिवर्सल; न हो तो UTR साझा करें।`,
    extra: `💡 सुझाव: रिफंड स्टेटस चेक करने के लिए “My Bookings” पेज हर 24 घंटे में एक बार देखें।`,
  },
  {
    id: "booking_issue",
    label: "भोज/इवेंट बुकिंग समस्या",
    desc: "कन्फर्मेशन, बदलाव, कैंसिलेशन",
    Icon: MaterialCommunityIcons,
    iconName: "clipboard-text-clock-outline",
    color: "#F59E0B",
    content: `कन्फर्मेशन नहीं आया?
• 15 मिनट तक इंतज़ार करें; फिर सपोर्ट से संपर्क करें।
बदलाव (रीशेड्यूल/आइटम चेंज):
• इवेंट से 72 घंटे पहले तक, उपलब्धता के अनुसार।
कैंसिलेशन:
• ‘My Bookings’ → ‘Cancel’ → कारण चुनें → रिफंड नियम लागू होंगे।`,
    extra: `ℹ️ नोट: कैंसिलेशन के बाद रिफंड प्रोसेस 5–7 कार्यदिवस तक ले सकता है।`,
  },
  {
    id: "vendor_registration",
    label: "Vendor Registration सहायता",
    desc: "नए वेंडर ऑनबोर्डिंग, डॉक्यूमेंट्स",
    Icon: Ionicons,
    iconName: "person-add-outline",
    color: "#8B5CF6",
    content: `ऑनबोर्डिंग स्टेप्स:
1) KYC: Aadhaar/PAN, बैंक डिटेल्स।
2) सेवा कैटेगरी: कैटरिंग/टेंट/पंडित/फोटो/बैंड आदि।
3) प्राइसकार्ड व स्लॉट्स सेट करें।
4) ट्रायल ऑर्डर (QC) के बाद Live।
भुगतान: T+2 बैंक सेटलमेंट; डैशबोर्ड पर इनवॉइस/स्टेटमेंट।`,
    extra: `💼 सुझाव: अपनी सर्विस और प्राइसकार्ड को हर महीने अपडेट करें ताकि ज्यादा ऑर्डर मिलें।`,
  },
  {
    id: "talk_to_cs",
    label: "कस्टमर केयर से बात करें",
    desc: "तुरंत मदद के लिए कॉल/चैट",
    Icon: MaterialIcons,
    iconName: "support-agent",
    color: "#0EA5E9",
    content: `हमसे बात करने के तरीके:
• कॉल: +91-98XXXXXXX
• WhatsApp चैट:  +91-98XXXXXXX
• ईमेल: help@maithilbhoj.com
टाइमिंग: रोज़ 9AM–9PM (IST). आपातकाल में 24x7 कॉल-बैक।`,
    extra: `📞 सलाह: सामान्य पूछताछ के लिए 9AM–6PM के बीच कॉल करें, ताकि तेजी से जवाब मिले।`,
  },
];

export default function App({ navigation }) {
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => setSelected(item)} style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: item.color }]}>
        <item.Icon name={item.iconName} size={22} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardLabel}>{item.label}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar hidden />

      {/* Header */}
      <LinearGradient colors={BRAND_GRADIENT} style={styles.header}>
        <Pressable onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>🛠 MaithilBhoj Self Service Center</Text>
      </LinearGradient>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={ITEMS}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      {/* Modal */}
      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { height: SCREEN_HEIGHT * 0.8 }]}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setSelected(null)} style={styles.closeBtn}>
                <Ionicons name="arrow-back" size={22} color="#000" />
              </Pressable>
              {selected && (
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: selected.color, marginRight: 10 },
                  ]}
                >
                  <selected.Icon name={selected.iconName} size={20} color="#fff" />
                </View>
              )}
              <Text style={styles.modalTitle}>{selected?.label}</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.modalText}>{selected?.content}</Text>
              {selected?.extra && (
                <Text style={styles.modalExtra}>{selected.extra}</Text>
              )}

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.actBtn, { backgroundColor: "#10B981" }]}
                  onPress={() => openLink("tel:+919800000000")}
                >
                  <Ionicons name="call-outline" size={16} color="#fff" />
                  <Text style={styles.actText}>Call</Text>
                </Pressable>
                <Pressable
                  style={[styles.actBtn, { backgroundColor: "#0EA5E9" }]}
                  onPress={() =>
                    openLink("whatsapp://send?phone=+919800000000&text=Hi")
                  }
                >
                  <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                  <Text style={styles.actText}>WhatsApp</Text>
                </Pressable>
                <Pressable
                  style={[styles.actBtn, { backgroundColor: "#6366F1" }]}
                  onPress={() => openLink("mailto:help@maithilbhoj.com")}
                >
                  <MaterialIcons name="email" size={16} color="#fff" />
                  <Text style={styles.actText}>Email</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: PAGE_BG },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    elevation: 4,
    shadowColor: "#000",
  },
  backButton: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginTop:20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#000",
    flexShrink: 1,
    marginTop:20,
  },
  listContent: { padding: 14, paddingBottom: 100 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: { fontSize: 15, color: TEXT_PRIMARY, fontWeight: "700",marginLeft:10, },
  cardDesc: { marginTop: 2, fontSize: 14, color: MUTED,marginLeft:10, },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
  },
  modalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  closeBtn: { marginRight: 8, padding: 4 },
  modalTitle: { flex: 1, fontSize: 19, fontWeight: "800" },
  modalText: { fontSize: 16, lineHeight: 24, color: "#334155", marginBottom: 8 },
  modalExtra: { fontSize: 15, color: "#555", marginTop: 8, fontStyle: "italic" },
  modalActions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  actText: { color: "#fff", fontWeight: "700" },
});
