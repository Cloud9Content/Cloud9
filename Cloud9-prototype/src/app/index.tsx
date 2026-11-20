import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category =
  | 'Eten & drinken'
  | 'Winkels'
  | 'Diensten'
  | 'Activiteiten'
  | 'Initiatieven';

type Filter = 'Alles' | Category;

const categories: Filter[] = [
  'Alles',
  'Eten & drinken',
  'Winkels',
  'Diensten',
  'Activiteiten',
  'Initiatieven',
];

const places: {
  name: string;
  category: Category;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    name: 'Koffiehoek',
    category: 'Eten & drinken',
    description: 'Koffie en iets lekkers uit de buurt',
    icon: '☕',
    color: '#F3EBDD',
  },
  {
    name: 'Groene Markt',
    category: 'Winkels',
    description: 'Lokale producten en verse groenten',
    icon: '🥬',
    color: '#E5F1E5',
  },
  {
    name: 'Buurtatelier',
    category: 'Activiteiten',
    description: 'Creatieve workshops voor iedereen',
    icon: '🎨',
    color: '#F0E8F5',
  },
  {
    name: 'Samen in de wijk',
    category: 'Initiatieven',
    description: 'Een idee van en voor de gemeenschap',
    icon: '🌱',
    color: '#E2F2EE',
  },
  {
    name: 'Fietshulp',
    category: 'Diensten',
    description: 'Kleine reparaties en hulp met je fiets',
    icon: '🚲',
    color: '#E8EEF8',
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Filter>('Alles');

  const query = search.trim().toLowerCase();
  const visiblePlaces = places.filter((place) => {
    const matchesCategory =
      selectedCategory === 'Alles' || place.category === selectedCategory;
    const searchableText =
      `${place.name} ${place.category} ${place.description}`.toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>9</Text>
          </View>
          <Text style={styles.logoName}>cloud9</Text>
          <View style={styles.locationPill}>
            <Text style={styles.locationDot}>●</Text>
            <Text style={styles.locationText}>Voorbeeldbuurt</Text>
          </View>
        </View>

        <Text style={styles.eyebrow}>LOKAAL BEGINT HIER</Text>
        <Text style={styles.title}>Wat ontdek je vandaag?</Text>
        <Text style={styles.subtitle}>
          Vind winkels, diensten en activiteiten bij jou in de buurt.
        </Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Zoek lokaal aanbod"
            placeholderTextColor="#81908B"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.privacyIcon}>
            <Text style={styles.privacyCheck}>✓</Text>
          </View>
          <View style={styles.privacyCopy}>
            <Text style={styles.privacyTitle}>Jij houdt de regie</Text>
            <Text style={styles.privacyText}>
              Geen volgprofiel. Jij kiest wat je wilt zien.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Ontdek lokaal</Text>
          <Text style={styles.sectionHint}>VOORBEELD AANBOD</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeading}>
          <Text style={styles.sectionTitle}>In de buurt</Text>
          <Text style={styles.resultCount}>
            {visiblePlaces.length} voorbeelden
          </Text>
        </View>

        {visiblePlaces.length > 0 ? (
          visiblePlaces.map((place) => (
            <View key={place.name} style={styles.placeCard}>
              <View style={[styles.placeIcon, { backgroundColor: place.color }]}>
                <Text style={styles.placeEmoji}>{place.icon}</Text>
              </View>

              <View style={styles.placeInfo}>
                <View style={styles.placeTitleRow}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.exampleBadge}>DEMO</Text>
                </View>
                <Text style={styles.placeDescription}>{place.description}</Text>
                <Text style={styles.placeCategory}>{place.category}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Niets gevonden</Text>
            <Text style={styles.emptyText}>
              Probeer een andere zoekterm of categorie.
            </Text>
          </View>
        )}

        <Text style={styles.footerNote}>
          Dit is een demo met voorbeeldgegevens. Je locatie wordt niet gebruikt.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#25A995',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  logoName: {
    marginLeft: 9,
    color: '#183D36',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  locationPill: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  locationDot: {
    color: '#25A995',
    fontSize: 9,
    marginRight: 7,
  },
  locationText: {
    color: '#35564F',
    fontSize: 12,
    fontWeight: '600',
  },
  eyebrow: {
    color: '#278F7E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    color: '#173B34',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64756F',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 7,
  },
  searchBox: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E1EAE5',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginTop: 19,
  },
  searchIcon: {
    color: '#278F7E',
    fontSize: 27,
    marginRight: 10,
    marginTop: -3,
  },
  searchInput: {
    flex: 1,
    color: '#193D36',
    fontSize: 15,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F3EE',
    borderRadius: 17,
    padding: 14,
    marginTop: 13,
  },
  privacyIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#D0EAE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  privacyCheck: {
    color: '#197B6C',
    fontSize: 18,
    fontWeight: '800',
  },
  privacyCopy: {
    flex: 1,
  },
  privacyTitle: {
    color: '#20473E',
    fontSize: 13,
    fontWeight: '800',
  },
  privacyText: {
    color: '#58736B',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 13,
  },
  sectionTitle: {
    color: '#193D36',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionHint: {
    color: '#789088',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  categoryList: {
    paddingRight: 20,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1EAE5',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#1C5147',
    borderColor: '#1C5147',
  },
  categoryText: {
    color: '#46645C',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  resultsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 3,
  },
  resultCount: {
    color: '#7B8D87',
    fontSize: 12,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 13,
    marginTop: 11,
  },
  placeIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeEmoji: {
    fontSize: 25,
  },
  placeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  placeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeName: {
    color: '#1D4039',
    fontSize: 15,
    fontWeight: '800',
    flexShrink: 1,
  },
  exampleBadge: {
    color: '#287F70',
    backgroundColor: '#E6F3EE',
    overflow: 'hidden',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginLeft: 7,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  placeDescription: {
    color: '#687B74',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  placeCategory: {
    color: '#278F7E',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
  },
  emptyTitle: {
    color: '#193D36',
    fontSize: 15,
    fontWeight: '800',
  },
  emptyText: {
    color: '#687B74',
    fontSize: 13,
    marginTop: 5,
  },
  footerNote: {
    color: '#7B8D87',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
});