import countrysTamplate from '../templates/countries.hbs';
import countryTamplate from '../templates/country.hbs'

const refs = {
  textInput: document.querySelector('.searchCountry'),
  country: document.querySelector('.js-country'),
};

const debounce = require('lodash.debounce');

// console.log(refs.textInput);

refs.textInput.addEventListener('input', debounce(findCountry, 500));

function findCountry() {
  //   e.preventDefault();
  //   console.log(refs.textInput.value);
  fetchQuery(refs.textInput.value).then(renderCountry).catch(console.error());
}

// fetchCountry('Sw').then(renderCountry).catch(console.error());

function fetchQuery(countryId) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`).then(
    response => {
      return response.json();
    },
  );
}

function renderCountry(country) {
  //   console.log(country);
//   console.log(country.length);
  if (country.length === 1) {
    const newCountry = country[0];
    console.log(country);
    console.log(newCountry);
    console.log(newCountry.name);
    console.log(newCountry.capital);
    console.log(newCountry.population);
    // console.log(country[0].languages);
    newCountry.languages.map(language => console.log(language.name));
    console.log(newCountry.flag);
    refs.country.insertAdjacentHTML('beforeend', countryTamplate(newCountry));
  }
  if (country.length <= 10 && country.length !== 1) {
    // console.log(country);
    // country.map(countrys => console.log(countrys.name));
    // countrys => console.log(countrys.name);
    console.log('+');
    refs.country.insertAdjacentHTML(
      'beforeend',
      countrysTamplate(country.map(countrys => countrys.name)),
    );
  }
  if (country.length > 10) {
    console.log('-');
  }
}

// fetch(`https://restcountries.eu/rest/v2/name/Switzerland`)
//   .then(response => {
//     return response.json();
//   })
//   .then(country => {
//     console.log(country);
//   });
