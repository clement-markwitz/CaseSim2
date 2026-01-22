import CaseList from '@/components/CaseList';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchBar from '@/components/ui/SearchBar';
import Colors from '@/constants/Colors';
import { useDemoStore } from '@/stores/demoStore';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = () => {
    const { totalOpened, totalValue, bestDrop, getAverageValue } = useDemoStore();
    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.container}>
                    <Header />
                    <Hero />
                    {totalOpened > 0 && (
                        <View style={styles.statsContainer}>
                            <Text style={styles.statsTitle}>📊 Tes Statistiques</Text>

                            <View style={styles.statsGrid}>
                                <View style={styles.statCard}>
                                    <Text style={styles.statValue}>{totalOpened}</Text>
                                    <Text style={styles.statLabel}>Cases ouvertes</Text>
                                </View>

                                <View style={styles.statCard}>
                                    <Text style={styles.statValue}>{totalValue.toFixed(2)}€</Text>
                                    <Text style={styles.statLabel}>Valeur totale</Text>
                                </View>

                                <View style={styles.statCard}>
                                    <Text style={styles.statValue}>{getAverageValue().toFixed(2)}€</Text>
                                    <Text style={styles.statLabel}>Moyenne par drop</Text>
                                </View>
                            </View>

                            {/* 🏆 Meilleur drop */}
                            {bestDrop && (
                                <View style={styles.bestDropContainer}>
                                    <Text style={styles.bestDropTitle}>🏆 Meilleur Drop</Text>
                                    <View style={styles.bestDropCard}>
                                        <Image
                                            source={{ uri: bestDrop.image }}
                                            style={styles.bestDropImage}
                                            resizeMode="contain"
                                        />
                                        <View style={styles.bestDropInfo}>
                                            <Text style={styles.bestDropName}>{bestDrop.name}</Text>
                                            <Text style={styles.bestDropWear}>{bestDrop.wear}</Text>
                                            <Text style={styles.bestDropPrice}>{bestDrop.price.toFixed(2)}€</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                    <SearchBar />
                    <CaseList />
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchContainer: {
        width: '40%',
        height: 75,
        borderRadius: 15,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.tabIconDefault,
    },
    statsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        backgroundColor: Colors.light.tabIconDefault,
        borderRadius: 15,
    },
    statsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 15,
        textAlign: 'center',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.text_secondary,
        textAlign: 'center',
    },
    bestDropContainer: {
        marginTop: 10,
    },
    bestDropTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 10,
    },
    bestDropCard: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    bestDropImage: {
        width: 80,
        height: 60,
        marginRight: 15,
    },
    bestDropInfo: {
        flex: 1,
    },
    bestDropName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    bestDropWear: {
        fontSize: 14,
        color: Colors.light.text_secondary,
        marginTop: 3,
    },
    bestDropPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginTop: 5,
    },
});
export default Home;
