const BASE_URL = 'https://novelcovid-19-tracker.herokuapp.com/';

const loader = document.querySelectorAll('#loader');
const dataPlaceholders = document.querySelectorAll('#global-data');

const coronavirusCasesNo = document.getElementById('coronavirus-cases-no');
const coronavirusDeaths = document.getElementById('global-deaths');
const globalRecovery = document.getElementById('global-recovery');

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
    } catch (error) {
        console.error(error);
    } finally {
        changeLoaderState(false);
        changeDataPlaceholderState(true);
    }
}

function setGlobalStats(data) {
    console.log(data)
    coronavirusCasesNo.innerHTML = data.coronavirus_cases;
    coronavirusDeaths.innerHTML = data.deaths;
    globalRecovery.innerHTML = data.recovered;
}

function init() {
    getGlobalStats();
}

init();
