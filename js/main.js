// Navigation bar
const homeSection = document.querySelector('#home');
const contactSection = document.querySelector('#contact');
const loginSection = document.querySelector('#login');
const signupSection = document.querySelector('#signup');
const helpSection = document.querySelector('#help');

function homeClick() {  // showing Home section.
  document.querySelector("#home-section").classList.remove("hidden");
  document.querySelector("#help-section").classList.add("hidden");
  document.querySelector("#contact-section").classList.add("hidden");
  document.querySelector("#login-section").classList.add("hidden");
  document.querySelector("#signup-section").classList.add("hidden");
}
homeSection.addEventListener('click', homeClick);

function contactClick() {  // showing Contact section.
  document.querySelector("#home-section").classList.add("hidden");
  document.querySelector("#help-section").classList.add("hidden");
  document.querySelector("#contact-section").classList.remove("hidden");
  document.querySelector("#login-section").classList.add("hidden");
  document.querySelector("#signup-section").classList.add("hidden");
}
contactSection.addEventListener('click', contactClick);

function loginClick() {  // showing Lonin section.
  document.querySelector("#home-section").classList.add("hidden");
  document.querySelector("#help-section").classList.add("hidden");
  document.querySelector("#contact-section").classList.add("hidden");
  document.querySelector("#login-section").classList.remove("hidden");
  document.querySelector("#signup-section").classList.add("hidden");
}
loginSection.addEventListener('click', loginClick);

function signupClick() {  // showing Sign up section.
  document.querySelector("#home-section").classList.add("hidden");
  document.querySelector("#help-section").classList.add("hidden");
  document.querySelector("#contact-section").classList.add("hidden");
  document.querySelector("#login-section").classList.add("hidden");
  document.querySelector("#signup-section").classList.remove("hidden");
}
signupSection.addEventListener('click', signupClick);

function helpClick() {  // showing Help section.
  document.querySelector("#home-section").classList.add("hidden");
  document.querySelector("#help-section").classList.remove("hidden");
  document.querySelector("#contact-section").classList.add("hidden");
  document.querySelector("#login-section").classList.add("hidden");
  document.querySelector("#signup-section").classList.add("hidden");
}
helpSection.addEventListener('click', helpClick);

window.onload = function WindowLoad() { // load Home page
  homeClick();
}
//----------------------------------------------------------------


// get airports Data from json file into (From) element
let fromDropdown = document.getElementById('from-dropdown');

function getDepAirports() {

  fromDropdown.length = 0;

  let fromOption = document.createElement('option');
  fromOption.text = 'Select a location';

  fromDropdown.add(fromOption);
  fromDropdown.selectedIndex = 0;


  fetch('airportsData.json')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.warn('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response  
        response.json().then(function (data) {
          let option;

          for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.className = 'from';
            option.text = `${data[i].iataCode}, ${data[i].location}, ${data[i].country}`;
            option.value = data[i].iataCode;
            fromDropdown.add(option);
          }
        });
      }
    )
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });

}
getDepAirports()
//----------------------------------------------------------------



// get airports Data from json file into (To) element
let toDropdown = document.getElementById('to-dropdown');

function getArrAirports() {
  toDropdown.length = 0;

  let toOption = document.createElement('option');
  toOption.text = 'Select a location';

  toDropdown.add(toOption);
  toDropdown.selectedIndex = 0;


  fetch('airportsData.json')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.warn('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response  
        response.json().then(function (data) {
          let option;

          for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.className = 'to';
            option.text = `${data[i].iataCode}, ${data[i].location}, ${data[i].country}`;
            option.value = data[i].iataCode;
            toDropdown.add(option);
          }
        });
      }
    )
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });
}
getArrAirports()

//----------------------------------------------------------------




// get Departure Airport value
const fromSelect = document.getElementById('from-dropdown');

fromSelect.addEventListener('change', getFromValue);

function getFromValue() {
  let depAirport = fromSelect.options[fromSelect.selectedIndex].value;
  console.log(`Departure Airport: ${depAirport}`);
  return depAirport;
}



// Get Arrival Airport value
const toSelect = document.getElementById('to-dropdown');

toSelect.addEventListener('input', getToValue);

function getToValue() {
  let arrAirport = fromSelect.options[toSelect.selectedIndex].value;
  console.log(`Arrival Airport: ${arrAirport}`);
  return arrAirport;
}


// Get Departure Date
const depDateEle = document.querySelector('.dep-date');

depDateEle.addEventListener('input', getDepDate);

function getDepDate() {
  let departureDate = document.querySelector('.dep-date').value;
  console.log(`Departure Date: ${departureDate}`);
  // console.log(typeof departureDate);
  return departureDate;
}


// Get Return Date
const retDateEle = document.querySelector('.ret-date');

retDateEle.addEventListener('input', getRetDate);

function getRetDate() {
  let returnDate = document.querySelector('.ret-date').value;
  console.log(`Return Date: ${returnDate}`);
  return returnDate;
}
//----------------------------------------------------------------



// get flight data from an API
const findFlights = document.getElementById('form-submit');

findFlights.addEventListener('submit', getflights);
console.log(findFlights);
function getflights(e) {

  e.preventDefault();

  const dep = getFromValue();
  const arr = getToValue();
  const depDate = getDepDate();
  const retDate = getRetDate();

  const url = `http://api.aviationstack.com/v1/flights?access_key=536871fc19058cff552765e03ff60587&dep_iata=${dep}&arr_iata=${arr}`

  console.log(url);

  fetch(url) /*flights API and search Parametars*/

    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.data);

      let output = '';

      if (data.data.length !== 0) {

        data.data.forEach((flight) => {

          if (depDate === flight.flight_date) { // filter flights by date
            console.log(flight);
            // console.log(flight.flight_date);

            output += `
              <div class="flights-results">
                <div>
                  <p class="dep-icon"><img class="icon" src="/img/dep.png" alt="">${flight.departure.iata}</p>
                  <p class="arr-icon"><img class="icon" src="/img/arr.png" alt="">${flight.arrival.iata}</p>
                </div> 

                <div>
                    <p> Airline: (${flight.airline.iata}) ${flight.airline.name} </p>
                    <p> Flight Number: ${flight.flight.iata} </p> 
                </div>
                
                <div>
                  <p> Terminal: ${flight.departure.terminal} </p>
                  <p> Terminal: ${flight.arrival.terminal}</p>
                </div> 

                
                <div>
                  <p> Departure Date & Time: ${flight.departure.scheduled}</p>
                  <p> Arrival Date & Time: ${flight.arrival.scheduled}</p>
                </div> 

                <button class="btn select-flight-btn" >Select Flight</button>    
              </div>

              `
          }

        });

        if (output.length === 0) {
          output = `
          <p class='no-flights'> There is no flight found</p> 
          `
        }

        document.getElementById('flights').innerHTML = output;
      }

      else {
        output = `
          <p class='no-flights'> There is no flight found</p> 
          `
        document.getElementById('flights').innerHTML = output;
      }
    });
}
//----------------------------------------------------------------



// Select a flight in a Modal
// const selectFlightBtn = document.getElementById('select-flight-btn');

// selectFlightBtn.addEventListener('click', selectFlight);

// function selectFlight() {
//   console.log(1111111111);
// }

