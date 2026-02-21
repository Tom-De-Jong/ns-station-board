let minuteDisplay = document.querySelector(".minuteNumber");
let trainType = document.querySelector(".trainType");
let destination = document.querySelector(".destination");
let via = document.querySelector(".via");
let nextTrain = document.querySelector(".nextTrain")
let trainNumber = 1;


fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?uicCode=8400337&maxJourneys=10', {
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

        let trainTime = data.payload.departures[trainNumber].actualDateTime;
        let newDate = new Date(trainTime);
        let now = new Date();
        // console.log(now.getMinutes());
        // console.log(newDate.getMinutes());

        let waitingTime = newDate.getMinutes() - now.getMinutes()
        console.log("waiting time: " + waitingTime);

        // als de trein via andere plekken gaat
        if (data.payload.departures[trainNumber].routeStations.length != 0) {

            console.log(data.payload.departures[trainNumber].routeStations);
            let viaStations = "via"

            for (let i = 0; i < data.payload.departures[trainNumber].routeStations.length; i++) {

                if (i < data.payload.departures[trainNumber].routeStations.length - 1) {
                    viaStations += " " + data.payload.departures[trainNumber].routeStations[i].mediumName + ","
                    
                } else{
                    viaStations += " " + data.payload.departures[trainNumber].routeStations[i].mediumName
                    
                }

            }
            via.innerHTML = viaStations;
        }

        nextTrainDate = new Date(data.payload.departures[trainNumber + 1].actualDateTime)
        nextTrainTime = nextTrainDate.getHours() + ":" + nextTrainDate.getMinutes();
        nextTrainShort = data.payload.departures[trainNumber + 1].product.categoryCode
        nextTrainDirection = data.payload.departures[trainNumber + 1].direction
        
        



        let routeStationsConnected = "";

        minuteDisplay.innerHTML = waitingTime;
        trainType.innerHTML = data.payload.departures[trainNumber].product.longCategoryName;
        destination.innerHTML = data.payload.departures[trainNumber].direction
        nextTrain.innerHTML = "Volgende trein: " + nextTrainTime + " " + nextTrainShort + " " + nextTrainDirection
        
    })

    .catch(err => console.error(err));

