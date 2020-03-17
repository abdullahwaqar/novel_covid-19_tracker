'use strict';

const BASE_URL = 'https://novelcovid-19-tracker.herokuapp.com/';

const loader = document.querySelectorAll('#loader');
const activeLoader = document.querySelectorAll('#active-loader');
const dataPlaceholders = document.querySelectorAll('#global-data');

const coronavirusCasesNo = document.getElementById('coronavirus-cases-no');
const coronavirusDeaths = document.getElementById('global-deaths');
const globalRecovery = document.getElementById('global-recovery');

const countrySelector = document.getElementById('country-selector');

const countryLabel = document.getElementById('country-label');
const activeCoronavirusCasesNo = document.getElementById('active-coronavirus-cases-no');
const newCases = document.getElementById('new-cases');
const newDeaths = document.getElementById('new-deaths');
const seriousCritical = document.getElementById('serious-critical');
const totalCases = document.getElementById('total-cases');
const totalDeaths = document.getElementById('total-deaths');
const totalRecovery = document.getElementById('total-recovery');

countrySelector.addEventListener('change', selectorEventHandler);

function selectorEventHandler() {
    const countryName = countrySelector.options[countrySelector.selectedIndex].value;
    getCountryStat(countryName);
}

function changeLoaderState(flag) {
    if (flag === true) {
        loader.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        loader.forEach(element => {
            element.style.display = 'none';
        });
    }
}

function changeActiveLoaderState(flag) {
    if (flag === true) {
        activeLoader.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        activeLoader.forEach(element => {
            element.style.display = 'none';
        });
    }
}

function changeDataPlaceholderState(flag) {
    if (flag === true) {
        dataPlaceholders.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        dataPlaceholders.forEach(element => {
            element.style.display = 'none';
        });
    }
}

async function getGlobalStats() {
    changeLoaderState(true);
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setGlobalStats(data);
        getCountryStat('china');
    } catch (error) {
        console.error(error);
    } finally {
        changeLoaderState(false);
        changeDataPlaceholderState(true);
    }
}

async function getAllCountries() {
    try {
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        getAllCountriesNames(data);
    } catch (error) {
        console.error(error);
    }
}

async function getCountryStat(countryName) {
    changeActiveLoaderState(true);
    try {
        const response = await fetch(`${BASE_URL}/c/${countryName}`);
        const data = await response.json();
        setCountryStat(countryName, data);
    } catch {
        console.error(error);
    } finally {
        changeActiveLoaderState(false);
    }
}

function setCountryStat(name, data) {
    console.log(data)
    const capatalize =s =>s.replace(/./, m => m.toUpperCase());
    countryLabel.innerHTML = `Stats for: ${capatalize(name)}`;
    activeCoronavirusCasesNo.innerHTML = data.active_cases || 'Null';
    newCases.innerHTML = data.new_cases || 'Null';
    newDeaths.innerHTML = data.new_deaths || 'Null';
    seriousCritical.innerHTML = data.serious_critical || 'Null';
    totalCases.innerHTML = data.total_cases || 'Null';
    totalDeaths.innerHTML = data.total_deaths || 'Null';
    totalRecovery.innerHTML = data.total_recovered || 'Null';
}

function setGlobalStats(data) {
    coronavirusCasesNo.innerHTML = data.coronavirus_cases;
    coronavirusDeaths.innerHTML = data.deaths;
    globalRecovery.innerHTML = data.recovered;
}

function getAllCountriesNames(data) {
    data.forEach(country => {
        let el = document.createElement('option');
        el.text = Object.keys(country);
        el.value = Object.keys(country);
        countrySelector.appendChild(el);
    });
}

function init() {
    getGlobalStats();
    getAllCountries();
}

init();
