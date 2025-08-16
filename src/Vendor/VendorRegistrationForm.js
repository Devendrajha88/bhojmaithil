// VendorRegistration.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const serviceOptions = [
  { label: "Aarkestra", value: "Aarkestra" },
  { label: "Pandit Jii", value: "Pandit Jii" },
  { label: "Tent", value: "Tent" },
  { label: "Halwai", value: "Halwai" },
  { label: "Photographer", value: "Photographer" },
  { label: "Makeup", value: "Makeup" },
  { label: "DJ", value: "DJ" },
  { label: "Furniture", value: "Furniture" },
  { label: "Card", value: "Card" },
  { label: "Mehndi", value: "Mehndi" },
  { label: "Waiter", value: "Waiter" },
  { label: "WaterSupplier", value: "WaterSupplier" },
  { label: "Car Booking", value: "Car Booking" },
  { label: "Fatakka", value: "Fatakka" },
  { label: "Meat", value: "Meat" },
  { label: "Maach", value: "Maach" },
  { label: "Puja Saamagri", value: "Puja Saamagri" },
  { label: "Ghoori Waala", value: "Ghoori Waala" },
  { label: "Gift", value: "Gift" },
  { label: "Dulhan Kapra", value: "Dulhan Kapra" },
];

// Extra dropdown options
const pujaTypes = [
  { label: "Griha Pravesh", value: "Griha Pravesh" },
  { label: "Upnayan", value: "Upnayan" },
  { label: "Vivah", value: "Vivah" },
];
const languages = [
  { label: "Hindi", value: "Hindi" },
  { label: "Sanskrit", value: "Sanskrit" },
  { label: "Maithili", value: "Maithili" },
];

const soundSystems = [
  { label: "Basic", value: "Basic" },
  { label: "Premium", value: "Premium" },
  { label: "Deluxe", value: "Deluxe" },
];
const yesNo = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const cameraTypes = [
  { label: "DSLR", value: "DSLR" },
  { label: "Mirrorless", value: "Mirrorless" },
  { label: "Both", value: "Both" },
];

const tentSizes = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
];

const cuisineTypes = [
  { label: "North Indian", value: "North Indian" },
  { label: "South Indian", value: "South Indian" },
  { label: "Mithai Special", value: "Mithai Special" },
];
const minOrders = [
  { label: "50 Plates", value: "50" },
  { label: "100 Plates", value: "100" },
  { label: "200 Plates", value: "200" },
];

export default function VendorRegistration() {
  const [vendorName, setVendorName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [idProofImage, setIdProofImage] = useState(null);

  // Extra fields states
  const [pujaType, setPujaType] = useState("");
  const [language, setLanguage] = useState("");
  const [soundSystem, setSoundSystem] = useState("");
  const [lightingIncluded, setLightingIncluded] = useState("");
  const [cameraType, setCameraType] = useState("");
  const [droneAvailable, setDroneAvailable] = useState("");
  const [tentSize, setTentSize] = useState("");
  const [decorationIncluded, setDecorationIncluded] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const pickImage = async (setImageFunc) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Gallery access is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImageFunc(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (
      !vendorName ||
      !location ||
      !selectedService ||
      !price ||
      !experience ||
      !contactNumber
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    Alert.alert("Success", "Vendor Registered Successfully!");
  };

  // Render extra dropdowns based on service
  const renderExtraFields = () => {
    switch (selectedService) {
      case "Pandit Jii":
        return (
          <>
            <RNPickerSelect
              onValueChange={setPujaType}
              items={pujaTypes}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Puja Type", value: null }}
              value={pujaType}
            />
            <RNPickerSelect
              onValueChange={setLanguage}
              items={languages}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Language", value: null }}
              value={language}
            />
          </>
        );
      case "DJ":
        return (
          <>
            <RNPickerSelect
              onValueChange={setSoundSystem}
              items={soundSystems}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Sound System Type", value: null }}
              value={soundSystem}
            />
            <RNPickerSelect
              onValueChange={setLightingIncluded}
              items={yesNo}
              style={pickerSelectStyles}
              placeholder={{ label: "Lighting Included?", value: null }}
              value={lightingIncluded}
            />
          </>
        );
      case "Photographer":
        return (
          <>
            <RNPickerSelect
              onValueChange={setCameraType}
              items={cameraTypes}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Camera Type", value: null }}
              value={cameraType}
            />
            <RNPickerSelect
              onValueChange={setDroneAvailable}
              items={yesNo}
              style={pickerSelectStyles}
              placeholder={{ label: "Drone Available?", value: null }}
              value={droneAvailable}
            />
          </>
        );
      case "Tent":
        return (
          <>
            <RNPickerSelect
              onValueChange={setTentSize}
              items={tentSizes}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Tent Size", value: null }}
              value={tentSize}
            />
            <RNPickerSelect
              onValueChange={setDecorationIncluded}
              items={yesNo}
              style={pickerSelectStyles}
              placeholder={{ label: "Decoration Included?", value: null }}
              value={decorationIncluded}
            />
          </>
        );
      case "Halwai":
        return (
          <>
            <RNPickerSelect
              onValueChange={setCuisineType}
              items={cuisineTypes}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Cuisine Type", value: null }}
              value={cuisineType}
            />
            <RNPickerSelect
              onValueChange={setMinOrder}
              items={minOrders}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Minimum Order", value: null }}
              value={minOrder}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} keyboardShouldPersistTaps="handled">
        <StatusBar hidden={true} translucent={true} backgroundColor="transparent" />

        <Text style={styles.heading}>Vendor Registration</Text>

        <TextInput style={styles.input} placeholder="Vendor Name" value={vendorName} onChangeText={setVendorName} />

        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Select Service</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedService(value)}
          items={serviceOptions}
          style={pickerSelectStyles}
          placeholder={{ label: "Select a service...", value: null }}
          value={selectedService}
        />

        <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />

        {renderExtraFields()}

        <TextInput style={styles.input} placeholder="Experience (in years)" keyboardType="numeric" value={experience} onChangeText={setExperience} />

        <TextInput style={styles.textArea} placeholder="Description" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

        <TextInput style={styles.input} placeholder="Working Hours" value={workingHours} onChangeText={setWorkingHours} />

        <TextInput style={styles.input} placeholder="Contact Number" keyboardType="phone-pad" value={contactNumber} onChangeText={setContactNumber} />

        <TextInput style={styles.textArea} placeholder="Address" value={address} onChangeText={setAddress} multiline numberOfLines={3} />

        <TouchableOpacity style={styles.imageBtn} onPress={() => pickImage(setProfileImage)}>
          <Text style={styles.imageBtnText}>{profileImage ? "Change Profile Photo" : "Upload Profile Photo"}</Text>
        </TouchableOpacity>
        {profileImage && <Image source={{ uri: profileImage }} style={styles.previewImage} />}

        <TouchableOpacity style={styles.imageBtn} onPress={() => pickImage(setIdProofImage)}>
          <Text style={styles.imageBtnText}>{idProofImage ? "Change ID Proof" : "Upload ID Proof"}</Text>
        </TouchableOpacity>
        {idProofImage && <Image source={{ uri: idProofImage }} style={styles.previewImage} />}

        <TouchableOpacity onPress={handleSubmit} style={{ borderRadius: 8, overflow: "hidden", marginTop: 10 }}>
          <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.gradientBtn}>
            <Text style={styles.submitText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8E7" },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 20, marginTop: Platform.OS === "android" ? 40 : 60 },
  input: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
  textArea: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 12, textAlignVertical: "top" },
  label: { fontWeight: "600", marginVertical: 10, fontSize: 16 },
  imageBtn: { backgroundColor: "#4facfe", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  imageBtnText: { color: "#fff", fontWeight: "bold" },
  previewImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 15 },
  gradientBtn: { paddingVertical: 14, alignItems: "center" },
  submitText: { textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
  inputAndroid: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 8, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
});
 
