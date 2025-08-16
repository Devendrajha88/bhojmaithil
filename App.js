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
  KeyboardAvoidingView
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "./supabaseClient";
import uuid from "react-native-uuid";

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

  // Extra fields
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

  const uploadImage = async (uri) => {
    try {
      const ext = uri.split(".").pop();
      const fileName = `${uuid.v4()}.${ext}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const { data, error } = await supabase.storage
        .from("vendor-images")
        .upload(fileName, blob, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) throw error;
      return `${supabase.storage.from("vendor-images").getPublicUrl(fileName).data.publicUrl}`;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!vendorName || !location || !selectedService || !price || !contactNumber) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const priceWithFee = (parseFloat(price) * 1.12).toFixed(2);

    let profileUrl = null;
    let idProofUrl = null;

    if (profileImage) profileUrl = await uploadImage(profileImage);
    if (idProofImage) idProofUrl = await uploadImage(idProofImage);

    const { data, error } = await supabase.from("vendors").insert([
      {
        vendor_name: vendorName,
        location,
        service: selectedService,
        price: priceWithFee,
        experience,
        description,
        working_hours: workingHours,
        contact_number: contactNumber,
        address,
        profile_image: profileUrl,
        id_proof_image: idProofUrl,
        puja_type: pujaType,
        language,
        sound_system: soundSystem,
        lighting_included: lightingIncluded,
        camera_type: cameraType,
        drone_available: droneAvailable,
        tent_size: tentSize,
        decoration_included: decorationIncluded,
        cuisine_type: cuisineType,
        min_order: minOrder,
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Vendor Registered Successfully!");
    }
  };

  const renderExtraFields = () => {
    switch (selectedService) {
      case "Pandit Jii":
        return (
          <>
            <TextInput style={styles.input} placeholder="Puja Type" value={pujaType} onChangeText={setPujaType} />
            <TextInput style={styles.input} placeholder="Language" value={language} onChangeText={setLanguage} />
          </>
        );
      case "DJ":
        return (
          <>
            <TextInput style={styles.input} placeholder="Sound System Type" value={soundSystem} onChangeText={setSoundSystem} />
            <TextInput style={styles.input} placeholder="Lighting Included? (Yes/No)" value={lightingIncluded} onChangeText={setLightingIncluded} />
          </>
        );
      case "Photographer":
        return (
          <>
            <TextInput style={styles.input} placeholder="Camera Type" value={cameraType} onChangeText={setCameraType} />
            <TextInput style={styles.input} placeholder="Drone Available? (Yes/No)" value={droneAvailable} onChangeText={setDroneAvailable} />
          </>
        );
      case "Tent":
        return (
          <>
            <TextInput style={styles.input} placeholder="Tent Size" value={tentSize} onChangeText={setTentSize} />
            <TextInput style={styles.input} placeholder="Decoration Included? (Yes/No)" value={decorationIncluded} onChangeText={setDecorationIncluded} />
          </>
        );
      case "Halwai":
        return (
          <>
            <TextInput style={styles.input} placeholder="Cuisine Type" value={cuisineType} onChangeText={setCuisineType} />
            <TextInput style={styles.input} placeholder="Minimum Order Quantity" keyboardType="numeric" value={minOrder} onChangeText={setMinOrder} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <StatusBar hidden={true} translucent={true} backgroundColor="transparent" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.heading}>Vendor Registration</Text>

        <TextInput style={styles.input} placeholder="Vendor Name" value={vendorName} onChangeText={setVendorName} />
        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Select Service</Text>
        <RNPickerSelect onValueChange={(value) => setSelectedService(value)} items={serviceOptions} style={pickerSelectStyles} placeholder={{ label: "Select a service...", value: null }} value={selectedService} />

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
      </ScrollView>

      {/* Floating Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.floatingBtn}>
        <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.gradientBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  floatingBtn: { position: "absolute", bottom: 20, left: 20, right: 20, borderRadius: 8, overflow: "hidden" },
  gradientBtn: { paddingVertical: 14, alignItems: "center" },
  submitText: { textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
  inputAndroid: { backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 8, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
});
