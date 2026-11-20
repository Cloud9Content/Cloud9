import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PersonaId = 'lisa' | 'noor' | 'milan';

type Interest =
  | 'Yoga & welzijn'
  | 'Duurzaamheid'
  | 'Lokale events'
  | 'Lifestyle & nieuws'
  | 'Cultuur'
  | 'Buurtinitiatieven'
  | 'Lokaal nieuws'
  | 'Sport'
  | 'Eten & drinken';

type FeedItem = {
  id: string;
  kind: 'Artikel' | 'Event' | 'Initiatief' | 'Advertentie';
  title: string;
  description: string;
  source: string;
  distanceM: number;
  icon: string;
  color: string;
  interests: Interest[];
  isAd: boolean;
};

const personas: {
  id: PersonaId;
  name: string;
  description: string;
  interests: Interest[];
}[] = [
  {
    id: 'lisa',
    name: 'Lisa',
    description: 'Yoga, duurzaamheid, lokale events en lifestyle',
    interests: [
      'Yoga & welzijn',
      'Duurzaamheid',
      'Lokale events',
      'Lifestyle & nieuws',
    ],
  },
  {
    id: 'noor',
    name: 'Noor',
    description: 'Cultuur, buurtnieuws en initiatieven',
    interests: [
      'Cultuur',
      'Buurtinitiatieven',
      'Lokaal nieuws',
      'Lokale events',
    ],
  },
  {
    id: 'milan',
    name: 'Milan',
    description: 'Sport, eten en activiteiten in de buurt',
    interests: ['Sport', 'Eten & drinken', 'Lokale events', 'Lifestyle & nieuws'],
  },
];

const allInterests: Interest[] = [
  'Yoga & welzijn',
  'Duurzaamheid',
  'Lokale events',
  'Lifestyle & nieuws',
  'Cultuur',
  'Buurtinitiatieven',
  'Lokaal nieuws',
  'Sport',
  'Eten & drinken',
];

const feedItems: FeedItem[] = [
  {
    id: 'lisa-groen',
    kind: 'Artikel',
    title: 'Minder tegels, meer vlinders',
    description:
      'Buurtbewoners maken samen ruimte voor bloemen en insecten.',
    source: 'Voorbeeldverhaal · Buurtredactie',
    distanceM: 800,
    icon: '🌱',
    color: '#E2F2EE',
    interests: ['Duurzaamheid', 'Lifestyle & nieuws'],
    isAd: false,
  },
  {
    id: 'lisa-yoga',
    kind: 'Event',
    title: 'Yoga in het park',
    description:
      'Een rustige buitenles voor beginners en mensen met ervaring.',
    source: 'Voorbeeldactiviteit · Studio Adem',
    distanceM: 1200,
    icon: '🧘',
    color: '#E5EFF5',
    interests: ['Yoga & welzijn', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'lisa-wandel',
    kind: 'Artikel',
    title: 'Een nieuwe wandelroute langs het water',
    description:
      'Een buurtbewoner deelt een favoriete route voor een frisse ochtend.',
    source: 'Voorbeeldverhaal · Om de Hoek',
    distanceM: 1500,
    icon: '🚶',
    color: '#E8EEF8',
    interests: ['Yoga & welzijn', 'Lifestyle & nieuws'],
    isAd: false,
  },
  {
    id: 'lisa-markt',
    kind: 'Event',
    title: 'Makersmarkt voor hergebruik',
    description:
      'Ontdek lokale makers, tweedehands vondsten en duurzame ideeën.',
    source: 'Voorbeeldactiviteit · Buurtmarkt',
    distanceM: 1900,
    icon: '🧺',
    color: '#F3EBDD',
    interests: ['Duurzaamheid', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'lisa-ad-yoga',
    kind: 'Advertentie',
    title: 'Proefles bij Studio Adem',
    description:
      'Een lokale studio laat zien welke lessen deze maand starten.',
    source: 'Voorbeeldreclame · Studio Adem',
    distanceM: 900,
    icon: '✨',
    color: '#F0E8F5',
    interests: ['Yoga & welzijn'],
    isAd: true,
  },
  {
    id: 'lisa-ad-kledingruil',
    kind: 'Advertentie',
    title: 'Kledingruil op het plein',
    description:
      'Een lokale winkel steunt de kledingruil en nodigt buurtbewoners uit.',
    source: 'Voorbeeldreclame · Kledingatelier Steekje',
    distanceM: 1100,
    icon: '👕',
    color: '#F5E9D7',
    interests: ['Duurzaamheid', 'Lokale events'],
    isAd: true,
  },
  {
    id: 'noor-theater',
    kind: 'Artikel',
    title: 'Wie maakt het buurttheater?',
    description:
      'Vrijwilligers vertellen hoe een leegstaand pand een speelplek werd.',
    source: 'Voorbeeldverhaal · Buurtredactie',
    distanceM: 700,
    icon: '🎭',
    color: '#F0E8F5',
    interests: ['Cultuur', 'Buurtinitiatieven', 'Lokaal nieuws'],
    isAd: false,
  },
  {
    id: 'noor-voorstelling',
    kind: 'Event',
    title: 'Voorstelling: Verhalen uit de wijk',
    description:
      'Een lokaal gezelschap brengt verhalen van buurtbewoners op het podium.',
    source: 'Voorbeeldactiviteit · Theater De Linde',
    distanceM: 1300,
    icon: '🎟️',
    color: '#E5EFF5',
    interests: ['Cultuur', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'noor-vrijwilligers',
    kind: 'Initiatief',
    title: 'Help mee met de cultuurdag',
    description:
      'De buurt zoekt vrijwilligers voor ontvangst en kinderactiviteiten.',
    source: 'Voorbeeldinitiatief · Samen in de wijk',
    distanceM: 1600,
    icon: '🤝',
    color: '#E2F2EE',
    interests: ['Buurtinitiatieven', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'noor-gebouw',
    kind: 'Artikel',
    title: 'Een oud gebouw krijgt een nieuwe bestemming',
    description:
      'Een lokaal plan geeft een vertrouwde plek een tweede leven.',
    source: 'Voorbeeldverhaal · Stad & Buurt',
    distanceM: 2100,
    icon: '🏛️',
    color: '#F3EBDD',
    interests: ['Cultuur', 'Lokaal nieuws'],
    isAd: false,
  },
  {
    id: 'noor-ad-theater',
    kind: 'Advertentie',
    title: 'Kaarten voor Theater De Linde',
    description:
      'Het theater tipt een voorstelling die aansluit bij cultuur en wijkverhalen.',
    source: 'Voorbeeldreclame · Theater De Linde',
    distanceM: 1300,
    icon: '🎭',
    color: '#F0E8F5',
    interests: ['Cultuur', 'Lokale events'],
    isAd: true,
  },
  {
    id: 'noor-ad-boek',
    kind: 'Advertentie',
    title: 'Lezing in de buurtboekhandel',
    description:
      'Een boekhandel nodigt lezers uit voor een avond met een lokale schrijver.',
    source: 'Voorbeeldreclame · Buurtboekhandel',
    distanceM: 950,
    icon: '📚',
    color: '#F5E9D7',
    interests: ['Cultuur', 'Lokaal nieuws'],
    isAd: true,
  },
  {
    id: 'milan-toernooi',
    kind: 'Event',
    title: 'Buurttoernooi op het sportpark',
    description:
      'Teams uit de wijk spelen een open toernooi voor supporters.',
    source: 'Voorbeeldactiviteit · Sportvereniging',
    distanceM: 1400,
    icon: '⚽',
    color: '#E5F1E5',
    interests: ['Sport', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'milan-team',
    kind: 'Artikel',
    title: 'Het jeugdteam zoekt nieuwe spelers',
    description:
      'Lees hoe je een keer kunt meetrainen bij de club uit de buurt.',
    source: 'Voorbeeldverhaal · Sportvereniging',
    distanceM: 1600,
    icon: '🥅',
    color: '#E8EEF8',
    interests: ['Sport', 'Buurtinitiatieven'],
    isAd: false,
  },
  {
    id: 'milan-food',
    kind: 'Event',
    title: 'Proef de buurt: foodtruckavond',
    description:
      'Een avond met hapjes van lokale keukens en muziek op het plein.',
    source: 'Voorbeeldactiviteit · Buurtplein',
    distanceM: 1800,
    icon: '🍲',
    color: '#F3EBDD',
    interests: ['Eten & drinken', 'Lokale events'],
    isAd: false,
  },
  {
    id: 'milan-bewegen',
    kind: 'Artikel',
    title: 'Meer bewegen in de wijk',
    description:
      'Een buurtcoach deelt laagdrempelige routes en sportmomenten.',
    source: 'Voorbeeldverhaal · Buurtredactie',
    distanceM: 2200,
    icon: '🏃',
    color: '#E2F2EE',
    interests: ['Sport', 'Lifestyle & nieuws'],
    isAd: false,
  },
  {
    id: 'milan-ad-gym',
    kind: 'Advertentie',
    title: 'Proefweek bij de wijkgym',
    description:
      'Een lokale sportschool biedt een kennismakingsweek aan.',
    source: 'Voorbeeldreclame · Wijkgym',
    distanceM: 1000,
    icon: '🏋️',
    color: '#E5EFF5',
    interests: ['Sport', 'Lifestyle & nieuws'],
    isAd: true,
  },
  {
    id: 'milan-ad-keuken',
    kind: 'Advertentie',
    title: 'Proefmenu bij de buurtkeuken',
    description:
      'Een eetplek uit de buurt deelt een nieuw menu met lokale producten.',
    source: 'Voorbeeldreclame · Buurtkeuken',
    distanceM: 750,
    icon: '🥘',
    color: '#F5E9D7',
    interests: ['Eten & drinken', 'Lokale events'],
    isAd: true,
  },
];

const PREFERENCES_STORAGE_KEY = 'cloud9-demo-preferences';

export default function ForYouScreen() {
  const [selectedPersonaId, setSelectedPersonaId] =
    useState<PersonaId>('lisa');
  const [filters, setFilters] = useState<Record<PersonaId, Interest[]>>({
    lisa: personas[0].interests,
    noor: personas[1].interests,
    milan: personas[2].interests,
  });
  const [showPreferences, setShowPreferences] = useState(true);
  const [hasConfiguredPreferences, setHasConfiguredPreferences] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPreferences() {
      try {
        const saved = await AsyncStorage.getItem(PREFERENCES_STORAGE_KEY);

        if (saved && active) {
          const preferences = JSON.parse(saved) as {
            selectedPersonaId?: PersonaId;
            filters?: Partial<Record<PersonaId, Interest[]>>;
            hasConfiguredPreferences?: boolean;
          };

          if (
            preferences.selectedPersonaId &&
            personas.some((persona) => persona.id === preferences.selectedPersonaId)
          ) {
            setSelectedPersonaId(preferences.selectedPersonaId);
          }

          if (preferences.filters) {
            setFilters((current) => ({
              lisa: preferences.filters?.lisa ?? current.lisa,
              noor: preferences.filters?.noor ?? current.noor,
              milan: preferences.filters?.milan ?? current.milan,
            }));
          }

          if (preferences.hasConfiguredPreferences === true) {
            setHasConfiguredPreferences(true);
            setShowPreferences(false);
          }
        } else if (active) {
          setFilters((current) => ({ ...current, lisa: [] }));
        }
      } catch {
        // If saved preferences cannot be read, use the demo defaults.
      } finally {
        if (active) {
          setPreferencesLoaded(true);
        }
      }
    }

    void loadPreferences();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) {
      return;
    }

    void AsyncStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({ selectedPersonaId, filters, hasConfiguredPreferences }),
    ).catch(() => {});
  }, [filters, hasConfiguredPreferences, preferencesLoaded, selectedPersonaId]);

  const selectedPersona = personas.find(
    (persona) => persona.id === selectedPersonaId,
  )!;
  const currentInterests = filters[selectedPersonaId];

  const visibleItems = feedItems.filter((item) =>
    item.interests.some((interest) => currentInterests.includes(interest)),
  );

  function toggleInterest(interest: Interest) {
    setFilters((current) => {
      const selected = current[selectedPersonaId];
      const updated = selected.includes(interest)
        ? selected.filter((item) => item !== interest)
        : [...selected, interest];

      return { ...current, [selectedPersonaId]: updated };
    });
  }

  if (!preferencesLoaded) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          <Text style={styles.title}>Cloud9</Text>
          <Text style={styles.subtitle}>Je interesses worden geladen…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (showPreferences) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          {hasConfiguredPreferences && (
            <Pressable
              onPress={() => setShowPreferences(false)}
              style={styles.backButton}
            >
              <Text style={styles.backText}>‹  Terug naar Voor jou</Text>
            </Pressable>
          )}

          <Text style={styles.eyebrow}>INTERESSEFILTER · {selectedPersona.name}</Text>
          <Text style={styles.title}>Wat wil je volgen?</Text>
          <Text style={styles.subtitle}>
            Deze interesses bepalen welke content, events en passende
            advertenties in deze feed verschijnen.
          </Text>

          {allInterests.map((interest) => {
            const enabled = currentInterests.includes(interest);

            return (
              <Pressable
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={styles.preferenceRow}
              >
                <View
                  style={[
                    styles.checkbox,
                    enabled && styles.checkboxSelected,
                  ]}
                >
                  {enabled && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.preferenceText}>{interest}</Text>
                <Text style={styles.stateText}>{enabled ? 'Aan' : 'Uit'}</Text>
              </Pressable>
            );
          })}

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Reclame past bij je filter</Text>
            <Text style={styles.noteText}>
              Advertenties verschijnen tussen de feed-items wanneer ze
              aansluiten op de interesses die je hebt gekozen.
            </Text>
          </View>

          <Text style={styles.demoNote}>
            Je gekozen demo-profiel en interessefilters worden op dit toestel
            bewaard.
          </Text>

          {currentInterests.length === 0 && (
            <Text style={styles.demoNote}>
              Kies minstens één interesse om je feed te vullen.
            </Text>
          )}

          <Pressable
            disabled={currentInterests.length === 0}
            onPress={() => {
              setShowPreferences(false);
              setHasConfiguredPreferences(true);
            }}
            style={[
              styles.doneButton,
              currentInterests.length === 0 && { opacity: 0.45 },
            ]}
          >
            <Text style={styles.doneButtonText}>Klaar</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>9</Text>
          </View>
          <Text style={styles.logoName}>cloud9</Text>
          <Pressable
            onPress={() => setShowPreferences(true)}
            style={styles.preferencesButton}
          >
            <Text style={styles.preferencesButtonText}>Interessefilter</Text>
          </Pressable>
        </View>

        <Text style={styles.eyebrow}>DAGELIJKSE FEED · DEMO</Text>
        <Text style={styles.title}>Voor jou</Text>
        <Text style={styles.subtitle}>
          Een selectie voor {selectedPersona.name}, op basis van interesses.
        </Text>

        <View style={styles.personaSection}>
          <Text style={styles.sectionLabel}>Kies een demo-profiel</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.personaList}
          >
            {personas.map((persona) => {
              const active = selectedPersonaId === persona.id;

              return (
                <Pressable
                  key={persona.id}
                  onPress={() => setSelectedPersonaId(persona.id)}
                  style={[
                    styles.personaChip,
                    active && styles.personaChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.personaChipText,
                      active && styles.personaChipTextActive,
                    ]}
                  >
                    {persona.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Text style={styles.personaDescription}>
            {selectedPersona.description}
          </Text>
        </View>

        <View style={styles.interestSummary}>
          <Text style={styles.interestSummaryTitle}>Interessefilter</Text>
          <View style={styles.interestTags}>
            {currentInterests.map((interest) => (
              <Text key={interest} style={styles.interestTag}>
                {interest}
              </Text>
            ))}
            {currentInterests.length === 0 && (
              <Text style={styles.emptyInterest}>Nog geen interesses gekozen</Text>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Vandaag bij jou in de buurt
        </Text>

        {visibleItems.length > 0 ? (
          visibleItems.map((item) => {
            const matchingInterest = item.interests.find((interest) =>
              currentInterests.includes(interest),
            );

            return (
              <View key={item.id} style={styles.feedCard}>
                <View style={styles.feedTopLine}>
                  <Text
                    style={[
                      styles.kindBadge,
                      item.isAd && styles.adBadge,
                    ]}
                  >
                    {item.isAd ? 'ADVERTENTIE' : item.kind.toUpperCase()}
                  </Text>
                  <Text style={styles.distance}>
                    {formatDistance(item.distanceM)}
                  </Text>
                </View>

                <View style={styles.feedContent}>
                  <View style={[styles.feedIcon, { backgroundColor: item.color }]}>
                    <Text style={styles.feedEmoji}>{item.icon}</Text>
                  </View>
                  <View style={styles.feedCopy}>
                    <Text style={styles.feedTitle}>{item.title}</Text>
                    <Text style={styles.feedDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.feedSource}>{item.source}</Text>
                    {matchingInterest && (
                      <Text style={styles.matchNote}>
                        Past bij: {matchingInterest}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Je feed is nog leeg</Text>
            <Text style={styles.noteText}>
              Kies interesses via de knop Interessefilter om passende content,
              events en advertenties te zien.
            </Text>
          </View>
        )}

        <Text style={styles.footerNote}>
          Alle namen, activiteiten en advertenties zijn demo-inhoud.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDistance(distanceM: number) {
  if (distanceM < 1000) {
    return `${distanceM} m`;
  }
  return `${(distanceM / 1000).toFixed(1).replace('.', ',')} km`;
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
    marginBottom: 25,
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
  preferencesButton: {
    marginLeft: 'auto',
    backgroundColor: '#E6F3EE',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  preferencesButtonText: {
    color: '#287F70',
    fontSize: 10,
    fontWeight: '800',
  },
  eyebrow: {
    color: '#278F7E',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  title: {
    color: '#173B34',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64756F',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  personaSection: {
    backgroundColor: '#E6F3EE',
    borderRadius: 17,
    padding: 13,
    marginTop: 17,
  },
  sectionLabel: {
    color: '#46645C',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 9,
  },
  personaList: { paddingRight: 10 },
  personaChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D6E7DF',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  personaChipActive: {
    backgroundColor: '#1C5147',
    borderColor: '#1C5147',
  },
  personaChipText: { color: '#46645C', fontSize: 11, fontWeight: '700' },
  personaChipTextActive: { color: '#FFFFFF' },
  personaDescription: {
    color: '#58736B',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 9,
  },
  interestSummary: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 16,
    padding: 13,
    marginTop: 12,
  },
  interestSummaryTitle: {
    color: '#1D4039',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  interestTags: { flexDirection: 'row', flexWrap: 'wrap' },
  interestTag: {
    color: '#287F70',
    backgroundColor: '#E6F3EE',
    overflow: 'hidden',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 9,
    fontWeight: '700',
  },
  emptyInterest: { color: '#7B8D87', fontSize: 11 },
  sectionTitle: {
    color: '#193D36',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 2,
  },
  feedCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 13,
    marginTop: 11,
  },
  feedTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  kindBadge: {
    color: '#287F70',
    backgroundColor: '#E6F3EE',
    overflow: 'hidden',
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  adBadge: { color: '#795A16', backgroundColor: '#F7EED8' },
  distance: { color: '#7B8D87', fontSize: 10 },
  feedContent: { flexDirection: 'row', alignItems: 'flex-start' },
  feedIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedEmoji: { fontSize: 22 },
  feedCopy: { flex: 1, marginLeft: 11 },
  feedTitle: { color: '#1D4039', fontSize: 13, fontWeight: '800' },
  feedDescription: {
    color: '#687B74',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },
  feedSource: { color: '#88968F', fontSize: 9, marginTop: 6 },
  matchNote: {
    color: '#278F7E',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingRight: 12,
    marginBottom: 12,
  },
  backText: { color: '#278F7E', fontSize: 14, fontWeight: '700' },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B8C9C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  checkboxSelected: { backgroundColor: '#25A995', borderColor: '#25A995' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  preferenceText: {
    flex: 1,
    color: '#1D4039',
    fontSize: 12,
    fontWeight: '700',
  },
  stateText: { color: '#71837C', fontSize: 11 },
  noteCard: {
    backgroundColor: '#E6F3EE',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  noteTitle: { color: '#20473E', fontSize: 13, fontWeight: '800' },
  noteText: {
    color: '#58736B',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  doneButton: {
    backgroundColor: '#1C5147',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 19,
  },
  doneButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  demoNote: {
    color: '#7B8D87',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 18,
  },
  footerNote: {
    color: '#7B8D87',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 18,
  },
});