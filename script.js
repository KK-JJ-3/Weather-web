import { openweatherapi, pexelsapi, rss2jsonapi } from "./env.js"; //remove this line before using
const apikey = openweatherapi;
const apikey2 = pexelsapi;
const apikey3 = rss2jsonapi;
let currentTemp;
let currentCondition;
let a = true;
let type = "male";
let c = document.querySelector(".togglebut");
c.addEventListener("click", () => {
  if (a) {
    document.body.classList.add("lightmode");
    document.querySelector(".togglebut").innerHTML =
      '<i class="fa-solid fa-moon" style="color: #ffffff;"></i>';

    a = false;
  } else {
    document.body.classList.remove("lightmode");
    document.querySelector(".togglebut").innerHTML =
      '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>';
    a = true;
  }
});
let gender = document.querySelector(".switch button");
gender.addEventListener("click", () => {
  if (type === "male") {
    document.querySelector(".switch button").innerHTML =
      `<i class="fa-solid fa-venus"></i> Female`;
    type = "female";
  } else {
    document.querySelector(".switch button").innerHTML =
      `<i class="fa-solid fa-mars"></i> Male`;
    type = "male";
  }
  showimage(currentTemp, currentCondition);
});
const search = document.querySelector(".bar");
const searchbutton = document.querySelector(".searchbutton");
const get = async (location) => {
  if (!location.trim()) return;
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      `&units=metric&appid=${apikey}`,
  );
  let data = await response.json();
  if (data.cod === "404") {
    document.querySelector(".location .tag").innerHTML = "City not found!";
    return;
  }
  let day5response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      location +
      `&units=metric&appid=${apikey}`,
  );
  let day5data = await day5response.json();
  let aqiresponse = await fetch(
    "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      `&appid=${apikey}`,
  );
  let aqidata = await aqiresponse.json();
  currentTemp = data.main.temp;
  currentCondition = data.weather[0].main;
  console.log(data);
  console.log(day5data);
  console.log(aqidata);
  document.querySelector(".location .tag").innerHTML = data.name;
  document.querySelector(".temp .tag").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity .tag").innerHTML =
    "💧" + data.main.humidity + "%";
  document.querySelector(".feel_like .tag").innerHTML =
    Math.round(data.main.feels_like) + "°C";
  let { min, max } = getDailyMinMax(day5data);
  document.querySelector(".temp_max .tag").innerHTML = "🔺" + max + "°C";
  document.querySelector(".temp_min .tag").innerHTML = "🔻" + min + "°C";
  const currentweather = data.weather[0].main;
  console.log(currentweather);
  if (data.weather[0].main == "Clear") {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-solid fa-sun" style="color: #ffd43b"></i>  ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("clear");
  } else if (data.weather[0].main == "Clouds") {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-solid fa-cloud" style="color: #717171"></i> ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("cloud");
  } else if (data.weather[0].main == "Rain") {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-solid fa-cloud-showers-heavy" style="color: #313131"></i>  ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("rain");
  } else if (data.weather[0].main == "Snow") {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-regular fa-snowflake" style="color: #7bf0ff"></i>  ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("snow");
  } else if (data.weather[0].main == "Fog") {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-solid fa-smog" style="color: #ae8e81"></i>  ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("fog");
  } else {
    document.querySelector(".weather .tag").innerHTML =
      `<i class="fa-solid fa-wind"></i>  ${data.weather[0].main}`;
    document
      .querySelector(".info")
      .classList.remove("cloud", "rain", "snow", "fog", "wind", "clear");
    document.querySelector(".info").classList.add("wind");
  }
  document.querySelector(".speed .tag").innerHTML = +data.wind.speed + " m/s";
  if (aqidata.list[0].main.aqi == 1) {
    document.querySelector(".AQI").style.backgroundColor =
      "rgb(0, 153, 102,0.5)";
    document.querySelector(".AQI .tag").innerText = "Good";
  } else if (aqidata.list[0].main.aqi == 2) {
    document.querySelector(".AQI").style.backgroundColor =
      "rgb(255, 222, 51,0.5)";
    document.querySelector(".AQI .tag").innerText = "Fair";
  } else if (aqidata.list[0].main.aqi == 3) {
    document.querySelector(".AQI").style.backgroundColor =
      "rgb(255, 153, 51,0.5)";
    document.querySelector(".AQI .tag").innerText = "Moderate";
  } else if (aqidata.list[0].main.aqi == 4) {
    document.querySelector(".AQI").style.backgroundColor =
      "rgb(204, 0, 51,0.5)";
    document.querySelector(".AQI .tag").innerText = "Poor";
  } else if (aqidata.list[0].main.aqi == 5) {
    document.querySelector(".AQI").style.backgroundColor =
      "rgb(102, 0, 153,0.5)";
    document.querySelector(".AQI .tag").innerText = "Very Poor";
  } else {
    document.querySelector(".AQI").style.backgroundColor = "rgb(126,0,35,0.5)";
    document.querySelector(".AQI .tag").innerText = "Hazardous";
  }
  let infoblock = [];
  day5data.list.forEach((element) => {
    if (element.dt_txt.includes("12:00:00")) {
      let info = [];
      info.push(element.dt_txt.split(" ")[0]);
      info.push(Math.round(element.main.temp) + "°C");
      info.push(element.weather[0].main);
      info.push(element.wind.speed + " m/s");
      infoblock.push(info);
    }
  });
  document.querySelector(".days1 .date5").innerText = infoblock[0][0]
    .split("-")
    .reverse()
    .join("-");
  document.querySelector(".days1 .temp5").innerText = infoblock[0][1];
  document.querySelector(".days1 .weather5").innerHTML = getWeatherIcon(
    infoblock[0][2],
  );
  document.querySelector(".days1 .speed5").innerText = infoblock[0][3];
  document.querySelector(".days2 .date5").innerText = infoblock[1][0]
    .split("-")
    .reverse()
    .join("-");
  document.querySelector(".days2 .temp5").innerText = infoblock[1][1];
  document.querySelector(".days2 .weather5").innerHTML = getWeatherIcon(
    infoblock[1][2],
  );
  document.querySelector(".days2 .speed5").innerText = infoblock[1][3];
  document.querySelector(".days3 .date5").innerText = infoblock[2][0]
    .split("-")
    .reverse()
    .join("-");
  document.querySelector(".days3 .temp5").innerText = infoblock[2][1];
  document.querySelector(".days3 .weather5").innerHTML = getWeatherIcon(
    infoblock[2][2],
  );
  document.querySelector(".days3 .speed5").innerText = infoblock[2][3];
  document.querySelector(".days4 .date5").innerText = infoblock[3][0]
    .split("-")
    .reverse()
    .join("-");
  document.querySelector(".days4 .temp5").innerText = infoblock[3][1];
  document.querySelector(".days4 .weather5").innerHTML = getWeatherIcon(
    infoblock[3][2],
  );
  document.querySelector(".days4 .speed5").innerText = infoblock[3][3];
  document.querySelector(".days5 .date5").innerText = infoblock[4][0]
    .split("-")
    .reverse()
    .join("-");
  document.querySelector(".days5 .temp5").innerText = infoblock[4][1];
  document.querySelector(".days5 .weather5").innerHTML = getWeatherIcon(
    infoblock[4][2],
  );
  document.querySelector(".days5 .speed5").innerText = infoblock[4][3];
  console.log(infoblock);
  particle(currentweather);
  showimage(data.main.temp, data.weather[0].main);
  document.querySelector(".suggestion").style.display = "flex";
  panels(location);
  let currentcitydata = [
    data.name,
    Math.round(data.main.temp),
    data.weather[0].main,
    data.wind.speed,
    data.main.humidity,
    aqidata.list[0].main.aqi,
    Math.round(data.main.feels_like),
  ];
  console.log(currentcitydata);
  comparecities(currentcitydata);
};
function particle(currentweather) {
  if (currentweather == "Rain") {
    const container = document.querySelector(".effect");
    container.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.classList.add("raindrop");
      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = 0.5 + Math.random() + "s";
      container.appendChild(drop);
    }
  } else if (currentweather == "Snow") {
    const container = document.querySelector(".effect");
    container.innerHTML = "";

    for (let i = 0; i < 50; i++) {
      const snow = document.createElement("div");
      snow.classList.add("snowflake");
      snow.innerHTML = "❄";

      snow.style.left = Math.random() * 100 + "vw";
      snow.style.animationDuration = 2 + Math.random() * 3 + "s";

      container.appendChild(snow);
    }
  } else if (currentweather == "Haze" || currentweather == "Thunderstorm") {
    const container = document.querySelector(".effect");
    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {
      const wind = document.createElement("div");
      wind.classList.add("windflow");
      wind.style.left = "-100px";
      wind.style.top = Math.random() * 100 + "vh";
      wind.style.animationDuration = 4 + Math.random() * 4 + "s";

      container.appendChild(wind);
    }
  } else if (
    currentweather == "Fog" ||
    currentweather == "Mist" ||
    currentweather == "Smoke"
  ) {
    const container = document.querySelector(".effect");
    container.innerHTML = "";
    const fog1 = document.createElement("div");
    fog1.classList.add("fogmove");
    const fog2 = document.createElement("div");
    fog2.classList.add("fog");
    container.appendChild(fog1);
    container.appendChild(fog2);
  } else {
    document.querySelector(".effect").innerHTML = "";
  }
}
function getWeatherIcon(condition) {
  if (condition == "Clear") {
    return `<i class="fa-solid fa-sun" style="color: #ffd43b"></i> ${condition}`;
  } else if (condition == "Clouds") {
    return `<i class="fa-solid fa-cloud" style="color: #717171"></i> ${condition}`;
  } else if (condition == "Rain") {
    return `<i class="fa-solid fa-cloud-showers-heavy" style="color: #313131"></i> ${condition}`;
  } else if (condition == "Snow") {
    return `<i class="fa-regular fa-snowflake" style="color: #7bf0ff"></i> ${condition}`;
  } else if (condition == "Fog") {
    return `<i class="fa-solid fa-smog" style="color: #ae8e81"></i> ${condition}`;
  } else {
    return `<i class="fa-solid fa-wind"></i> ${condition}`;
  }
}
function createrequest(temp, condition) {
  let items = [];
  let tip = "";
  if (temp >= 35) {
    items = ["cotton tshirt", "shorts", "sandals", "cap hat"];
    tip =
      "🌡️ Very hot today! Stick to light breathable cotton. Avoid dark colors as they absorb heat. Stay hydrated!";
  } else if (temp >= 28) {
    items = ["tshirt", "jeans", "sneakers"];
    tip =
      "☀️ Warm and sunny. Light comfortable clothing is perfect. Carry sunglasses!";
  } else if (temp >= 20) {
    items = ["casual shirt", "chinos", "loafers", "light jacket"];
    tip =
      "🌤️ Pleasant weather today. A light jacket for the evening would be handy.";
  } else if (temp >= 12) {
    items = ["sweater", "jeans", "boots", "scarf"];
    tip = "🍂 Getting chilly. Layer up with a warm sweater and carry a scarf.";
  } else if (temp >= 5) {
    items = ["hoodie", "warm jacket", "boots", "gloves"];
    tip = "🧣 Cold outside! Wear warm layers. Cover your hands and ears.";
  } else {
    items = [
      "heavy winter coat",
      "thermal pants",
      "winter boots",
      "woolen hat",
    ];
    tip =
      "❄️ Extremely cold! Full winter gear is essential. Minimize time outdoors.";
  }
  if (condition === "Rain" || condition === "Drizzle") {
    items.push("raincoat");
    tip += " ☂️ Rain expected — carry an umbrella and wear waterproof shoes.";
  } else if (condition === "Snow") {
    items.push("snow boots");
    tip +=
      " ❄️ Snow expected — waterproof boots and thermal layers are a must.";
  } else if (condition === "Thunderstorm") {
    items.push("raincoat");
    tip += " ⛈️ Thunderstorm alert — stay indoors if possible.";
  } else if (
    condition === "Haze" ||
    condition === "Fog" ||
    condition === "Mist"
  ) {
    tip +=
      " 🌫️ Poor visibility outside. Drive carefully and wear bright colored clothing.";
  }

  return { items, tip };
}
async function getimage(item) {
  const query = `${type} ${item} fashion outfit`;
  let res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=portrait`,
    { headers: { Authorization: apikey2 } },
  );
  let data = await res.json();
  if (data.photos && data.photos.length > 0) {
    return data.photos[Math.floor(Math.random() * data.photos.length)].src
      .medium;
  } else {
    console.log("Image not found");
  }
  console.log(data);
}
async function showimage(temp, condition) {
  const { items, tip } = createrequest(temp, condition);
  const boxes = document.querySelectorAll(".images > div");
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundImage = 'url("images/niceday.jpg")';
  });
  for (let i = 0; i < items.length; i++) {
    if (boxes[i]) {
      boxes[i].innerHTML = `<p style="text-align:center">Loading...</p>`;
    }
  }
  const imageUrls = await Promise.all(items.map((item) => getimage(item)));
  items.forEach((item, i) => {
    if (boxes[i]) {
      boxes[i].style.backgroundImage = `url(${imageUrls[i]})`;
      boxes[i].style.backgroundSize = "cover";
      boxes[i].style.backgroundPosition = "center";
      boxes[i].innerHTML =
        `<p style="text-align:center; padding:8px; font-weight:600; background-color:rgba(255,255,255,0.7); border-radius:5px;">${item}</p>`;
    }
  });
  document.querySelector(".description").innerText = tip;
}
async function getWeatherNews(city) {
  const query = `weather ${city}`;
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&api_key=${apikey3}`;
  const res = await fetch(proxyUrl);
  const data = await res.json();
  if (data.status !== "ok") {
    console.error("Failed to fetch news:", data.message);
    return [];
  }
  return data.items;
}
async function panels(location) {
  const newsContainer = document.querySelector(".articals");
  newsContainer.innerHTML = "<p>Loading news...</p>";
  const newsitems = await getWeatherNews(location);
  newsContainer.innerHTML = "";
  for (let i = 0; i < newsitems.length; i++) {
    const newsbox = document.createElement("div");
    newsbox.classList.add("newsbox");
    let list = newsitems[i].pubDate.split(" ");
    list[0] = list[0].split("-").reverse().join("-");
    newsbox.innerHTML = `<h3>${newsitems[i].title}</h3>
    <p>${list[0]}</p>
    <a href="${newsitems[i].link}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsbox);
  }
  console.log(newsitems);
  document.querySelector(".news").style.display = "flex";
}
function getDailyMinMax(day5data) {
  let today = new Date().toISOString().split("T")[0];
  let todayEntries = day5data.list.filter((e) => e.dt_txt.startsWith(today));
  let entries =
    todayEntries.length >= 2 ? todayEntries : day5data.list.slice(0, 8);
  let temps = entries.map((e) => e.main.temp);
  let min = Math.round(Math.min(...temps));
  let max = Math.round(Math.max(...temps));
  return { min, max };
}
function comparecities(currentcitydata) {
  const popbut = document.querySelector(".popbut");
  const popupback = document.querySelector(".popupback");
  const closebtn = document.querySelector(".closebtn");
  const compsearch = document.querySelector(".compsearch");
  const compbar = document.querySelector(".compbar");
  const infoarea = document.querySelector(".infoarea");
  popbut.style.display = "flex";
  const newPopbut = popbut.cloneNode(true);
  popbut.replaceWith(newPopbut);
  newPopbut.addEventListener("click", () => {
    popupback.style.display = "flex";
  });
  const newCompsearch = document.querySelector(".compsearch").cloneNode(true);
  compsearch.replaceWith(newCompsearch);
  newCompsearch.addEventListener("click", () => {
    const location2 = document.querySelector(".compbar").value;
    get2(location2, currentcitydata);
    infoarea.style.display = "flex";
  });
  compbar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const location2 = document.querySelector(".compbar").value;
      get2(location2, currentcitydata);
      infoarea.style.display = "flex";
    }
  });
  closebtn.addEventListener("click", () => {
    popupback.style.display = "none";
    infoarea.style.display = "none";
    compbar.value = "";
    document
      .querySelectorAll(".infoarea .box1, .infoarea .box3")
      .forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
      });
  });
}
const get2 = async (location2, currentcitydata) => {
  let response2 = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location2 +
      `&units=metric&appid=${apikey}`,
  );
  let data2 = await response2.json();
  if (data2.cod === "404") {
    alert("City not found for comparison!");
    return;
  }
  let aqiresponse2 = await fetch(
    "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      data2.coord.lat +
      "&lon=" +
      data2.coord.lon +
      `&appid=${apikey}`,
  );
  let aqiData2 = await aqiresponse2.json();
  let city2data = [
    data2.name,
    Math.round(data2.main.temp),
    data2.weather[0].main,
    data2.wind.speed,
    data2.main.humidity,
    aqiData2.list[0].main.aqi,
    Math.round(data2.main.feels_like),
  ];
  console.log(city2data);
  document.querySelector(".infoarea").style.display = "flex";
  document.querySelector(".locationcomp .box1").innerHTML = currentcitydata[0];
  document.querySelector(".tempcomp .box1").innerHTML =
    currentcitydata[1] + "°C";
  document.querySelector(".weathercomp .box1").innerHTML = currentcitydata[2];
  document.querySelector(".speedcomp .box1").innerHTML =
    currentcitydata[3] + " m/s";
  document.querySelector(".humiditycomp .box1").innerHTML =
    "💧" + currentcitydata[4] + "%";
  if (currentcitydata[5] == 1) {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(0, 153, 102,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Good";
  } else if (currentcitydata[5] == 2) {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(255, 222, 51,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Fair";
  } else if (currentcitydata[5] == 3) {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(255, 153, 51,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Moderate";
  } else if (currentcitydata[5] == 4) {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(204, 0, 51,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Poor";
  } else if (currentcitydata[5] == 5) {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(102, 0, 153,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Very Poor";
  } else {
    document.querySelector(".AQIcomp .box1").style.backgroundColor =
      "rgb(126,0,35,0.5)";
    document.querySelector(".AQIcomp .box1").innerText = "Hazardous";
  }
  document.querySelector(".feellikecomp .box1").innerHTML =
    currentcitydata[6] + "°C";
  document.querySelector(".locationcomp .box3").innerHTML = city2data[0];
  document.querySelector(".tempcomp .box3").innerHTML =
    Math.round(city2data[1]) + "°C";
  document.querySelector(".weathercomp .box3").innerHTML = city2data[2];
  document.querySelector(".speedcomp .box3").innerHTML = city2data[3] + " m/s";
  document.querySelector(".humiditycomp .box3").innerHTML =
    "💧" + city2data[4] + "%";
  if (city2data[5] == 1) {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(0, 153, 102,0.5)";
    document.querySelector(".AQIcomp .box3").innerText = "Good";
  } else if (city2data[5] == 2) {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(255, 222, 51,0.5)";
    document.querySelector(".AQIcomp .box3").innerText = "Fair";
  } else if (city2data[5] == 3) {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(255, 153, 51,0.5)";
    document.querySelector(".AQIcomp   .box3").innerText = "Moderate";
  } else if (city2data[5] == 4) {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(204, 0, 51,0.5)";
    document.querySelector(".AQIcomp .box3").innerText = "Poor";
  } else if (city2data[5] == 5) {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(102, 0, 153,0.5)";
    document.querySelector(".AQIcomp .box3").innerText = "Very Poor";
  } else {
    document.querySelector(".AQIcomp .box3").style.backgroundColor =
      "rgb(126,0,35,0.5)";
    document.querySelector(".AQIcomp .box3").innerText = "Hazardous";
  }
  document.querySelector(".feellikecomp .box3").innerHTML = city2data[6] + "°C";
  const [tc1, tc2] = bettercolor(currentcitydata[1], city2data[1], true);
  document.querySelector(".tempcomp .box1").style.backgroundColor = tc1;
  document.querySelector(".tempcomp .box3").style.backgroundColor = tc2;
  const [hc1, hc2] = bettercolor(currentcitydata[4], city2data[4], true);
  document.querySelector(".humiditycomp .box1").style.backgroundColor = hc1;
  document.querySelector(".humiditycomp .box3").style.backgroundColor = hc2;
  const [sc1, sc2] = bettercolor(currentcitydata[3], city2data[3], true);
  document.querySelector(".speedcomp .box1").style.backgroundColor = sc1;
  document.querySelector(".speedcomp .box3").style.backgroundColor = sc2;
  const [fc1, fc2] = bettercolor(currentcitydata[6], city2data[6], true);
  document.querySelector(".feellikecomp .box1").style.backgroundColor = fc1;
  document.querySelector(".feellikecomp .box3").style.backgroundColor = fc2;
};
function bettercolor(val1, val2, lowerIsBetter = false) {
  if (val1 === val2) return ["#FFD700", "#FFD700"];
  if (lowerIsBetter) {
    return val1 < val2 ? ["#00cc66", "#ff4444"] : ["#ff4444", "#00cc66"];
  } else {
    return val1 > val2 ? ["#00cc66", "#ff4444"] : ["#ff4444", "#00cc66"];
  }
}
searchbutton.addEventListener("click", () => {
  const location = search.value;
  get(location);
});
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const location = search.value;
    get(location);
  }
});
