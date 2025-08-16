// VendorDashboard.js (UI-only, Expo/React Native)
// Premium UI using your theme ['#ffecd2', '#fcb69f']
// Pure Frontend (Dummy Data) + Completed Earnings (Daily / Weekly / Monthly)

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
  TextInput,
  Switch,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// -------- THEME --------
const THEME = {
  gradient: ['#ffecd2', '#fcb69f'],
  bg: '#FFF8F2',
  white: '#ffffff',
  text: '#1f1f1f',
  subtext: '#6b6b6b',
  card: '#ffffff',
  success: '#16a34a',
  danger: '#dc2626',
  info: '#2563eb',
  muted: '#efefef',
  shadow: 'rgba(0,0,0,0.08)'
};

// -------- UTILITIES --------
const inr = (n) => `₹${Number(n || 0).toFixed(0)}`;
const withFee = (base) => ({ base, fee: base * 0.12, total: base * 1.12 });
const parseYMD = (s) => {
  // Ensures date parsing uniform across Android/iOS
  // expects 'YYYY-MM-DD'
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const formatDM = (d) => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
  .toString()
  .padStart(2, '0')}`;
const startOfWeek = (d) => {
  const copy = new Date(d);
  const day = copy.getDay(); // 0 Sun - 6 Sat
  const diff = (day + 6) % 7; // make Monday=0
  copy.setDate(copy.getDate() - diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};
const isSameDay = (a, b) => a.toDateString() === b.toDateString();
const isSameMonth = (a, b) => a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
const isWithin7Days = (from, to) => {
  const diffDays = (from - to) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays < 7;
};

// -------- DUMMY DATA --------
const DUMMY_PENDING = [
  { id: 'r1', userName: 'Rohit Kumar', service: 'Halwai', date: '2025-08-20', time: '10:00 AM', location: 'Darbhanga', notes: '200 लोगों का भोज', price: 8000 },
  { id: 'r2', userName: 'Pooja Singh', service: 'DJ', date: '2025-08-22', time: '7:00 PM', location: 'Patna', notes: 'संगीत नाइट', price: 6000 },
];

const DUMMY_ACTIVE = [
  { id: 'b1', userName: 'Aman Verma', service: 'Photographer', date: '2025-08-18', time: '1:00 PM', location: 'Madhubani', price: 5000, paid: true, contactRevealed: true },
];

// Add more DONE items to make earnings UI meaningful
const DUMMY_DONE = [
  { id: 'c1', userName: 'Nisha', service: 'Pandit Jii', date: '2025-08-10', time: '9:00 AM', location: 'Sitamarhi', price: 3000, paid: true, bothConfirmed: true },
  { id: 'c2', userName: 'Ravi', service: 'Caterer', date: '2025-08-15', time: '7:00 PM', location: 'Patna', price: 7000, paid: true, bothConfirmed: true },
  { id: 'c3', userName: 'Anjali', service: 'Makeup Artist', date: '2025-08-16', time: '2:00 PM', location: 'Darbhanga', price: 4000, paid: true, bothConfirmed: true },
  { id: 'c4', userName: 'Kunal', service: 'DJ', date: '2025-08-16', time: '9:00 PM', location: 'Samastipur', price: 5500, paid: true, bothConfirmed: true },
  { id: 'c5', userName: 'Seema', service: 'Decorator', date: '2025-08-14', time: '11:00 AM', location: 'Madhubani', price: 2800, paid: true, bothConfirmed: true },
  { id: 'c6', userName: 'Aarti', service: 'Mehendi', date: '2025-08-12', time: '4:00 PM', location: 'Darbhanga', price: 2200, paid: true, bothConfirmed: true },
  { id: 'c7', userName: 'Rohit', service: 'Band', date: '2025-07-29', time: '6:00 PM', location: 'Patna', price: 6500, paid: true, bothConfirmed: true },
];

// -------- MAIN --------
export default function VendorDashboard({ navigation }) {
  const [tab, setTab] = useState('Requests'); // Requests | Bookings | Completed | Earnings | Profile
  const [pending, setPending] = useState(DUMMY_PENDING);
  const [active, setActive] = useState(DUMMY_ACTIVE);
  const [done, setDone] = useState(DUMMY_DONE);
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [online, setOnline] = useState(true);

  // Filtered lists by search
  const filteredPending = useMemo(
    () =>
      pending.filter(
        (x) =>
          x.userName.toLowerCase().includes(search.toLowerCase()) ||
          x.service.toLowerCase().includes(search.toLowerCase())
      ),
    [pending, search]
  );
  const filteredActive = useMemo(
    () =>
      active.filter(
        (x) =>
          x.userName.toLowerCase().includes(search.toLowerCase()) ||
          x.service.toLowerCase().includes(search.toLowerCase())
      ),
    [active, search]
  );
  const filteredDone = useMemo(
    () =>
      done.filter(
        (x) =>
          x.userName.toLowerCase().includes(search.toLowerCase()) ||
          x.service.toLowerCase().includes(search.toLowerCase())
      ),
    [done, search]
  );

  // Actions (UI-only state updates)
  const acceptRequest = (req) => {
    setPending((list) => list.filter((x) => x.id !== req.id));
    setActive((list) => [
      {
        id: `b_${req.id}`,
        userName: req.userName,
        service: req.service,
        date: req.date,
        time: req.time,
        location: req.location,
        price: req.price,
        paid: false,
        contactRevealed: false,
      },
      ...list,
    ]);
    setDetail(null);
  };
  const rejectRequest = (req) => {
    setPending((list) => list.filter((x) => x.id !== req.id));
    setDetail(null);
  };
  const markPaid = (booking) => {
    setActive((list) => list.map((b) => (b.id === booking.id ? { ...b, paid: true, contactRevealed: true } : b)));
  };
  const markCompletedBothConfirmed = (booking) => {
    setActive((list) => list.filter((b) => b.id !== booking.id));
    setDone((list) => [
      {
        id: `c_${booking.id}`,
        userName: booking.userName,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        location: booking.location,
        price: booking.price,
        paid: true,
        bothConfirmed: true,
      },
      ...list,
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />

      {/* Header */}
      <LinearGradient colors={THEME.gradient} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MaterialCommunityIcons name="hand-coin-outline" size={26} color={THEME.text} />
            <Text style={styles.title}>Vendor Dashboard</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={{ fontWeight: '600', color: THEME.text, marginRight: 8 }}>{online ? 'Online' : 'Offline'}</Text>
            <Switch value={online} onValueChange={setOnline} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={THEME.subtext} />
          <TextInput
            placeholder="Search by user or service"
            placeholderTextColor={THEME.subtext}
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, marginLeft: 8 }}
          />
          {search?.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={THEME.subtext} />
            </Pressable>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <StatCard label="Pending" value={pending.length} icon="time-outline" />
          <StatCard label="Active" value={active.length} icon="play-circle-outline" />
          <StatCard label="Done" value={done.length} icon="checkmark-done-outline" />
          <StatCard label="Earnings" value={inr(done.reduce((a, b) => a + (b.price || 0), 0))} icon="cash-outline" />
        </View>
      </LinearGradient>

      {/* Tabs */}
      <TabBar tab={tab} setTab={setTab} />

      {/* Content */}
      {tab === 'Requests' && (
        <SectionList
          emptyText="No pending requests"
          data={filteredPending}
          renderItem={(item) => <RequestCard item={item} onPress={() => setDetail(item)} />}
        />
      )}

      {tab === 'Bookings' && (
        <SectionList
          emptyText="No active bookings"
          data={filteredActive}
          renderItem={(item) => (
            <BookingCard
              item={item}
              onMarkPaid={() => markPaid(item)}
              onCompleted={() => markCompletedBothConfirmed(item)}
            />
          )}
        />
      )}

      {tab === 'Completed' && (
        <SectionList emptyText="No completed jobs yet" data={filteredDone} renderItem={(item) => <CompletedCard item={item} />} />
      )}

      {tab === 'Earnings' && <EarningsView items={done} />}

      {tab === 'Profile' && <ProfileView />}

      {/* Detail Modal for Pending Request */}
      <Modal visible={!!detail} transparent animationType="slide" onRequestClose={() => setDetail(null)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            {detail && (
              <>
                <Text style={styles.modalTitle}>
                  {detail.service} • {detail.userName}
                </Text>
                <Text style={styles.modalLine}>📅 {detail.date} • {detail.time}</Text>
                <Text style={styles.modalLine}>📍 {detail.location}</Text>
                <Text style={[styles.modalLine, { color: THEME.subtext }]}>📝 {detail.notes}</Text>
                <View style={styles.priceBox}>
                  {(() => {
                    const p = withFee(detail.price);
                    return (
                      <>
                        <Row label="Your base price" value={inr(p.base)} />
                        <Row label="+ Platform fee (12%)" value={inr(p.fee)} />
                        <Row label="= User pays" value={inr(p.total)} bold />
                      </>
                    );
                  })()}
                </View>
                <View style={styles.modalBtnRow}>
                  <GradientButton title="Accept" onPress={() => acceptRequest(detail)} leftIcon="checkmark" />
                  <OutlineButton title="Ignore" onPress={() => rejectRequest(detail)} leftIcon="close" />
                </View>
                <Pressable onPress={() => setDetail(null)} style={{ marginTop: 12, alignSelf: 'center' }}>
                  <Text style={{ color: THEME.subtext }}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// -------- UI SUB-COMPONENTS --------
const TabBar = ({ tab, setTab }) => {
  const tabs = ['Requests', 'Bookings', 'Completed', 'Earnings', 'Profile'];
  return (
    <View style={styles.tabWrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
        {tabs.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.tabItem, tab === t && styles.tabItemActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const SectionList = ({ data, renderItem, emptyText }) => (
  <FlatList
    data={data}
    keyExtractor={(it) => it.id}
    contentContainerStyle={{ padding: 16 }}
    ListEmptyComponent={<EmptyState text={emptyText} />}
    renderItem={({ item }) => renderItem(item)}
  />
);

const EmptyState = ({ text }) => (
  <View style={styles.emptyBox}>
    <Ionicons name="leaf-outline" size={28} color={THEME.subtext} />
    <Text style={{ color: THEME.subtext, marginTop: 6 }}>{text}</Text>
  </View>
);

const RequestCard = ({ item, onPress }) => {
  const p = withFee(item.price);
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.userName}</Text>
          <Text style={styles.cardSub}>
            {item.service} • {item.date} • {item.time}
          </Text>
          <Text style={styles.cardSub}>📍 {item.location}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.price}>{inr(p.total)}</Text>
          <Text style={[styles.cardSub, { fontSize: 11 }]}>incl. 12% fee</Text>
        </View>
      </View>
      <View style={styles.pillRow}>
        <Pill text="Pending" icon="time-outline" />
        <Pill text="Tap to view" icon="open-outline" light />
      </View>
    </Pressable>
  );
};

const BookingCard = ({ item, onMarkPaid, onCompleted }) => (
  <View style={styles.card}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.userName}</Text>
        <Text style={styles.cardSub}>
          {item.service} • {item.date} • {item.time}
        </Text>
        <Text style={styles.cardSub}>📍 {item.location}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.price}>{inr(item.price)}</Text>
        <Text style={[styles.cardSub, { fontSize: 11 }]}>{item.paid ? 'Paid' : 'Payment pending'}</Text>
      </View>
    </View>

    <View style={styles.pillRow}>
      <Pill text={item.paid ? 'Contact visible' : 'Contact hidden until payment'} icon={item.paid ? 'eye-outline' : 'eye-off-outline'} />
    </View>

    <View style={styles.rowGap}>
      {!item.paid && <GradientButton title="Mark as Paid (demo)" onPress={onMarkPaid} leftIcon="card-outline" />}
      <OutlineButton title="Mark Completed (both confirmed)" onPress={onCompleted} leftIcon="checkmark-done-outline" />
    </View>
  </View>
);

const CompletedCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.userName}</Text>
    <Text style={styles.cardSub}>
      {item.service} • {item.date} • {item.time}
    </Text>
    <Text style={styles.cardSub}>📍 {item.location}</Text>
    <View style={styles.pillRow}>
      <Pill text="Completed" icon="checkmark-circle-outline" />
      <Pill text="Payout released" icon="cash-outline" />
    </View>
  </View>
);

// -------- EARNINGS VIEW --------
const EarningsView = ({ items }) => {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const totals = useMemo(() => {
    const base = items.reduce((a, b) => a + (b.price || 0), 0);
    const fee = base * 0.12;
    const total = base + fee;
    return { base, fee, total };
  }, [items]);

  // Daily / Weekly / Monthly numbers
  const breakdown = useMemo(() => {
    let daily = 0,
      weekly = 0,
      monthly = 0;
    items.forEach((x) => {
      const d = parseYMD(x.date);
      if (isSameDay(d, today)) daily += x.price;
      if (isWithin7Days(today, d)) weekly += x.price;
      if (isSameMonth(d, today)) monthly += x.price;
    });
    return { daily, weekly, monthly };
  }, [items, today]);

  // Group helpers for lists
  const dailyList = useMemo(() => {
    return items
      .filter((x) => isSameDay(parseYMD(x.date), today))
      .sort((a, b) => parseYMD(b.date) - parseYMD(a.date));
  }, [items, today]);

  const weeklyBuckets = useMemo(() => {
    // Create last 7 days buckets including today
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return d;
    });
    const map = days.map((d) => ({ label: formatDM(d), date: d, amount: 0 }));
    items.forEach((x) => {
      const d = parseYMD(x.date);
      if (isWithin7Days(today, d)) {
        const key = formatDM(d);
        const idx = map.findIndex((b) => b.label === key);
        if (idx >= 0) map[idx].amount += x.price;
      }
    });
    return map;
  }, [items, today]);

  const monthlyBuckets = useMemo(() => {
    // Make buckets by day in current month (1..today.day)
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const buckets = Array.from({ length: daysInMonth }, (_, i) => ({
      label: `${String(i + 1).padStart(2, '0')}`,
      day: i + 1,
      amount: 0,
    }));
    items.forEach((x) => {
      const d = parseYMD(x.date);
      if (isSameMonth(d, today)) {
        buckets[d.getDate() - 1].amount += x.price;
      }
    });
    return buckets;
  }, [items, today]);

  const [tab, setTab] = useState('Daily'); // Daily | Weekly | Monthly

  // Lightweight bar component (no extra lib)
  const MiniBar = ({ value = 0, max = 1 }) => {
    const pct = Math.max(4, Math.min(100, Math.round((value / Math.max(max, 1)) * 100)));
    return (
      <View style={styles.barWrap}>
        <LinearGradient colors={THEME.gradient} style={[styles.barFill, { width: `${pct}%` }]} />
      </View>
    );
  };

  const maxWeekly = Math.max(...weeklyBuckets.map((b) => b.amount), 1);
  const maxMonthly = Math.max(...monthlyBuckets.map((b) => b.amount), 1);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      {/* Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>
        <View style={styles.priceBox}>
          <Row label="Your earnings (to receive)" value={inr(totals.base)} bold />
          <Row label="Platform fee charged to user (12%)" value={inr(totals.fee)} />
          <Row label="User paid (total)" value={inr(totals.total)} />
        </View>
      </View>

      {/* Breakdown Quick Cards */}
      <View style={styles.grid3}>
        <BreakdownCard icon="sunny-outline" label="Daily" value={inr(breakdown.daily)} active={tab === 'Daily'} onPress={() => setTab('Daily')} />
        <BreakdownCard icon="calendar-outline" label="Weekly" value={inr(breakdown.weekly)} active={tab === 'Weekly'} onPress={() => setTab('Weekly')} />
        <BreakdownCard icon="calendar-number-outline" label="Monthly" value={inr(breakdown.monthly)} active={tab === 'Monthly'} onPress={() => setTab('Monthly')} />
      </View>

      {/* Segmented Control */}
      <View style={styles.segment}>
        {['Daily', 'Weekly', 'Monthly'].map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.segmentBtn, tab === t && styles.segmentBtnActive]}>
            <Text style={[styles.segmentText, tab === t && styles.segmentTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {/* Detail by Tab */}
      {tab === 'Daily' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today • {today.toDateString()}</Text>
          {dailyList.length === 0 ? (
            <EmptyState text="No earnings today" />
          ) : (
            dailyList.map((x) => (
              <View key={x.id} style={styles.rowBetween}>
                <Text style={styles.cardSub}>
                  {x.service} • {x.userName}
                </Text>
                <Text style={styles.price}>{inr(x.price)}</Text>
              </View>
            ))
          )}
        </View>
      )}

      {tab === 'Weekly' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last 7 days</Text>
          <View style={{ marginTop: 10 }}>
            {weeklyBuckets.map((b) => (
              <View key={b.label} style={{ marginBottom: 10 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardSub}>{b.label}</Text>
                  <Text style={styles.cardSub}>{inr(b.amount)}</Text>
                </View>
                <MiniBar value={b.amount} max={maxWeekly} />
              </View>
            ))}
          </View>
        </View>
      )}

      {tab === 'Monthly' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This month</Text>
          <View style={{ marginTop: 10 }}>
            {monthlyBuckets.map((b) => (
              <View key={b.label} style={{ marginBottom: 8 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardSub}>Day {b.label}</Text>
                  <Text style={styles.cardSub}>{inr(b.amount)}</Text>
                </View>
                <MiniBar value={b.amount} max={maxMonthly} />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Recent Payouts (all completed) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Payouts</Text>
        {items.length === 0 && <EmptyState text="No payouts yet" />}
        {items.map((x) => (
          <View key={x.id} style={styles.rowBetween}>
            <Text style={styles.cardSub}>
              {x.date} • {x.service}
            </Text>
            <Text style={styles.price}>{inr(x.price)}</Text>
          </View>
        ))}
      </View>

      {/* Faux actions */}
      <View style={[styles.rowGap, { marginBottom: 20 }]}>
        <GradientButton title="Export CSV (demo)" onPress={() => {}} leftIcon="download-outline" />
        <OutlineButton title="Request Payout (demo)" onPress={() => {}} leftIcon="wallet-outline" />
      </View>
    </ScrollView>
  );
};

const ProfileView = () => {
  const [price, setPrice] = useState('5000');
  const p = withFee(Number(price || 0));
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pricing</Text>
        <Text style={styles.cardSub}>Set your base price. User will see +12% added automatically.</Text>
        <View style={styles.inputRow}>
          <Ionicons name="pricetag-outline" size={18} color={THEME.subtext} />
          <TextInput style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} placeholder="Enter base price" />
        </View>
        <View style={styles.priceBox}>
          <Row label="Your base price" value={inr(p.base)} />
          <Row label="+ 12% platform fee (shown to user)" value={inr(p.fee)} />
          <Row label="= User pays" value={inr(p.total)} bold />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Availability</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.cardSub}>Accepting new bookings</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payout Method</Text>
        <Text style={styles.cardSub}>Add UPI/Bank details in real app. (UI only here)</Text>
        <OutlineButton title="Add payout details" onPress={() => {}} leftIcon="wallet-outline" />
      </View>
    </ScrollView>
  );
};

const BreakdownCard = ({ icon, label, value, onPress, active }) => (
  <Pressable onPress={onPress} style={[styles.breakCard, active && styles.breakCardActive]}>
    <Ionicons name={icon} size={18} color={THEME.text} />
    <Text style={styles.breakVal}>{value}</Text>
    <Text style={styles.breakLbl}>{label}</Text>
  </Pressable>
);

const StatCard = ({ label, value, icon }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={18} color={THEME.text} />
    <Text style={styles.statVal}>{String(value)}</Text>
    <Text style={styles.statLbl}>{label}</Text>
  </View>
);

const Pill = ({ text, icon, light }) => (
  <View style={[styles.pill, light && { backgroundColor: THEME.muted }]}>
    <Ionicons name={icon} size={14} color={THEME.text} />
    <Text style={styles.pillText}>{text}</Text>
  </View>
);

const Row = ({ label, value, bold }) => (
  <View style={styles.rowBetween}>
    <Text style={[styles.cardSub, bold && { fontWeight: '700', color: THEME.text }]}>{label}</Text>
    <Text style={[styles.cardSub, bold && { fontWeight: '700', color: THEME.text }]}>{value}</Text>
  </View>
);

const GradientButton = ({ title, onPress, leftIcon }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <LinearGradient colors={THEME.gradient} style={styles.gradBtn}>
      {leftIcon && <Ionicons name={leftIcon} size={18} color={THEME.text} style={{ marginRight: 8 }} />}
      <Text style={styles.gradBtnText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const OutlineButton = ({ title, onPress, leftIcon }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.outBtn}>
    {leftIcon && <Ionicons name={leftIcon} size={18} color={THEME.text} style={{ marginRight: 8 }} />}
    <Text style={styles.outBtnText}>{title}</Text>
  </TouchableOpacity>
);

// -------- STYLES --------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: THEME.bg },
  header: {
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.white, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  title: { fontSize: 20, fontWeight: '800', color: THEME.text },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.white, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, shadowColor: THEME.shadow, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  statCard: { flex: 1, backgroundColor: THEME.white, marginHorizontal: 4, paddingVertical: 12, borderRadius: 16, alignItems: 'center', shadowColor: THEME.shadow, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  statVal: { fontSize: 18, fontWeight: '800', color: THEME.text, marginTop: 6 },
  statLbl: { fontSize: 12, color: THEME.subtext },
  tabWrap: { paddingVertical: 8, borderBottomColor: '#eee', borderBottomWidth: 1, backgroundColor: THEME.bg },
  tabItem: { paddingVertical: 10, paddingHorizontal: 14, backgroundColor: THEME.white, borderRadius: 999, marginRight: 8 },
  tabItemActive: { backgroundColor: THEME.card, borderWidth: 1, borderColor: '#e8d5c7' },
  tabText: { color: THEME.subtext, fontWeight: '600' },
  tabTextActive: { color: THEME.text },
  emptyBox: { padding: 24, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: THEME.card, borderRadius: 18, padding: 14, marginBottom: 14, shadowColor: THEME.shadow, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: THEME.text },
  cardSub: { fontSize: 13, color: THEME.subtext, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '800', color: THEME.text, marginTop: 8 },
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#fdebd5', borderRadius: 999 },
  pillText: { fontSize: 12, color: THEME.text },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  rowGap: { gap: 10, marginTop: 12 },
  gradBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 },
  gradBtnText: { fontWeight: '800', color: THEME.text },
  outBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 11, borderRadius: 12, borderWidth: 1, borderColor: '#e0c7b8' },
  outBtnText: { fontWeight: '800', color: THEME.text },
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: THEME.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: '85%' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: THEME.text },
  modalLine: { marginTop: 6, color: THEME.text },
  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  priceBox: { backgroundColor: THEME.bg, borderRadius: 12, padding: 12, marginTop: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.white, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#f0e1d6', marginTop: 10 },
  input: { marginLeft: 8, flex: 1, fontWeight: '700', color: THEME.text },
  // Earnings extras
  grid3: { flexDirection: 'row', gap: 8, marginTop: 6 },
  breakCard: { flex: 1, backgroundColor: THEME.white, alignItems: 'center', paddingVertical: 12, borderRadius: 14, shadowColor: THEME.shadow, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  breakCardActive: { borderWidth: 1, borderColor: '#e8d5c7' },
  breakVal: { fontSize: 16, fontWeight: '800', color: THEME.text, marginTop: 4 },
  breakLbl: { fontSize: 12, color: THEME.subtext },
  segment: { flexDirection: 'row', backgroundColor: THEME.white, borderRadius: 999, padding: 4, marginVertical: 12 },
  segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: '#fdebd5' },
  segmentText: { fontWeight: '600', color: THEME.subtext },
  segmentTextActive: { color: THEME.text },
  barWrap: { height: 10, backgroundColor: THEME.muted, borderRadius: 999, overflow: 'hidden', marginTop: 6 },
  barFill: { height: 10, borderRadius: 999 },
});
