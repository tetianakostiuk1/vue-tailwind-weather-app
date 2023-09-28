<template>
  <div class="bg-gray-300 font-sans text-gray-200 py-16 min-h-screen">
    <div class="">
      <router-link to="/" class="text-xl text-gray-800 no-underline mx-14 font-bold">
        &#8592; Back to Home
      </router-link>
      <br>
      <div class="text-center p-20">
        <input
            type="text"
            id="location"
            v-model="searchLocation"
            @input="searchWeather"
            placeholder="Search for location.."
            class="px-4 py-2 border-b-5 border-transparent rounded-md w-96 outline-0 font-mono text-sky-600 font-bold"
        >
      </div>

      <div v-if="weather" class="text-center">
        <WeatherDisplay :weather="weather" />
      </div>

      <div v-if="forecast" class="flex justify-center p-28">
        <div class="bg-gray-400 grid grid-cols-7 w-full gap-4 p-10 justify-center rounded-xl">
          <div class="text-xl font-semibold text-gray-800 col-span-full">
            7-Day Forecast
          </div>

          <div v-for="(day, index) in forecast.list" :key="day.dt">
            <div
                class="w-full h-fit text-gray-800 rounded-xl p-1.5"
                :style="{ backgroundColor:
                  index === 0 || isNextDate(day.dt, forecast.list[index - 1].dt)
                  ? generateRandomPastelColor()
                  : getCurrentColor() }"
            >
              <div
                 class="w-full"
                 v-if="true"
              >
                {{ formatDate(day.dt)}}
              </div>

              <div class="text-white text-xl text-center">
                {{day.dt_txt.slice(10, -3)}}
              </div>

              <div class="text-center">
                <img :src="getWeatherIconUrl(day.weather[0].icon)" alt="Weather Icon">
              </div>

              <div class="text-white text-4xl text-center">
                {{ day.main.temp.toString().slice(0, -3) }}°
              </div>

              <div class="text-center">
                {{ day.weather[0].description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import WeatherDisplay from "@/components/WeatherDisplay.vue";

const weather = ref(null);
const forecast = ref(null);
const searchLocation = ref('');

const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
};

const searchWeather = async () => {
  try {
    const apiKey = 'fe837d5daca8d2de9cf4c0a6f61ab74a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation.value}&units=metric&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    setWeather(response.data);

    // 7-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation.value}&units=metric&appid=${apiKey}`;
    const forecastResponse = await axios.get(forecastUrl);
    setForecast(forecastResponse.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const setWeather = (newWeather) => {
  weather.value = newWeather;
};

const setForecast = (newForecast) => {
  forecast.value = newForecast;
};

const isNextDate = (date1, date2) => formatDate(date1) !== formatDate(date2);

const formatDate = (date) => {
  return new Date(date * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const pastelColors = [
  '#FFB6C1', // Light Pink
  '#FFE4E1', // Misty Rose
  '#87CEEB', // Sky Blue
  '#ADD8E6', // Light Blue
  '#B0E0E6', // Powder Blue
  '#87CEFA', // Light Sky Blue
  '#98FB98', // Pale Green
  '#90EE90', // Light Green
];

let currentIndex = 0;
const generateRandomPastelColor = () => {
    const color = pastelColors[currentIndex];
    currentIndex = (currentIndex + 1) % pastelColors.length;
    return color;
};

const getCurrentColor = () => {
  const color = pastelColors[currentIndex];
  return color;
};
</script>