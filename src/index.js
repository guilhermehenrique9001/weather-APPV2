import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import WeatherInfo from './WeatherInfo'

const API_KEYS = '0f0c95609933a400c1fd64ed12c7e387'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    
    // add func to fecth
    const fetchWeatherData = async (cityName) => {
        try{
            setLoaded(false);
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}&units=metric`)
            if (response.status == 200){
              const data = await response.json();
              setWeatherData(data); 
          }
          else {
              setWeatherData(null);
          }
          setLoaded(true);

        } catch(error) {
            Alert.alert('Error', error.message)
        }
    }

    //lembrar nome da city
    useEffect(() => {
        fetchWeatherData('Fortaleza');
    }, []);


    // if not loaded
    if (!loaded) {
      return(
          <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
          </View>
      )
    }
    else if (weatherData == null) {
      return (
        <View style={styles.container}>
            <Text> NOT FOUND </Text>
        </View>
      );
    }
      
      
    

    return(
        <View style={styles.container}>
            <View style={styles.header}>
               <Text style={styles.headerTitle}>App do clima</Text>
            </View>
            <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View> 
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0E5EC',
      paddingTop: Constants.statusBarHeight,
    },
    header: {
      alignItems:'center',
      backgroundColor: '#C5D2EF',
      height:80,
      justifyContent:'center',
    },
    headerTitle: {
      fontSize: 29,
      fontWeight: 'bold',
    }
  });