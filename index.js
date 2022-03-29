/*Background*/
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  .then(res => res.json())
  .then(data => {
   document.body.style.backgroundImage=`url(${data.urls.regular})`
    document.getElementById("author").textContent = `Photo by: ${data.user.name}`
  })
  .catch(err => {
    document.body.style.backgroundImage = 
      `url("https://images.unsplash.com/photo-1448375240586-882707db888b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")`
  })
  
/*QUOTES*/

fetch("https://type.fit/api/quotes")
  .then(res => {
    if(!res.ok){
        throw Error("something went wrong")
    }return res.json()
    })
  .then(data => {
    let number= Math.ceil(Math.random()*100)
    const text = data[number].text
    const textAuthor = data[number].author
    document.getElementById("quote").innerHTML = 
      textAuthor !== null ? `<h4>'${text}'</h4><h6>-${textAuthor}` : `<h4>${text}</h4>`
})
.catch(err => console.error(err))

/*Time*/
function getCurrentTime(){
  const date = new Date()
  document.getElementById("time").textContent = date.toLocaleTimeString("hun", {timeStyle: "medium"})
}
setInterval(getCurrentTime, 1000)

/*WEATHER*/
navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
  .then(res => {
    if(!res.ok){
      throw Error("Weather data not available")
    }return res.json()
  })
  .then(data => {
    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
      <img src=${iconURL} /> 
      <p className="temp">${Math.round(data.main.temp)}°C </p>
      <p className="city"> ${data.name}</p>`
  })
  .catch(err => console.error(err));
  })
            