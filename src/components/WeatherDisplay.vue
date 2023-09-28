<template>
  <div class="">
    <div class="grid grid-cols-3 gap-4 px-52 py-10">
      <div class="border-8 border-amber-900 bg-sky-200 rounded-lg col-span-full">
        <h2 class="text-2xl font-semibold text-gray-600">
          {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <p class="text-4xl text-gray-800">
          {{ weather.main.temp.toString().slice(0,-3) }}°C
        </p>
        <p>
          <img :src="weatherIconUrl" alt="Weather Icon">
        </p>

        <p class="text-gray-800">
          {{ weather.weather[0].description }}
        </p>
      </div>

      <div class="min-w-fit h-52 bg-white rounded-xl ">
        <p class="text-gray-400">
          Feels like
        </p>

        <p class="text-4xl text-gray-800">
          {{ weather.main.feels_like.toString().slice(0,-3)}}°C
        </p>
      </div>
      <div class="min-w-fit h-52 bg-white rounded-xl ">
        <p class="text-gray-400">
          Humidity
        </p>

        <p class="text-4xl text-gray-800">
          {{ weather.main.humidity }}%
        </p>
      </div>
      <div class="min-w-fit h-52 bg-white rounded-xl">
        <p class="text-gray-400">
          Wind Speed
        </p>

        <p class="text-4xl text-gray-800">
          {{ weather.wind.speed }} m/s
        </p>
      </div>
      <div class="min-w-fit h-52 bg-white rounded-xl">
        <p class="text-gray-400">
          Sunrise & Sunset
        </p>
        <p class="text-2xl text-gray-800 flex justify-center gap-1.5">
          <img src="@/assets/icons/sunrise.png" alt="Sunrise"/>
          {{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}}
        </p>
        <p class="text-2xl text-gray-800 flex justify-center gap-1.5">
          <img src="@/assets/icons/sunset.png" alt="SunSet" />
          {{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}}
        </p>
      </div>
      <div class="min-w-fit h-52 bg-white rounded-xl">
        <p class="text-gray-400">
          Visibility
        </p>

        <p class="text-4xl text-gray-800">
          {{ weather.visibility / 1000 .toFixed(2) }} km
        </p>
      </div>
      <div class="min-w-fit h-52 bg-white rounded-xl ">
        <p class="text-gray-400">
          Pressure
        </p>

        <p class="text-4xl text-gray-800">
          {{ Math.round(weather.main.pressure) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
  computed: {
    weatherIconUrl() {
      return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
    },
  },
};
</script>



