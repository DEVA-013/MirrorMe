// TIME + DATE
function updateTime() {
    const now = new Date();

    let time = now.toLocaleTimeString();
    let date = now.toDateString();

    document.getElementById("time").innerText = time;
    document.getElementById("date").innerText = date;
}


setInterval(updateTime, 1000);
updateTime();


// WEATHER API (OpenWeather)
async function getWeather() {
    const apiKey = "7c3aa004097c024bccf5b03c9a385847"; 
    const city = "Chennai";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;

        document.getElementById("weather").innerText =
            `${city}: ${temp}°C, ${desc}`;

    } catch (error) {
        document.getElementById("weather").innerText = "Weather error";
    }
}

getWeather();
setInterval(getWeather, 600000); // every 10 min


// NEWS API
async function getNews() {
    const apiKey = "71d49b310f3c4705a07080fdcabe3570";
    const url = `https://corsproxy.io/?https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();

        console.log(data); // 👈 IMPORTANT (check in console)

        if (data.articles && data.articles.length > 0) {
            let headlines = "";

            data.articles.slice(0, 3).forEach(article => {
                headlines += "• " + article.title + "<br>";
            });

            document.getElementById("news").innerHTML = headlines;
        } else {
            document.getElementById("news").innerText = "No news found";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("news").innerText = "News not loading";
    }
}

getNews();
setInterval(getNews, 600000);