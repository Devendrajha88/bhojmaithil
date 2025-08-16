import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingForm({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date(),
    time: new Date(),
    address: '',
    notes: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }
    // यहाँ data को backend / state में भेज सकते हो
    navigation.navigate('PaymentScreen', { bookingData: form });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>बुकिंग फॉर्म</Text>

      <Text style={styles.label}>पूरा नाम *</Text>
      <TextInput
        style={styles.input}
        placeholder="अपना नाम दर्ज करें"
        value={form.name}
        onChangeText={(t) => handleChange('name', t)}
      />

      <Text style={styles.label}>मोबाइल नंबर *</Text>
      <TextInput
        style={styles.input}
        placeholder="10 अंकों का मोबाइल नंबर"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(t) => handleChange('phone', t)}
        maxLength={10}
      />

      <Text style={styles.label}>ईमेल</Text>
      <TextInput
        style={styles.input}
        placeholder="आपका ईमेल (optional)"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(t) => handleChange('email', t)}
      />

      <Text style={styles.label}>इवेंट की तारीख *</Text>
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {form.date.toLocaleDateString('hi-IN')}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) handleChange('date', selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>इवेंट का टाइम *</Text>
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.dateText}>
          {form.time.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={form.time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) handleChange('time', selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>लोकेशन / पता *</Text>
      <TextInput
        style={[styles.input, { height: 70 }]}
        placeholder="पूरा पता लिखें"
        multiline
        value={form.address}
        onChangeText={(t) => handleChange('address', t)}
      />

      <Text style={styles.label}>स्पेशल नोट्स</Text>
      <TextInput
        style={[styles.input, { height: 70 }]}
        placeholder="कोई विशेष जानकारी (optional)"
        multiline
        value={form.notes}
        onChangeText={(t) => handleChange('notes', t)}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>बुकिंग कन्फ़र्म करें</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '900', color: '#F57C00', marginBottom: 20,marginTop: 30, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '700', color: '#444', marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  dateBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  dateText: { fontSize: 14, color: '#333' },
  submitBtn: {
    backgroundColor: '#F57C00',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
