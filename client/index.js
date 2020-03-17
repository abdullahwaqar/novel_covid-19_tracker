const BASE_URL = 'https://novelcovid-19-tracker.herokuapp.com/';

async function getGlobalStats() {
    try {
        const response = await fetch(BASE_URL);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}