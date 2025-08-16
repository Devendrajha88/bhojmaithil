import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [result, setResult] = useState('');

const data = {
  // 🚩 आरती
  "गणेश आरती": `📌 श्री गणेश आरती\n
🪔 जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥  

एक दंत दयावंत, चार भुजा धारी  
माथे सिंदूर सोहे, मूसे की सवारी ॥  
जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥  

पान चढ़े, फल चढ़े, और चढ़े मेवा  
लड्डुअन का भोग लगे, संत करें सेवा ॥  
जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥  

अंधन को आंख देत, कोढ़िन को काया  
बांझन को पुत्र देत, निर्धन को माया ॥  
जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥  

'सूर' श्याम शरण आए, सफल कीजे सेवा  
माता जाकी पार्वती, पिता महादेवा ॥  
जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥  

दीनन की लाज रखो, शंभु सुतकारी  
कामना को पूर्ण करो, जाऊं बलिहारी ॥  
जय गणेश, जय गणेश, जय गणेश देवा  
माता जाकी पार्वती, पिता महादेवा ॥`,

  "लक्ष्मी आरती": `📌 लक्ष्मी माता की आरती\n
🪔 ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता  
तुमको निशदिन सेवत, हर विष्णु विधाता ॥  

उमा, रमा, ब्रह्माणी, तुम ही जग-माता  
सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता ॥  
ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता  
तुमको निशदिन सेवत, हर विष्णु विधाता ॥  

दुर्गा रूप निरंजन, सुख-सम्पत्ति दाता  
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि पाता ॥  
ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता  
तुमको निशदिन सेवत, हर विष्णु विधाता ॥  

तुम पाताल-निवासिनी, तुम ही शुभ-दाता  
कर्म-प्रभाव-प्रकाशिनी, भव-भय-हरता ॥  
ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता  
तुमको निशदिन सेवत, हर विष्णु विधाता ॥`
};


  const handleSearch = () => {
    const matched = data[query];
    if (matched) {
      setResult(matched);
    } else {
      setResult('🙏 क्षमा करें! यह गीत/मंत्र उपलब्ध नहीं है।');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Text style={styles.heading}>🔍 गीत / मंत्र खोजें</Text>

      <TextInput
        style={styles.input}
        placeholder='e.g. "गणेश आरती", "विवाह गीत"'
        placeholderTextColor="#777"
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="🧩 Category Filter" value="" />
          <Picker.Item label="🚩 आरती" value="आरती" />
          <Picker.Item label="📿 मंत्र" value="मंत्र" />
          <Picker.Item label="🎵 विवाह गीत" value="विवाह गीत" />
          <Picker.Item label="🧒🏻 उपनयन गीत" value="उपनयन गीत" />
          <Picker.Item label="🙏 पिंडदान मंत्र" value="पिंडदान मंत्र" />
          <Picker.Item label="⚱ श्राद्ध मंत्र" value="श्राद्ध मंत्र" />
          <Picker.Item label="🪔 पर्व गीत" value="पर्व गीत" />
        </Picker>
      </View>

      <ScrollView
        style={styles.resultBox}
        maximumZoomScale={3}
        minimumZoomScale={1}
      >
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ef',
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#6a1b1a'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#ff6f00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20
  },
  resultBox: {
    flex: 1,
    backgroundColor: '#fffdf8',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 30
  }
});