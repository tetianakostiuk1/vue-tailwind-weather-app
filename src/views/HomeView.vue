<template>
  <div class="bg-gray-200 font-sans text-black shadow-2xl m-0">
    <div class="text-center">
      <div class="flex justify-between px-6">
        <h1 class="text-2xl px-10 font-bold text-gray-400 mb-4 inline-flex float-left">
          <img src="@/assets/icons/clouds.png" alt="logo" class="self-start mx-2">

          <p class="self-start p-1 m-0">Weather App</p>
        </h1>

        <router-link
            to="/search"
            class="text-2xl text-gray-700 no-underline font-bold inline-flex"
        >
          <img src="@/assets/icons/search.svg" alt="search" class="mx-2"/>

          <p>Search for Weather in other cities</p>
        </router-link>
      </div>




      <div v-if="currentLocationWeather">

        <h2 class="text-gray-600 font-bold text-s mt-10">
          Current Weather in Your Location
          <img width="20" height="20" src="https://img.icons8.com/officel/20/marker.png" alt="marker"/>
        </h2>

        <WeatherDisplay :weather="currentLocationWeather" />
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import WeatherDisplay from "@/components/WeatherDisplay.vue";

const currentLocationWeather = ref(null);

const fetchCurrentLocationWeather = async () => {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'fe837d5daca8d2de9cf4c0a6f61ab74a';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        currentLocationWeather.value = await response.json();
      });
    }
  } catch (error) {
    console.error('Error fetching current location weather:', error);
  }
};

onMounted(() => {
  fetchCurrentLocationWeather();
});
</script>
