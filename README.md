# weather-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

https://api.openweathermap.org/data/2.5/weather?q=karawang&appid=5e2f8891809e49bdb1d954e37abff632


https://api.openweathermap.org/data/2.5/onecall?lat=-6.350470&lon=107.344513&exclude=daily&appid=5e2f8891809e49bdb1d954e37abff632


https://open.mapquestapi.com/geocoding/v1/address?key=trJQDOO5McpifqdcraAx4zdjpfXAGq2d&location=jakarta




        axios
            .get(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                response.data.results[0].location.lat +
                "&lon=" +
                response.data.results[0].location.lng +
                "&exclude=&appid=5e2f8891809e49bdb1d954e37abff632"
            )
            .then((res) => {
              this.dailyForecasts = res.data.daily;
            });