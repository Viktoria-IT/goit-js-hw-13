const BASE_URL = 'https://restcountries.eu/rest/v2';

 function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}/?fields=name;capital;population;flag;languages`).then(response =>
        response.json(),
    );
}

//  function fetchCountries(name) {
//     const url = `https://restcountries.eu/rest/v2/name/${name}`;
//     return fetch(url)
//         .then(response => response.json());
// }

export { fetchCountries };



