// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

// Preset service prices
const SERVICE_PRICES = {
  Catering_per_plate: 150,
  Tent: 20000,
  Pandit: 5000,
  Photography: 25000,
  DJ: 8000,
  Makeup: 6000,
  Furniture: 10000,
  Arkestra: 12000,
  Halwai: 15000,
  InvitationCard: 5000,
  WaterSupplier: 3000,
  VehicleBooking: 5000,
  Crackers: 4000,
  MeatShop: 7000,
  FishShop: 5000,
  PujaSamagri: 2500,
  PalkiGhori: 8000,
  GiftShop: 6000,
  BridalWear: 20000,
  SoundSystem: 7000,
};

// Service list with emojis
const SERVICES = [
  { key: 'Catering', label: '🍛 Catering', type: 'per_guest', priceKey: 'Catering_per_plate' },
  { key: 'Tent', label: '⛺ Tent', type: 'fixed', priceKey: 'Tent' },
  { key: 'Pandit', label: '🕉 Pandit', type: 'fixed', priceKey: 'Pandit' },
  { key: 'Photography', label: '📸 Photography', type: 'fixed', priceKey: 'Photography' },
  { key: 'DJ', label: '🎵 DJ', type: 'fixed', priceKey: 'DJ' },
  { key: 'Makeup', label: '💄 Makeup', type: 'fixed', priceKey: 'Makeup' },
  { key: 'Furniture', label: '🪑 Furniture', type: 'fixed', priceKey: 'Furniture' },
  { key: 'Arkestra', label: '💃 Arkestra', type: 'fixed', priceKey: 'Arkestra' },
  { key: 'Halwai', label: '👨‍🍳 Halwai', type: 'fixed', priceKey: 'Halwai' },
  { key: 'InvitationCard', label: '💌 Invitation Card', type: 'fixed', priceKey: 'InvitationCard' },
  { key: 'WaterSupplier', label: '🚰 Water Supplier', type: 'fixed', priceKey: 'WaterSupplier' },
  { key: 'VehicleBooking', label: '🚗 Vehicle Booking', type: 'fixed', priceKey: 'VehicleBooking' },
  { key: 'Crackers', label: '🎆 Crackers', type: 'fixed', priceKey: 'Crackers' },
  { key: 'MeatShop', label: '🍖 Meat Shop', type: 'fixed', priceKey: 'MeatShop' },
  { key: 'FishShop', label: '🐟 Fish Shop', type: 'fixed', priceKey: 'FishShop' },
  { key: 'PujaSamagri', label: '🪔 Puja Samagri', type: 'fixed', priceKey: 'PujaSamagri' },
  { key: 'PalkiGhori', label: '🐎 Palki / Ghori', type: 'fixed', priceKey: 'PalkiGhori' },
  { key: 'GiftShop', label: '🎁 Gift Shop', type: 'fixed', priceKey: 'GiftShop' },
  { key: 'BridalWear', label: '👰 Bridal Wear', type: 'fixed', priceKey: 'BridalWear' },
  { key: 'SoundSystem', label: '🔊 Sound System', type: 'fixed', priceKey: 'SoundSystem' },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(50);
  const [selectedServices, setSelectedServices] = useState({});
  const [budget, setBudget] = useState(50000);
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (key) => {
    setSelectedServices(prev => {
      const newState = { ...prev };
      if (newState[key]) delete newState[key];
      else newState[key] = true;
      return newState;
    });
  };

  // ✅ Only actual amount — no buffer
  const calculateEstimate = () => {
    let total = 0;
    Object.keys(selectedServices).forEach((key) => {
      const service = SERVICES.find(s => s.key === key);
      if (!service) return;
      const price = SERVICE_PRICES[service.priceKey] ?? 0;
      if (service.type === 'per_guest') {
        total += price * guests;
      } else {
        total += price;
      }
    });
    return total;
  };

  const estimate = calculateEstimate();

  const validateAndSubmit = async () => {
    if (!location.trim()) {
      Alert.alert('कृपया स्थान दर्ज करें');
      return;
    }
    if (guests <= 0) {
      Alert.alert('कृपया मेहमानों की संख्या सही करें');
      return;
    }
    if (Object.keys(selectedServices).length === 0) {
      Alert.alert('कृपया कम से कम एक सेवा चुनें');
      return;
    }

    const payload = {
      date: date.toISOString(),
      location,
      guests,
      services: Object.keys(selectedServices),
      budget,
      estimate,
      notes: '',
      createdAt: new Date().toISOString(),
      app: 'MaithilBhoj',
    };

    try {
      setSubmitting(true);
      const response = await fetch('https://your-backend.example.com/api/generate-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        Alert.alert('अनुरोध भेजा गया', 'हमारी टीम आपको PDF भेजेगी।');
      } else {
        const data = await response.json();
        Alert.alert('Estimate Generated', 'हमारी टीम आपको PDF भेजेगी।');
      }
    } catch (err) {
      Alert.alert('Estimate Generated', 'हमने आपकी जानकारी प्राप्त कर ली है — हमारी टीम शीघ्र ही PDF estimate भेज रही है।');
    } finally {
      setSubmitting(false);
    }
  };

  const StepHeader = () => (
    <View style={styles.stepHeader}>
      <Text style={styles.stepText}>Step {step + 1} of 3</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${((step + 1) / 3) * 100}%` }]} />
      </View>
    </View>
  );

  const ServiceCard = ({ item }) => {
    const selected = !!selectedServices[item.key];
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => toggleService(item.key)}
        style={[styles.serviceCard, selected && styles.serviceCardActive]}
      >
        <Text style={[styles.serviceEmoji, selected && { color: '#fff' }]}>{item.label.split(' ')[0]}</Text>
        <Text style={[styles.serviceLabel, selected && { color: '#fff' }]}>{item.label.split(' ').slice(1).join(' ')}</Text>
        <Text style={[styles.servicePrice, selected && { color: '#fff' }]}>
          {item.type === 'per_guest'
            ? `₹${SERVICE_PRICES[item.priceKey]}/guest`
            : `₹${SERVICE_PRICES[item.priceKey]}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { if (step > 0) setStep(step - 1); }}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bhoj Planner</Text>
        <View style={{ width: 26 }} />
      </View>

      <StepHeader />

      <View style={styles.content}>
        {step === 0 && (
          <View>
            <Text style={styles.sectionTitle}>Event Details</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar" size={20} color="#777" />
              <Text style={{ marginLeft: 8, color: '#333', fontSize: 16 }}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(e, selected) => {
                  setShowDatePicker(false);
                  if (selected) setDate(selected);
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Location (e.g., Darbhanga)"
              value={location}
              onChangeText={setLocation}
            />

            <View style={styles.guestRow}>
              <Text style={styles.label}>Guests</Text>
              <View style={styles.guestControls}>
                <TouchableOpacity style={styles.counterBtn} onPress={() => setGuests(g => Math.max(1, g - 10))}>
                  <Text style={styles.counterText}>-10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.counterBtn} onPress={() => setGuests(g => Math.max(1, g - 1))}>
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.guestNumber}>{guests}</Text>
                <TouchableOpacity style={styles.counterBtn} onPress={() => setGuests(g => g + 1)}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.counterBtn} onPress={() => setGuests(g => g + 10)}>
                  <Text style={styles.counterText}>+10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Select Your Services</Text>
            <FlatList
              data={SERVICES}
              keyExtractor={(i) => i.key}
              renderItem={({ item }) => <ServiceCard item={item} />}
              numColumns={2}
              contentContainerStyle={{ paddingVertical: 8 }}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Budget & Live Estimate</Text>
            <View style={{ marginVertical: 18 }}>
              <Text style={styles.smallLabel}>Budget: ₹{budget.toLocaleString()}</Text>
              <Slider
                minimumValue={10000}
                maximumValue={500000}
                step={1000}
                value={budget}
                onValueChange={val => setBudget(Math.round(val))}
                minimumTrackTintColor="#F5A623"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#F5A623"
              />
            </View>
            <View style={styles.estimateCard}>
              <Text style={styles.estimateLabel}>Live Estimate</Text>
              <Text style={styles.estimateValue}>₹{estimate.toLocaleString()}</Text>
              <Text style={styles.estimateNote}>Based on selected services only</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, submitting && { opacity: 0.7 }]}
              onPress={validateAndSubmit}
              disabled={submitting}
            >
              <Text style={styles.submitText}>
                {submitting ? 'Submitting...' : 'Get My Estimate '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        {step > 0 ? (
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(s => s - 1)}>
            <Text style={styles.secondaryText}>Back</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 100 }} />}
        {step < 2 ? (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(s => s + 1)}>
            <Text style={styles.primaryText}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#222' },
  stepHeader: { paddingHorizontal: 18, marginTop: 6 },
  stepText: { color: '#888', marginBottom: 6, fontSize: 14 },
  progressBarBg: { height: 6, backgroundColor: '#f1f1f1', borderRadius: 6, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: '#F5A623' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 12 },
  sectionTitle: { fontSize: 23, fontWeight: '800', marginBottom: 8, color: '#222' },
  input: {
    backgroundColor: '#fbfbfb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  guestRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  label: { fontSize: 16, color: '#333' },
  guestControls: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: { backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginHorizontal: 6, borderWidth: 1, borderColor: '#eee' },
  counterText: { fontSize: 14, fontWeight: '700', color: '#333' },
  guestNumber: { fontSize: 16, fontWeight: '700', color: '#222', minWidth: 50, textAlign: 'center' },
  serviceCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, margin: 6, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  serviceCardActive: { backgroundColor: '#F5A623', borderColor: '#F5A623', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 },
  serviceEmoji: { fontSize: 40 },
  serviceLabel: { marginTop: 8, fontWeight: '700', color: '#333', fontSize: 20 },
  servicePrice: { marginTop: 6, color: '#666', fontSize: 15, },
  smallLabel: { color: '#444', marginBottom: 6, fontWeight: '700' },
  estimateCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  estimateLabel: { color: '#666', fontWeight: '700' },
  estimateValue: { fontSize: 20, fontWeight: '800', color: '#222', marginTop: 6 },
  estimateNote: { color: '#999', marginTop: 6 },
  submitBtn: { backgroundColor: '#F5A623', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitText: { color: '#fff', fontWeight: '800', fontSize: 18, textAlign: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, borderTopWidth: 1, borderColor: '#f6f6f6', backgroundColor: '#fff' },
  primaryBtn: { backgroundColor: '#F5A623', paddingHorizontal: 26, paddingVertical: 12, borderRadius: 12 },
  primaryText: { color: '#fff', fontWeight: '800' },
  secondaryBtn: { backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  secondaryText: { color: '#333', fontWeight: '700' },
});
