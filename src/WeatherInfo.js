import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import WeatherSearch from './search';

const WeatherInfo = ({ weatherData, fetchWeatherData, unit }) => {
    const {
        name,
        visibility,
        weather: [{ icon, description }],
        main: { temp, humidity, feels_like },
        wind: { speed },
        sys: { sunrise, sunset },
    } = weatherData;

    const formatDate = (timestamp) => {
        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(new Date(timestamp * 1000));
    };

    const translateDescription = (description) => {
        const descriptions = {
            'clear sky': 'céu limpo',
            'few clouds': 'poucas nuvens',
            'scattered clouds': 'nuvens dispersas',
            'broken clouds': 'nuvens quebradas',
            'shower rain': 'chuva de banho',
            'rain': 'chuva',
            'thunderstorm': 'trovoada',
            'snow': 'neve',
            'mist': 'névoa',
            // Add more descriptions as needed
        };
        return descriptions[description] || description;
    };

    const convertToCelsius = (temp) => {
        return ((temp - 32) * 5) / 9;
    };

    const convertToFahrenheit = (temp) => {
        return (temp * 9) / 5 + 32;
    };

    return (
        <SafeAreaView style={styles.container}>
            <WeatherSearch fetchWeatherData={fetchWeatherData} />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.logo}>
                <Image
                    style={styles.largeIcon}
                    source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
                />
                <Text style={styles.currentTemp}>
                    {unit === 'metric' ? temp.toFixed(1) : convertToFahrenheit(temp).toFixed(1)}
                    °{unit === 'metric' ? 'C' : 'F'}
                </Text>
            </View>
            <Text style={styles.description}>{translateDescription(description)}</Text>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/temp.png')}
                    />
                    <Text style={styles.infoText}>
                        {unit === 'metric' ? feels_like.toFixed(1) : convertToFahrenheit(feels_like).toFixed(1)}
                        °{unit === 'metric' ? 'C' : 'F'}
                    </Text>
                    <Text style={styles.infoText}>Sensação Térmica</Text>
                </View>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/humidity.png')}
                    />
                    <Text style={styles.infoText}>{humidity} % </Text>
                    <Text style={styles.infoText}>Umidade</Text>
                </View>
            </View>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/visibility2.png')}
                    />
                    <Text style={styles.infoText}>{visibility}</Text>
                    <Text style={styles.infoText}>Visibilidade</Text>
                </View>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/windspeed.png')}
                    />
                    <Text style={styles.infoText}>{speed} m/s</Text>
                    <Text style={styles.infoText}>Vel. do Vento</Text>
                </View>
            </View>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/sunrise.png')}
                    />
                    <Text style={styles.infoText}>{formatDate(sunrise)}</Text>
                    <Text style={styles.infoText}>Nascer do sol</Text>
                </View>
                <View style={styles.info}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/sunset.png')}
                    />
                    <Text style={styles.infoText}>{formatDate(sunset)}</Text>
                    <Text style={styles.infoText}>Pôr do sol</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WeatherInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#e96e50',
        marginTop: 10,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    largeIcon: {
        width: 200,
        height: 200,
    },
    currentTemp: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    extraInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 7,
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: '#D0EAFA',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    smallIcon: {
        height: 55,
        width: 40,
        borderRadius: 40 / 2.5,
        marginLeft: 52,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 17,
    },
});
