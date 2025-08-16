// MyBookings.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Modal,
  Image,
  Animated,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RazorpayCheckout from 'react-native-razorpay'; // install and link in bare workflow

// --------- Sample seed bookings (replace with real API) ----------
const SAMPLE_BOOKINGS = [
  {
    id: 'BKG001',
    service: 'Halwai',
    vendorName: 'मिठास हलवाई',
    date: '2025-09-15',
    time: '10:00 AM',
    amount: 12000,
    status: 'Pending', // Pending | Accepted | Rejected | Cancelled
    paid: false,
    image: require('./assets/halwai13.jpg'),
    notes: '200 लोगो के लिए चावल-पकवान',
    contactHidden: true,
  },
  {
    id: 'BKG002',
    service: 'Tent',
    vendorName: 'शुभ टेंट हाउस',
    date: '2025-09-20',
    time: '07:00 PM',
    amount: 45000,
    status: 'Accepted',
    paid: true,
    image: require('./assets/tent15.jpg'),
    notes: 'स्टेज + लाइटिंग',
    contactHidden: false,
  },
  {
    id: 'BKG003',
    service: 'Photography',
    vendorName: 'फोटोस्टोरी',
    date: '2025-10-02',
    time: '11:00 AM',
    amount: 25000,
    status: 'Rejected',
    paid: false,
    image: require('./assets/photography16.jpg'),
    notes: 'वेड़िंग एल्बम',
    contactHidden: true,
  },
  // ... add more for demo
];

// status color map
const STATUS_COLORS = {
  Pending: '#f39c12',
  Accepted: '#16a34a',
  Rejected: '#ef4444',
  Cancelled: '#9ca3af',
};

// small util to format currency
const formatINR = (n) => {
  if (!n && n !== 0) return '—';
  return '₹' + n.toLocaleString('en-IN');
};

export default function MyBookings({ navigation }) {
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Pending, Accepted...
  const [sortByDateAsc, setSortByDateAsc] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // animated badge scale for modal open
  const badgeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // on modal open animate badge
    if (detailsModalVisible) {
      badgeAnim.setValue(0);
      Animated.spring(badgeAnim, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
    }
  }, [detailsModalVisible]);

  // Derived: filtered & sorted bookings
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = bookings.filter((b) => {
      if (filterStatus !== 'All' && b.status !== filterStatus) return false;
      if (!q) return true;
      return (
        b.vendorName.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });

    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortByDateAsc ? da - db : db - da;
    });

    return list;
  }, [bookings, search, filterStatus, sortByDateAsc]);

  // Pull to refresh handler (simulate API fetch)
  const onRefresh = async () => {
    setRefreshing(true);
    // simulate fetch
    setTimeout(() => {
      // here you'd actually fetch latest bookings from backend
      setRefreshing(false);
      Alert.alert('Refreshed', 'Booking list updated');
    }, 1000);
  };

  // Open details
  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailsModalVisible(true);
  };

  // Close details
  const closeDetails = () => {
    setDetailsModalVisible(false);
    setSelectedBooking(null);
  };

  // Cancel booking locally (in real app call backend)
  const cancelBooking = (id) => {
    Alert.alert('Cancel Booking', 'क्या आप वाकई बुकिंग रद्द करना चाहते हैं?', [
      { text: 'नहीं', style: 'cancel' },
      {
        text: 'हाँ, रद्द करें',
        style: 'destructive',
        onPress: () => {
          setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)));
          closeDetails();
        },
      },
    ]);
  };

  // Razorpay Demo payment flow
  const payWithRazorpay = (booking) => {
    // NOTE: In production, generate order on backend and pass order_id here for security.
    const options = {
      description: `${booking.service} - ${booking.vendorName}`,
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag', // demo key — replace with backend-provided key for live
      amount: booking.amount * 100, // paise
      name: 'MaithilBhoj',
      prefill: {
        email: 'customer@example.com',
        contact: '9999999999',
        name: 'Guest User',
      },
      theme: { color: '#F5A623' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // data.razorpay_payment_id
        setBookings((prev) =>
          prev.map((b) => (b.id === booking.id ? { ...b, paid: true, status: 'Accepted' } : b))
        );
        Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
        closeDetails();
        // In production: notify backend to verify the payment signature & update order status
      })
      .catch((err) => {
        Alert.alert('Payment Failed', err.description || 'Payment cancelled/failed.');
      });
  };

  // Show vendor contact — allowed only after paid or accepted depending on your policy
  const showVendorContact = (booking) => {
    if (booking.contactHidden && !booking.paid) {
      Alert.alert(
        'Contact Locked',
        'वेंडर का नंबर तभी दिखेगा जब आप पेमेंट कर देंगे या वेंडर बुकिंग स्वीकार करेगा।',
        [
          { text: 'ठीक है' },
          {
            text: 'Pay Now',
            onPress: () => payWithRazorpay(booking),
          },
        ]
      );
      return;
    }
    // if contact visible:
    if (booking.contactHidden && booking.paid) {
      // In real app vendor contact stored somewhere; here demo phone
      Alert.alert('Vendor Contact', '📞 98765 43210');
      return;
    }
    // contact already visible (for demo we show a number)
    Alert.alert('Vendor Contact', '📞 98765 43210');
  };

  // render booking card
  const renderBooking = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => openDetails(item)} activeOpacity={0.9}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.vendorName}</Text>
          <Text style={styles.cardSub}>{item.service} • {item.date} • {item.time}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.amount}>{formatINR(item.amount)}</Text>
            <View style={styles.badgeWrap}>
              <Animated.View
                style={[
                  styles.statusBadge,
                  { backgroundColor: STATUS_COLORS[item.status] || '#999' },
                  { transform: [{ scale: badgeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }) }] },
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#fff7ed', '#fff1e6']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <TouchableOpacity onPress={() => {
            // optional: navigate to planner or new booking
            navigation?.navigate?.('BhojPlanner');
          }}>
            <Ionicons name="add-circle-outline" size={26} color="#F5A623" />
          </TouchableOpacity>
        </View>

        {/* Search + filter row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#888" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by vendor / service / id"
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
            {search ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#888" />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              // rotate filter: cycle through All -> Pending -> Accepted -> Rejected -> Cancelled
              const order = ['All', 'Pending', 'Accepted', 'Rejected', 'Cancelled'];
              const idx = order.indexOf(filterStatus);
              setFilterStatus(order[(idx + 1) % order.length]);
            }}
          >
            <Ionicons name="funnel-outline" size={20} color="#333" />
            <Text style={styles.filterText}>{filterStatus}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setSortByDateAsc((s) => !s)}
            accessibilityLabel="Toggle sort"
          >
            <Ionicons name={sortByDateAsc ? 'arrow-up' : 'arrow-down'} size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Booking list */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={40} color="#bbb" />
            <Text style={styles.emptyText}>कोई बुकिंग नहीं मिली</Text>
          </View>
        )}
      />

      {/* Details Modal */}
      <Modal visible={detailsModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView>
              <Image source={selectedBooking?.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedBooking?.vendorName}</Text>
              <Text style={styles.modalService}>{selectedBooking?.service}</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{selectedBooking?.date} • {selectedBooking?.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Amount</Text>
                <Text style={styles.infoValue}>{formatINR(selectedBooking?.amount)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={[styles.infoValue, { color: STATUS_COLORS[selectedBooking?.status] || '#333' }]}>{selectedBooking?.status}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Notes</Text>
                <Text style={styles.infoValue}>{selectedBooking?.notes || '—'}</Text>
              </View>

              <View style={{ height: 14 }} />

              {/* Action buttons */}
              <View style={styles.modalActions}>
                {!selectedBooking?.paid ? (
                  <TouchableOpacity
                    style={[styles.payBtn]}
                    onPress={() => payWithRazorpay(selectedBooking)}
                  >
                    <Text style={styles.payText}>Pay Now • {formatINR(selectedBooking?.amount)}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.paidBadge]}>
                    <Ionicons name="checkmark-done-circle" size={18} color="#fff" />
                    <Text style={styles.paidText}>Paid & Confirmed</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.contactBtn]}
                  onPress={() => showVendorContact(selectedBooking)}
                >
                  <Ionicons name="call" size={18} color="#fff" />
                  <Text style={styles.contactText}>Contact Vendor</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 12 }} />

              <TouchableOpacity
                style={styles.cancelBtnFull}
                onPress={() => cancelBooking(selectedBooking?.id)}
              >
                <Text style={styles.cancelBtnText}>Cancel Booking</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={closeDetails}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    paddingTop: Platform.OS === 'android' ? 24 : 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#f0e6de',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#333' },

  searchRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14 },
  filterBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterText: { marginLeft: 6, fontWeight: '600' },
  sortBtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 120,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f6f6f6',
  },
  cardImage: { width: 110, height: 110, borderRadius: 12 },
  cardBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#222' },
  cardSub: { color: '#666', marginTop: 4 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  amount: { fontSize: 15, fontWeight: '800', color: '#111' },

  badgeWrap: { alignItems: 'flex-end' },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    minWidth: 86,
    alignItems: 'center',
  },
  statusText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  // Empty
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 8, color: '#999' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 18 },
  modalCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', maxHeight: '88%' },
  modalImage: { width: '100%', height: 180 },
  modalTitle: { fontSize: 20, fontWeight: '800', margin: 12, color: '#222' },
  modalService: { marginHorizontal: 12, color: '#666', fontWeight: '700' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 8 },
  infoLabel: { color: '#666', fontWeight: '700' },
  infoValue: { color: '#222', maxWidth: '70%' },

  modalActions: { flexDirection: 'row', padding: 12, justifyContent: 'space-between' },
  payBtn: { flex: 1, backgroundColor: '#F97316', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8 },
  payText: { color: '#fff', fontWeight: '800' },
  contactBtn: { flex: 1, backgroundColor: '#1f2937', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 8 },
  contactText: { color: '#fff', fontWeight: '700' },

  paidBadge: { flexDirection: 'row', backgroundColor: '#16a34a', padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  paidText: { color: '#fff', fontWeight: '800', marginLeft: 8 },

  cancelBtnFull: { marginHorizontal: 12, marginTop: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: '#f3a', padding: 12, borderRadius: 10, alignItems: 'center' },
  cancelBtnText: { color: '#ef4444', fontWeight: '800' },

  closeBtn: { padding: 12, alignItems: 'center', marginBottom: 14, marginTop: 6 },
  closeBtnText: { color: '#666', fontWeight: '700' },

});
