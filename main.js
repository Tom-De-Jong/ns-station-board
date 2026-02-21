let data;

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
        console.log(data.payload.departures[0]);


    })

    .catch(err => console.error(err));

