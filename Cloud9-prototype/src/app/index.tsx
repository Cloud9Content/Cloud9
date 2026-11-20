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

type Group = 'Producten' | 'Diensten' | 'Activiteiten' | 'Initiatieven';
type GroupFilter = 'Alles' | Group;

type Listing = {
  id: string;
  name: string;
  kind: string;
  group: Group;
  description: string;
  provider: string;
  distanceM: number;
  icon: string;
  color: string;
  tags: string[];
};

const groups: GroupFilter[] = [
  'Alles',
  'Producten',
  'Diensten',
  'Activiteiten',
  'Initiatieven',
];

const radiusOptions = [
  { label: '500 m', meters: 500 },
  { label: '1 km', meters: 1000 },
  { label: '3 km', meters: 3000 },
  { label: '5 km', meters: 5000 },
];

const listings: Listing[] = [
  {
    id: 'audio',
    name: 'TweedeKans Audio',
    kind: 'Producten · audio',
    group: 'Producten',
    description: 'Gereviseerde koptelefoons en kleine audioapparatuur.',
    provider: 'Voorbeeldwinkel',
    distanceM: 420,
    icon: '🎧',
    color: '#E5EFF5',
    tags: ['koptelefoon', 'hoofdtelefoon', 'audio', 'tweedehands', 'reparatie'],
  },
  {
    id: 'markt',
    name: 'Buurtmarkt',
    kind: 'Producten · markt',
    group: 'Producten',
    description: 'Groente, brood en producten van makers uit de omgeving.',
    provider: 'Voorbeeldmarkt',
    distanceM: 680,
    icon: '🥕',
    color: '#E5F1E5',
    tags: ['markt', 'groente', 'brood', 'lokaal', 'eten'],
  },
  {
    id: 'fiets',
    name: 'Fietsservice aan huis',
    kind: 'Dienst',
    group: 'Diensten',
    description: 'Kleine reparaties en onderhoud op afspraak.',
    provider: 'Voorbeeldservice',
    distanceM: 900,
    icon: '🚲',
    color: '#E8EEF8',
    tags: ['fiets', 'fietsenmaker', 'reparatie', 'band', 'onderhoud'],
  },
  {
    id: 'repair-cafe',
    name: 'Repaircafé Noord',
    kind: 'Initiatief · reparatie',
    group: 'Initiatieven',
    description: 'Vrijwilligers helpen spullen samen repareren.',
    provider: 'Voorbeeldinitiatief',
    distanceM: 1450,
    icon: '🛠️',
    color: '#F3EBDD',
    tags: ['repair café', 'repareren', 'vrijwilligers', 'duurzaam', 'herstel'],
  },
  {
    id: 'kleding',
    name: 'Kledingatelier Steekje',
    kind: 'Dienst · kledingherstel',
    group: 'Diensten',
    description: 'Kleding verstellen, herstellen en laten innemen.',
    provider: 'Voorbeeldatelier',
    distanceM: 1850,
    icon: '🧵',
    color: '#F0E8F5',
    tags: ['kleding', 'naaien', 'herstellen', 'reparatie', 'atelier'],
  },
  {
    id: 'vrijwilligers',
    name: 'Help mee in de buurttuin',
    kind: 'Vrijwilligerswerk',
    group: 'Initiatieven',
    description: 'Samen tuinieren en de buurtplek onderhouden.',
    provider: 'Voorbeeldbuurtinitiatief',
    distanceM: 2100,
    icon: '🌱',
    color: '#E2F2EE',
    tags: ['vrijwilligerswerk', 'tuin', 'natuur', 'buurt', 'helpen'],
  },
  {
    id: 'workshop',
    name: 'Keramiekatelier: open workshop',
    kind: 'Activiteit · workshop',
    group: 'Activiteiten',
    description: 'Probeer klei draaien tijdens een introductieworkshop.',
    provider: 'Voorbeeldatelier',
    distanceM: 2600,
    icon: '🏺',
    color: '#F5E9D7',
    tags: ['workshop', 'keramiek', 'klei', 'creatief', 'maken'],
  },
  {
    id: 'sport',
    name: 'Sportpark Rivierwijk',
    kind: 'Activiteit · sport',
    group: 'Activiteiten',
    description: 'Lokale voetbalwedstrijd op het sportpark.',
    provider: 'Voorbeeldvereniging',
    distanceM: 3400,
    icon: '⚽',
    color: '#E5F1E5',
    tags: ['voetbal', 'wedstrijd', 'sport', 'vereniging', 'publiek'],
  },
  {
    id: 'theater',
    name: 'Theater De Linde',
    kind: 'Activiteit · theater',
    group: 'Activiteiten',
    description: 'Kleinschalige voorstelling van een lokaal gezelschap.',
    provider: 'Voorbeeldtheater',
    distanceM: 4300,
    icon: '🎭',
    color: '#F0E8F5',
    tags: ['theater', 'voorstelling', 'cultuur', 'toneel', 'avond'],
  },
  {
    id: 'bakkerij',
    name: 'Ochtendbrood van De Molen',
    kind: 'Producten · bakkerij',
    group: 'Producten',
    description: 'Dagelijks brood en gebak, ook vooraf te bestellen.',
    provider: 'Bakkerij De Molen',
    distanceM: 550,
    icon: '🥖',
    color: '#F5E9D7',
    tags: ['bakker', 'brood', 'gebak', 'ontbijt', 'bestellen'],
  },
  {
    id: 'mobielpunt',
    name: 'Mobielpunt',
    kind: 'Dienst · telefoonservice',
    group: 'Diensten',
    description: 'Hulp bij telefooninstellingen en kleine reparaties.',
    provider: 'Mobielpunt Rivierwijk',
    distanceM: 1250,
    icon: '📱',
    color: '#E5EFF5',
    tags: ['telefoon', 'mobiel', 'scherm', 'instellen', 'reparatie'],
  },
  {
    id: 'hondenuitlaat',
    name: 'Samen op pad',
    kind: 'Dienst · dierenzorg',
    group: 'Diensten',
    description: 'Honden uitlaten wanneer je zelf even geen tijd hebt.',
    provider: 'Samen op pad',
    distanceM: 1750,
    icon: '🐕',
    color: '#E5F1E5',
    tags: ['hond', 'hondenuitlaat', 'dieren', 'wandelen', 'oppas'],
  },
  {
    id: 'taalcafe',
    name: 'Taalcafé aan het plein',
    kind: 'Initiatief · ontmoeting',
    group: 'Initiatieven',
    description: 'Oefen Nederlands in een ontspannen gesprek met buurtgenoten.',
    provider: 'Taalcafé Rivierwijk',
    distanceM: 950,
    icon: '💬',
    color: '#E2F2EE',
    tags: ['taal', 'nederlands', 'oefenen', 'ontmoeten', 'buurt'],
  },
  {
    id: 'werkplek',
    name: 'Werkplek aan het water',
    kind: 'Dienst · werkruimte',
    group: 'Diensten',
    description: 'Een rustige flexplek met wifi voor een dagdeel.',
    provider: 'Werkplek Rivier',
    distanceM: 2300,
    icon: '💻',
    color: '#E8EEF8',
    tags: ['werkplek', 'flexplek', 'werken', 'wifi', 'studeren'],
  },
  {
    id: 'muziekavond',
    name: 'Live muziek op vrijdag',
    kind: 'Activiteit · muziek',
    group: 'Activiteiten',
    description: 'Lokale muzikanten spelen een korte set in het buurtcafé.',
    provider: 'Café De Brug',
    distanceM: 1650,
    icon: '🎸',
    color: '#F0E8F5',
    tags: ['muziek', 'live', 'concert', 'café', 'vrijdag'],
  },
  {
    id: 'buurtboeken',
    name: 'Boekhandel Letter & Lokaal',
    kind: 'Producten · boeken',
    group: 'Producten',
    description: 'Boeken, kaarten en werk van schrijvers uit de regio.',
    provider: 'Letter & Lokaal',
    distanceM: 2950,
    icon: '📚',
    color: '#F3EBDD',
    tags: ['boek', 'boeken', 'boekhandel', 'lezen', 'schrijver'],
  },
  {
    id: 'digitaalspreekuur',
    name: 'Digitaal spreekuur',
    kind: 'Initiatief · hulp',
    group: 'Initiatieven',
    description: 'Vrijwilligers helpen met praktische vragen over websites en apps.',
    provider: 'Bibliotheek Rivierwijk',
    distanceM: 1100,
    icon: '🖥️',
    color: '#E5EFF5',
    tags: ['digitaal', 'computer', 'internet', 'app', 'hulp'],
  },
];

function formatDistance(distanceM: number) {
  if (distanceM < 1000) {
    return `${distanceM} m`;
  }
  return `${(distanceM / 1000).toFixed(1).replace('.', ',')} km`;
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState(1000);
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>('Alles');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const query = search.trim().toLowerCase();

  const results = listings
    .filter((listing) => {
      const withinRadius = listing.distanceM <= radius;
      const matchesGroup =
        selectedGroup === 'Alles' || listing.group === selectedGroup;
      const searchableText = [
        listing.name,
        listing.kind,
        listing.group,
        listing.description,
        listing.provider,
        listing.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return (
        withinRadius &&
        matchesGroup &&
        (!query || searchableText.includes(query))
      );
    })
    .sort((a, b) => a.distanceM - b.distanceM);

  if (selectedListing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable
            onPress={() => setSelectedListing(null)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹  Terug naar Ontdek</Text>
          </Pressable>

          <View
            style={[
              styles.detailHero,
              { backgroundColor: selectedListing.color },
            ]}
          >
            <Text style={styles.detailIcon}>{selectedListing.icon}</Text>
            <Text style={styles.demoBadge}>VOORBEELD AANBOD</Text>
          </View>

          <Text style={styles.detailKind}>{selectedListing.kind}</Text>
          <Text style={styles.detailTitle}>{selectedListing.name}</Text>
          <Text style={styles.detailDescription}>
            {selectedListing.description}
          </Text>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>AANBIEDER</Text>
            <Text style={styles.detailValue}>{selectedListing.provider}</Text>
            <Text style={styles.detailLabel}>AFSTAND</Text>
            <Text style={styles.detailValue}>
              {formatDistance(selectedListing.distanceM)} · Voorbeeldbuurt
            </Text>
          </View>

          <Text style={styles.smallNote}>
            Dit is een fictief voorbeeld. De locatie en afstand zijn nagebootst.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

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

        <Text style={styles.eyebrow}>ONTDEK LOKAAL</Text>
        <Text style={styles.title}>Wat zoek je in de buurt?</Text>
        <Text style={styles.subtitle}>
          Zoek vrij in producten, diensten, activiteiten en initiatieven.
        </Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Bijv. repaircafé, workshop, fiets..."
            placeholderTextColor="#81908B"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <Text style={styles.controlLabel}>Zoekradius</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipList}
        >
          {radiusOptions.map((option) => {
            const active = radius === option.meters;
            return (
              <Pressable
                key={option.label}
                onPress={() => setRadius(option.meters)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.controlLabel}>Verfijn eventueel op soort</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipList}
        >
          {groups.map((group) => {
            const active = selectedGroup === group;
            return (
              <Pressable
                key={group}
                onPress={() => setSelectedGroup(group)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {group}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeading}>
          <View>
            <Text style={styles.sectionTitle}>Aanbod in de buurt</Text>
            <Text style={styles.resultNote}>
              {results.length} voorbeelden binnen {formatDistance(radius)}
            </Text>
          </View>
          <Text style={styles.sortLabel}>Dichtstbij</Text>
        </View>

        {results.length > 0 ? (
          results.map((listing) => (
            <Pressable
              key={listing.id}
              onPress={() => setSelectedListing(listing)}
              style={({ pressed }) => [
                styles.listingCard,
                pressed && styles.listingPressed,
              ]}
            >
              <View
                style={[
                  styles.listingIcon,
                  { backgroundColor: listing.color },
                ]}
              >
                <Text style={styles.listingEmoji}>{listing.icon}</Text>
              </View>

              <View style={styles.listingInfo}>
                <View style={styles.listingTopLine}>
                  <Text style={styles.listingName}>{listing.name}</Text>
                  <Text style={styles.distance}>
                    {formatDistance(listing.distanceM)}
                  </Text>
                </View>
                <Text style={styles.listingKind}>{listing.kind}</Text>
                <Text style={styles.listingDescription}>
                  {listing.description}
                </Text>
                <Text style={styles.listingProvider}>{listing.provider}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Geen aanbod gevonden</Text>
            <Text style={styles.emptyText}>
              Vergroot de straal of probeer een andere zoekterm.
            </Text>
          </View>
        )}

        <Text style={styles.footerNote}>
          Voorbeeldcatalogus · geen echte locatie gebruikt
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F8F5' },
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
    marginBottom: 26,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#25A995',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  logoName: {
    marginLeft: 9,
    color: '#183D36',
    fontSize: 21,
    fontWeight: '800',
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
  locationDot: { color: '#25A995', fontSize: 9, marginRight: 7 },
  locationText: { color: '#35564F', fontSize: 12, fontWeight: '600' },
  eyebrow: {
    color: '#278F7E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    color: '#173B34',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64756F',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  searchBox: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE8E2',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginTop: 18,
  },
  searchIcon: {
    color: '#278F7E',
    fontSize: 27,
    marginRight: 10,
    marginTop: -3,
  },
  searchInput: { flex: 1, color: '#193D36', fontSize: 14 },
  controlLabel: {
    color: '#46645C',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 9,
  },
  chipList: { paddingRight: 20 },
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1EAE5',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#1C5147', borderColor: '#1C5147' },
  chipText: { color: '#46645C', fontSize: 11, fontWeight: '700' },
  chipTextActive: { color: '#FFFFFF' },
  resultsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 4,
  },
  sectionTitle: { color: '#193D36', fontSize: 18, fontWeight: '800' },
  resultNote: { color: '#7B8D87', fontSize: 11, marginTop: 4 },
  sortLabel: { color: '#278F7E', fontSize: 11, fontWeight: '700' },
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginTop: 10,
  },
  listingPressed: { opacity: 0.75 },
  listingIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listingEmoji: { fontSize: 23 },
  listingInfo: { flex: 1, marginLeft: 11 },
  listingTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listingName: {
    color: '#1D4039',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  distance: { color: '#278F7E', fontSize: 11, fontWeight: '700' },
  listingKind: {
    color: '#58736B',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  listingDescription: {
    color: '#687B74',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  listingProvider: { color: '#88968F', fontSize: 10, marginTop: 5 },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
  },
  emptyTitle: { color: '#193D36', fontSize: 15, fontWeight: '800' },
  emptyText: { color: '#687B74', fontSize: 12, lineHeight: 18, marginTop: 5 },
  footerNote: {
    color: '#7B8D87',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 18,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingRight: 12,
    marginBottom: 12,
  },
  backText: { color: '#278F7E', fontSize: 14, fontWeight: '700' },
  detailHero: {
    minHeight: 180,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  detailIcon: { fontSize: 60 },
  demoBadge: {
    color: '#35564F',
    backgroundColor: '#FFFFFFCC',
    overflow: 'hidden',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 12,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  detailKind: {
    color: '#278F7E',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 20,
  },
  detailTitle: {
    color: '#173B34',
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '800',
    marginTop: 6,
  },
  detailDescription: {
    color: '#64756F',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
  },
  detailLabel: {
    color: '#789088',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 7,
  },
  detailValue: {
    color: '#1D4039',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  smallNote: {
    color: '#7B8D87',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 18,
  },
});