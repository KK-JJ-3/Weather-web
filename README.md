# 🌦️ Weather-web

> Welcome to Weather Web — it's my first project using APIs.

A simple weather website made with HTML, CSS, and JavaScript. It shows current weather, forecasts, air quality, clothing suggestions, weather-based visuals, city comparison, and weather-related news.

---

## ✨ Features

- 🌡️ Current weather details
- 📅 5-day forecast
- 🌫️ Air Quality Index (AQI)
- 🌤️ Weather-based backgrounds and effects
- 👕 Clothing suggestions based on the weather
- 👨‍🦱👩‍🦱 Separate clothing suggestions for different genders
- 🔄 Compare weather between cities
- 📰 Weather-related news
- 🌙 Light and dark mode
- 📱 Responsive design

---

## 🛠️ Built With

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- OpenWeatherMap API
- Pexels API
- Google News RSS
- RSS2JSON API
- Font Awesome

---

## 📁 Project Structure

Weather-web/
│
├── .gitignore
├── env.js
├── index.html
├── README.md
├── script.js
├── style.css
│
└── images/
├── 307824-sunny-day-wallpaper.jpg
├── clear sky.png
├── cloud sky.png
├── fog sky.png
├── niceday.jpg
├── rainy sky.png
├── snow sky.png
└── wind sky.png

---

## 📄 Main Files

### index.html

The main page of the website. It contains the search bar, weather details, forecast, AQI, clothing section, city comparison, news section, and theme controls.

### style.css

Handles the overall design, layout, responsive styling, themes, backgrounds, animations, and weather effects.

### script.js

Contains the main JavaScript logic, including API requests, weather data, forecasts, AQI, clothing suggestions, city comparison, weather effects, and news.

### env.js

Keeps the API keys separate from the main JavaScript file.

### images/

Contains the local images used for the different weather conditions and backgrounds.

---

## ⚙️ Setup

The project uses JavaScript ES modules, so it should be opened through a local server rather than directly as a file:// page.

Add the required API keys to env.js:

    const openweatherapi = "YOUR_OPENWEATHER_API_KEY";
    const pexelsapi = "YOUR_PEXELS_API_KEY";
    const rss2jsonapi = "YOUR_RSS2JSON_API_KEY";

    export { openweatherapi, pexelsapi, rss2jsonapi };

A simple way to run the project locally is:

    python -m http.server 5500

Then open:

    http://localhost:5500

You can also use VS Code Live Server.

---

## 🔌 APIs

| API             | Used For                                         |
| --------------- | ------------------------------------------------ |
| OpenWeatherMap  | Current weather, 5-day forecast, and air quality |
| Pexels          | Clothing suggestion and weather-related images   |
| Google News RSS | Weather-related news                             |
| RSS2JSON        | Converts the RSS feed into JSON                  |

---

<p align="center">
  Made with HTML, CSS & JavaScript ☁️
</p>
