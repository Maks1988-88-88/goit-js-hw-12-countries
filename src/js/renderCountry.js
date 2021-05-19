import countrysTamplate from '../templates/countries.hbs';
import countryTamplate from '../templates/country.hbs';

import fetchQuery from './fetchCountry';

const debounce = require('lodash.debounce');

const refs = {
  textInput: document.querySelector('.searchCountry'),
  country: document.querySelector('.js-country'),
};


refs.textInput.addEventListener('input', debounce(findCountry, 500));

function findCountry() {
  fetchQuery(refs.textInput.value).then(renderCountry).catch(console.error());
}

function renderCountry(country) {
  refs.country.innerHTML = '';
  if (country.length === 1) {
    const newCountry = country[0];
    console.log(country);
    console.log(newCountry);
    console.log(newCountry.name);
    console.log(newCountry.capital);
    console.log(newCountry.population);
    newCountry.languages.map(language => console.log(language.name));
    console.log(newCountry.flag);
    refs.country.insertAdjacentHTML('beforeend', countryTamplate(newCountry));
  }
  if (country.length <= 10 && country.length !== 1) {
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