import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';

const API_KEY = '5a37e57d9311719b2e29a1e99ce146c5';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [unit, setUnit] = useState('metric');

    const fetchWeatherData = async (cityName) => {
        try {
            setLoaded(false);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`);
            if (response.status === 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            Alert.alert('Error', error.message);
            setLoaded(true);
        }
    };

    useEffect(() => {
        fetchWeatherData('Fortaleza');
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Previsão do Tempo</Text>
                <TouchableOpacity style={styles.unitButton} onPress={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
                    <Text style={styles.unitButtonText}>{unit === 'metric' ? 'Mostrar em °F' : 'Mostrar em °C'}</Text>
                </TouchableOpacity>
            </View>
            {loaded ? (
                weatherData ? (
                    <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} unit={unit} />
                ) : (
                    <View style={styles.notFoundContainer}>
                        <Text style={styles.notFoundText}>Não encontrado, tente novamente!</Text>
                        <TouchableOpacity style={styles.button} onPress={() => fetchWeatherData('Fortaleza')}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <ActivityIndicator size="large" color="red" />
            )}
        </View>
    );
};

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    unitButton: {
        padding: 10,
        backgroundColor: '#e96e50',
        borderRadius: 10,
    },
    unitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#e96e50',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});
