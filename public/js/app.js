
const myForm = document.querySelector('form')
const searchTxt = document.querySelector('input')
const errMsg = document.querySelector('#message-1')
const infoMsg = document.querySelector('#message-2')
const weatherImg = document.querySelector('#weather-img')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchTxt.value

    errMsg.textContent='Loading...'
    infoMsg.textContent=''
    weatherImg.src = ''

    fetch('/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            errMsg.textContent = data.error

        }else{
            infoMsg.textContent = data.forecast
            errMsg.textContent=data.location
            weatherImg.src = data.weather_img
        }
    })
})

})