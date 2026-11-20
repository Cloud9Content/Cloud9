import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const principles = [
  {
    number: '01',
    icon: '⌖',
    title: 'Ontdek wat dichtbij is',
    description:
      'Vind winkels, diensten, activiteiten en lokale initiatieven op één plek.',
    color: '#E4F1E8',
  },
  {
    number: '02',
    icon: '◎',
    title: 'Jij kiest wat je ziet',
    description:
      'Je bepaalt zelf welke onderwerpen en aanbiedingen bij je passen.',
    color: '#E5EFF5',
  },
  {
    number: '03',
    icon: '↗',
    title: 'Waarde blijft lokaal',
    description:
      'Het concept laat ruimte voor beloningen aan gebruikers en steun aan lokale initiatieven.',
    color: '#F3EBDC',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topLine}>
          <Text style={styles.eyebrow}>HET CLOUD9-CONCEPT</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>DEMO</Text>
          </View>
        </View>

        <Text style={styles.title}>Een buurtplatform op jouw voorwaarden.</Text>
        <Text style={styles.intro}>
          Cloud9 brengt lokaal aanbod en mensen samen, met aandacht voor
          privacy en zeggenschap.
        </Text>

        <View style={styles.featureCard}>
          <View style={styles.cloudMark}>
            <Text style={styles.cloudMarkText}>9</Text>
          </View>
          <Text style={styles.featureTitle}>Lokaal verbonden</Text>
          <Text style={styles.featureText}>
            Van een fijne plek om koffie te drinken tot een buurtinitiatief:
            ontdek wat er om je heen gebeurt.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Drie uitgangspunten</Text>

        {principles.map((principle) => (
          <View key={principle.number} style={styles.principleCard}>
            <View
              style={[
                styles.principleIcon,
                { backgroundColor: principle.color },
              ]}
            >
              <Text style={styles.principleIconText}>{principle.icon}</Text>
            </View>

            <View style={styles.principleCopy}>
              <Text style={styles.principleNumber}>{principle.number}</Text>
              <Text style={styles.principleTitle}>{principle.title}</Text>
              <Text style={styles.principleDescription}>
                {principle.description}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>Privacy hoort bij het ontwerp</Text>
          <Text style={styles.privacyText}>
            Deze demo gebruikt voorbeeldgegevens. Je locatie wordt niet
            opgevraagd en er worden geen advertenties getoond.
          </Text>
        </View>

        <Text style={styles.footer}>
          Cloud9 is nog in ontwikkeling. De functies en verdeling van waarde
          moeten verder worden uitgewerkt.
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
    paddingTop: 18,
    paddingBottom: 30,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eyebrow: {
    color: '#278F7E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  demoBadge: {
    backgroundColor: '#E6F3EE',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  demoBadgeText: {
    color: '#287F70',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: '#173B34',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
  },
  intro: {
    color: '#64756F',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  featureCard: {
    backgroundColor: '#1C5147',
    borderRadius: 22,
    padding: 20,
    marginTop: 23,
  },
  cloudMark: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: '#2CB39D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  cloudMarkText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  featureText: {
    color: '#E1F0EB',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  sectionTitle: {
    color: '#193D36',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 27,
    marginBottom: 4,
  },
  principleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginTop: 11,
  },
  principleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  principleIconText: {
    color: '#27584E',
    fontSize: 23,
    fontWeight: '700',
  },
  principleCopy: {
    flex: 1,
    marginLeft: 12,
  },
  principleNumber: {
    color: '#278F7E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  principleTitle: {
    color: '#1D4039',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  principleDescription: {
    color: '#687B74',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  privacyCard: {
    backgroundColor: '#E6F3EE',
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
  },
  privacyTitle: {
    color: '#20473E',
    fontSize: 14,
    fontWeight: '800',
  },
  privacyText: {
    color: '#58736B',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  footer: {
    color: '#7B8D87',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 18,
  },
});