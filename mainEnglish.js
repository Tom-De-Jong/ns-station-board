let minuteDisplay = document.querySelector(".minuteNumber");
let trainType = document.querySelector(".trainType");
let destination = document.querySelector(".destination");
let via = document.querySelector(".via");
let nextTrain = document.querySelector(".nextTrain")
let minuteText = document.querySelector(".minuteText")
let trainNumber = 0;
let uicCode;

const fetchData = async () => {


    fetch(`https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?uicCode=${uicCode}&maxJourneys=2`, {
        method: 'GET',
        // Request headers
        headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': 'e32666e32fc443b088c3675b06fea1f4',
        }
    })
        .then(response => {
            console.log(response.status)
            return response.json();
        })

        .then(data => {
            console.log(data.payload);
            console.log(data.payload.departures[trainNumber]);

            // hier worden de variables van de aankomsttijd en de tijd van nu gemaakt en berekend in hoeveel minuten de eerste trein komt
            let trainTime = data.payload.departures[trainNumber].actualDateTime;
            let newDate = new Date(trainTime);
            let now = new Date();
            let waitingTime = newDate.getMinutes() - now.getMinutes()

            if (waitingTime === 0) {
                minuteText.innerHTML = "minute"
                minuteDisplay.innerHTML = "< 1";
            } else if (waitingTime == 1) {
                minuteText.innerHTML = "minute"
                minuteDisplay.innerHTML = waitingTime;
            } else {
                minuteText.innerHTML = "minutes"
                minuteDisplay.innerHTML = waitingTime;
            }


            console.log("waiting time: " + waitingTime + " minuten");


            // als de trein via andere plekken gaat laat hij het in de view zien doormiddel van deze if statements
            if (data.payload.departures[trainNumber].routeStations.length != 0) {

                console.log(data.payload.departures[trainNumber].routeStations);
                let viaStations = "via"

                // deze for loop is er om te kijken of hij achter het station een komma moet zetten if niet
                for (let i = 0; i < data.payload.departures[trainNumber].routeStations.length; i++) {

                    if (i < data.payload.departures[trainNumber].routeStations.length - 1) {
                        if (data.payload.departures[trainNumber].routeStations[i].mediumName.slice(-1) == ".") {

                            viaStations += " " + data.payload.departures[trainNumber].routeStations[i].mediumName.slice(0, -1) + ",";

                        } else {
                            viaStations += " " + data.payload.departures[trainNumber].routeStations[i].mediumName + ","
                        }


                    } else {
                        viaStations += " " + data.payload.departures[trainNumber].routeStations[i].mediumName

                    }

                }
                // als de trein stopt bij andere stations wordt het in de view gezet
                via.innerHTML = viaStations;
            }

            // hier worden de variables voor de volgende trein gemaakt
            nextTrainDate = new Date(data.payload.departures[trainNumber + 1].actualDateTime)
            nextTrainTime = nextTrainDate.getHours() + ":" + nextTrainDate.getMinutes();
            nextTrainShort = data.payload.departures[trainNumber + 1].product.categoryCode
            nextTrainDirection = data.payload.departures[trainNumber + 1].direction

            // volgende trein wordt in de view gezet
            trainType.innerHTML = data.payload.departures[trainNumber].product.longCategoryName;
            destination.innerHTML = data.payload.departures[trainNumber].direction
            nextTrain.innerHTML = "next train: " + nextTrainTime + " " + nextTrainShort + " " + nextTrainDirection

        })

        .catch(err => console.error(err));

}

// fetchData();
// const interval = setInterval(fetchData, 60000);

function changeView() {
    uicCode = document.querySelector(".input-plain").value
    let startMenuContainer = document.querySelector(".startMenuContainer").style.display = "none";
    document.querySelector(".boardContainer").style.display = "flex";

    fetchData();
    const interval = setInterval(fetchData, 60000);
}