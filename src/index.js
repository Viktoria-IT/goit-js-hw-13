import './sass/main.scss';
import countryCardTpl from './country-card.hbs';
import countriesListTpl from './countries-list.hbs';
import { fetchCountries } from './js/fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

countryCardTpl({});
countriesListTpl({});

const refs = {
    cardContainer: document.querySelector('.js-country-card-container'),
    searchForm: document.querySelector('#search-box')
};
const DEBAUNCE_DELAY = 300;

refs.searchForm.addEventListener('input', debounce(onSearch,DEBAUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.value;
    refs.cardContainer.innerHTML = '';
    if (searchQuery == "") {
        return;
    };

    fetchCountries(searchQuery)
        .then(countries => {
            if (countries.length === 1) {
                renderCountryCard(countries);
            }
            if (countries.length >= 2 && countries.length <= 10) {
                renderCountriesListTpl(countries);
            }
            if (countries.length > 10) {
               Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');         
            }
            if (countries.status === 404) {
                onFetchError();        
            }             
    })
    .catch(onFetchError);
}
 

function renderCountriesListTpl(countries ) {    
    const list = countriesListTpl(countries);    
    refs.cardContainer.innerHTML = list;

}



function renderCountryCard(countries) {
    
    const countryExemplar = countries[0];
  
    countryExemplar.languages = countryExemplar.languages.map(language=>language.name).join(', '); 
    
    const markup = countryCardTpl(countryExemplar);
    refs.cardContainer.innerHTML = markup;
}
 



function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}
