<template>
  <section class="login-block">
    <div class="container">
      <div class="row rounded">
        <div class="col-md-8 detail-sec">
          <div class="row mt-4" id="title-wrap">
            <div class="col">
              <h2 class="title">Weather Forecast</h2>
            </div>
            <div class="col left" style="position: relative" id="search-wrap">
              <div class="input-group shadow rounded">
                <input
                  class="form-control"
                  type="text"
                  v-model="city"
                  list="cities"
                  @change="find()"
                  placeholder="Karawang, New York, Tokyo..."
                />
                <datalist id="cities">
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.name"
                  ></option>
                </datalist>
                <button
                  class="input-group-text shadow rounded"
                  id="search-addon"
                  style="background-color: #fff"
                  @click="find()"
                >
                  <div v-if="loading"></div>
                  <div v-else>
                    <i class="fa fa-search"></i>
                  </div>
                </button>

                <form action=""></form>
              </div>
            </div>
            <div class="btn-group mt-4" role="group" >
              <div v-if="buttonState">
                <button
                  type="button"
                  class="btn shadow-sm"
                  id="hourly"
                  style="color: #000; background-color: #afb0b3"
                  @click="hour"
                >
                  Hourly
                </button>
                <button
                  type="button"
                  class="btn shadow-sm"
                  id="daily"
                  style="color: #000"
                  @click="day"
                >
                  Daily
                </button>
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn shadow-sm"
                  id="hourly"
                  style="color: #000"
                  @click="hour"
                >
                  Hourly
                </button>
                <button
                  type="button"
                  class="btn shadow-sm"
                  id="daily"
                  style="color: #000; background-color: #afb0b3"
                  @click="day"
                >
                  Daily
                </button>
              </div>
            </div>

            <div v-if="loading" style="margin-top: 15%">
              <Spinner size="large" />
            </div>
            <div v-else >
              <div class="mt-4 forecast-detail">
                <div v-if="buttonState">
                  <div
                    v-for="cast in hourlyForecast"
                    :key="cast.id"
                    class="row"
                    style="height:;"
                  >
                    <div class="col col-fore">
                      <h5>
                        {{ new Date(cast.dt * 1000).toLocaleString() }}
                      </h5>
                    </div>
                    <div class="col col-fore">
                      <img
                        src="/assets/icons/water-drop.png"
                        alt=""
                        style="float: left"
                      />
                      <h5>{{ cast.humidity }}%</h5>
                    </div>
                    <div class="col col-fore">
                      <img
                        src="/assets/icons/cloudy-day.png"
                        alt=""
                        style="float: left"
                      />
                      <h5>{{ cast.weather[0].main }}</h5>
                    </div>
                    <div class="col col-fore">
                      <div class="flex-container">
                        <div class="text-primary">
                          {{ (cast.temp - 273.15).toFixed(0) }}°C
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="day-container" >
                    <div
                      v-for="dailyForecast in dailyForecasts"
                      :key="dailyForecast.id"
                      class="row"
                    >
                      <div class="col col-fore">
                        <h5>
                          {{
                            new Date(dailyForecast.dt * 1000).toLocaleString()
                          }}
                        </h5>
                      </div>
                      <div class="col col-fore">
                        <img
                          src="/assets/icons/water-drop.png"
                          alt=""
                          style="float: left"
                        />
                        <h5>{{ dailyForecast.humidity }}%</h5>
                      </div>
                      <div class="col col-fore">
                        <img
                          src="/assets/icons/cloudy-day.png"
                          alt=""
                          style="float: left"
                        />
                        <h5>{{ dailyForecast.weather[0].main }}</h5>
                      </div>
                      <div class="col col-fore">
                        <div class="flex-container">
                          <div class="text-primary">
                            {{ (dailyForecast.temp.min - 273.15).toFixed(0) }}°C
                          </div>
                          <div>
                            <table width="100%" style="font-family: monospace">
                              <tr>
                                <td class="text-primary">-</td>
                                <td>-</td>
                                <td class="text-danger">-</td>
                              </tr>
                            </table>
                          </div>

                          <div class="text-danger">
                            {{ (dailyForecast.temp.max - 273.15).toFixed(0) }}°C
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- BUAT FORECAST! -->
          </div>
        </div>
        <div class="col-md-4 banner-sec" id="temp" >
          <div id="space">
          <div class="shadow rounded mt-4 input-mobile ms-2">
           <div>
              <div>
                  <div class="input-group">
                      <input type="text" class="form-control" v-model="city" @change="find"/>
                      <span class="input-group-addon btn btn-primary" @click="find"><i class="fa fa-search"></i></span>
                  </div>
              </div>
          </div>
          </div>
            <div class="loading-mobile" v-if="loading">
              <Spinner size="large" />
            </div>
            <div v-else>
              <div id="today-title">
                <i class="fa fa-cloud fa-2x text-light"></i>
                <h4 class="text-light">
                  Today <br /><span id="sub-title">{{
                    new Date() | moment("dddd, MMMM D YYYY")
                  }}</span>
                </h4>
              </div>
              <div class="container temp-wrap">
                <h1 class="text-center text-light" id="font-temp">
                  {{ current.temprature }}°C
                </h1>
              </div>
              <p class="text-center text-light" id="country">
                {{ this.country }},
                <span class="city">{{ this.cityShow }}</span>
              </p>
              <p class="text-center text-light" id="country">
                Feels Like {{ current.feelsLike }}°C <i class="dot mx-2"></i>
                <span class="city">Sunset {{ current.sunset }}</span>
              </p>
              <div class="index text-light">
                <img src="/assets/icons/windy.png" id="wind-icon" alt="" />
                <p>{{ current.windSpeed }} m/h</p>

                <img src="/assets/icons/humidity.png" id="wind-icon" alt="" />
                <p>{{ current.humidity }}%</p>

                <img
                  src="/assets/icons/air.png"
                  id="wind-icon"
                  class="air"
                  alt=""
                />
                <p>{{ current.airPressure }} psi</p>
              </div>
              <!-- MOBILE PHONE FORECAST -->
             <div id="mobile-forecast">
                <table class="table table-responsive table-borderless text-light ms-3 mt-4">
                <tr>
                  <th>Date/time</th>
                  <th>Lowest</th>
                  <th>Highest</th>
                  <th>Weather</th>
                </tr>
                <tr
                  v-for="dailyForecast in dailyForecasts"
                  :key="dailyForecast.id"
                >
                  <td>
                    {{
                      new Date(dailyForecast.dt * 1000).toLocaleString()
                        | moment("dddd")
                    }}
                  </td>
                  <td>
                     {{ (dailyForecast.temp.min - 273.15).toFixed(0) }}°C
                  </td>
                  <td>
                    {{ (dailyForecast.temp.max - 273.15).toFixed(0) }}°C
                  </td>
                  <td>
                    {{ dailyForecast.weather[0].main }}
                  </td>
                </tr>
              </table>
             </div>

             <div>
               <p class="text-light copy-right">Created by : <a class="text-light" href="https://syahidanas.site">Syahidan A.S</a></p>
             </div>

            </div>
            
             <div>
               <p class="mobile-copyright">Created by : <a class="" href="https://syahidanas.site" style="color: rgba(197, 199, 236, 0.493);">Syahidan A.S</a></p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Spinner from "vue-simple-spinner";

export default {
  name: "Home",

  isActive: false,
  components: {
    Spinner,
  },
  data() {
    return {
      dailyForecasts: [],
      hourlyForecast: [],
      latForecast: "",
      lonForecast: "",
      loading: false,
      buttonState: false,
      city: "",
      cityShow: "",
      country: "",
      apiProperties: {
        lat: "",
        lon: "",
        key: "5e2f8891809e49bdb1d954e37abff632",
      },

      cities: [
        { name: "Banten" },
        { name: "Bogor" },
        { name: "Jakarta" },
        { name: "Bekasi" },
        { name: "Cikarang" },
        { name: "Karawang" },
        { name: "Cikampek" },
        { name: "Purwakarta" },
        { name: "Cimahi" },
        { name: "Bandung" },
        { name: "Purwakarta" },
        { name: "Tasikmalaya" },
        { name: "Pangandaran" },
      ],
      current: {
        temprature: "",
        feelsLike: "",
        sunset: "",
        windSpeed: "",
        humidity: "",
        airPressure: "",
      },
    };
  },

  mounted() {
    this.locator();
  },
  methods: {
    hour() {
      this.buttonState = true;
    },
    day() {
      this.buttonState = false;
    },
    myFilter: function () {
      this.isActive = !this.isActive;
    },

    find() {
      this.loading = true;

      // FORWARD GEOLOCATION
      axios
        .get("https://trueway-geocoding.p.rapidapi.com/Geocode", {
          params: {
            address: this.city,
            language: "en",
          },
          headers: {
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key":
              "617614507amsh71cdaba7870ab49p127e8ejsnf21c2e8083b5",
          },
        })
        .then((response) => {
          this.latForecast = response.data.results[0].location.lat;
          this.lonForecast = response.data.results[0].location.lng;
          //Weather Today
          axios
            .get(
              "https://api.openweathermap.org/data/2.5/weather?q=" +
                this.city +
                "&appid=" +
                this.apiProperties.key +
                ""
            )
            .then((response) => {
              this.loading = false;
              this.current.temprature = (
                response.data.main.temp - 273.15
              ).toFixed(0);
              this.country = response.data.sys.country;
              this.cityShow = response.data.name;
              this.current.feelsLike = (
                response.data.main.feels_like - 273.15
              ).toFixed(0);

              let unix_timestamp = response.data.sys.sunset;
              var date = new Date(unix_timestamp * 1000);
              var hours = date.getHours();
              var minutes = "0" + date.getMinutes();
              this.current.sunset = hours + ":" + minutes;

              this.current.windSpeed = response.data.wind.speed;
              this.current.humidity = response.data.main.humidity;
              this.current.airPressure = response.data.main.pressure;
              setTimeout(() => {
                this.$alertify.success("Horay, current weather found!");
              }, 500);
            })
            .catch(() => {
              this.loading = false;

              setTimeout(() => {
                this.$alertify.error("Sorry, current weather not found!");
              }, 500);
            });

          axios
            .get(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                this.latForecast +
                "&lon=" +
                this.lonForecast +
                "&exclude=&appid=5e2f8891809e49bdb1d954e37abff632"
            )
            .then((response) => {
              this.dailyForecasts = response.data.daily;
              this.hourlyForecast = response.data.hourly;
              setTimeout(() => {
                this.$alertify.success("Horay, forecast found!");
              }, 500);
            })
            .catch(() => {
              this.loading = false;
              setTimeout(() => {
                this.$alertify.error("Sorry, forecast not found!");
              }, 500);

              this.locator();
            })
            .finally(() => (this.loading = false));
        })
        .catch(() => {
          setTimeout(() => {
            this.$alertify.error("Sorry, location not found!");
          }, 500);
          this.dailyForecasts = null;
          this.locator();
        });
    },

    locator() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            axios
              .get(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                  position.coords.latitude +
                  "&lon=" +
                  position.coords.longitude +
                  "&appid=" +
                  this.apiProperties.key +
                  ""
              )
              .then((response) => {
                this.loading = false;
                this.current.temprature = (
                  response.data.main.temp - 273.15
                ).toFixed(0);
                this.country = response.data.sys.country;
                this.cityShow = response.data.name;
                this.current.feelsLike = (
                  response.data.main.feels_like - 273.15
                ).toFixed(0);

                let unix_timestamp = response.data.sys.sunset;
                var date = new Date(unix_timestamp * 1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                this.current.sunset = hours + ":" + minutes;

                this.current.windSpeed = response.data.wind.speed;
                this.current.humidity = response.data.main.humidity;
                this.current.airPressure = response.data.main.pressure;

                axios
                  .get(
                    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                      position.coords.latitude +
                      "&lon=" +
                      position.coords.longitude +
                      "&exclude=&appid=5e2f8891809e49bdb1d954e37abff632"
                  )
                  .then((response) => {
                    this.dailyForecasts = response.data.daily;
                    this.hourlyForecast = response.data.hourly;
                  })
                  .catch(() => {
                    this.loading = false;

                    setTimeout(() => {
                      this.$alertify.error(
                        "Sorry, forecast not found! (you can search the location manually)"
                      );
                    }, 500);

                    this.locator();
                  })
                  .finally(() => (this.loading = false));
              })
              .catch(() => {})
              .finally(() => (this.loading = false));
          },
          (error) => {
            console.log(error.message);
            this.$alertify.promptWithTitle(
              "Sorry, we can't find your location",
              "Please enter location manually (country, city, or district)",
              "",
              (evt, value) =>
                this.$alertify.success((this.city = value), this.find()),
              () => this.$alertify.error("cancel")
            );
          }
        );
      } else {
        this.$alertify.promptWithTitle(
          "Sorry, we can't find your location",
          "Please enter location manually (country, city, or district)",
          "",
          (evt, value) =>
            this.$alertify.success((this.city = value), this.find()),
          () => this.$alertify.error("cancel")
        );
      }
    },
  },
};
</script>
<style scoped>
.loading-mobile{
  margin-top: 50%;
}
.input-mobile{
  display: none;
}
#mobile-forecast{
  display: none;
}
.mobile-copyright{
  display: none;
  margin-left: 30%;
  color: rgba(197, 199, 236, 0.493);
}
.copy-right{
  position:absolute;bottom:1%; right:25%;
}
.login-block {
  float: left;
  width: 100%;
  padding: 50px 0;
}
.row {
  border-collapse: separate;
  border-radius: 20%;
}

.detail-sec {
  background-color: #dbe9f0;
  border-end-start-radius: 25px;
  border-start-start-radius: 25px;
  perspective: 1px;
  overflow: hidden;
}
.title {
  font-weight: bold;
}
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}
.search {
  height: 20%;
}
#title-wrap {
  padding-right: 35px;
  padding-left: 35px;
  padding-top: 20px;
}
button:hover {
  background-color: #2f44be44;
}
#today-title {
  display: flex;
  justify-content: center;
  padding: 10%;
}
.index {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
#today-title h4 {
  margin-left: 13px;
  font-size: 1.6rem;
}

#temp {
  background-color: #101039;
  border-end-end-radius: 25px;
  border-start-end-radius: 25px;
  perspective: 1px;
  overflow: hidden;
}
#sub-title {
  font-size: 0.8rem;
  font-weight: 10;
}
#font-temp {
  font-size: 5rem;
  font-weight: 10;
  margin-left: 10%;
}
.temp-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
#metric {
  font-size: 3rem;
  font-weight: 3;
}
.dot {
  height: 8px;
  width: 8px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
}
#space {
  padding-bottom: 50%;
}

#wind-icon {
  width: 33px;
  height: 33px;
}

.index #wind-icon {
  margin-left: 10px;
}
.index .air {
  margin-left: 10px;
}

@media only screen and (max-width: 600px) {
  .loading-mobile{
  margin-top: 50%;
  margin-bottom: 50%;
}
  .input-mobile{
  display: block;
}
  #mobile-forecast{
  display: block;
}
.copy-right{
 display: none;
}
.mobile-copyright{
  display: block;
  bottom: 0;
  font-size: 10px;
}
  .detail-sec {
    display: none;
  }
  .login-block {
    float: left;
    width: 100%;
    padding-top: 0px;
    padding-bottom: 100%;
    background-color: #101039;
    margin-left: 0;
  }
  #temp {
    background-color: #101039;
    border-end-end-radius: 0px;
    border-start-end-radius: 0px;
    perspective: 1px;
    padding-top: 10%;
    padding-right: 7%;
    padding-bottom: 0;
  }
  .index img {
    margin-left: 0;
  }
  #space {
    padding-bottom: 0px;
  }
  .temp-wrap {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }
}
.col-fore {
  margin: auto;
  width: 1%;
  padding: 10px;
}
.col-fore img {
  width: 18%;
}
.day-container h4 {
  font-weight: 400;
}
.day-container h5 {
  font-weight: 400;
}
.flex-container {
  display: flex;
  font-size: 20px;
}
</style>