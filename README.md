#  novel_covid-19_tracker
A basic api & client for tracking developing cases and other stats of the new new coronavirus (COVID-19, SARS-CoV-2).

| Contributions are welcome, fork away.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ff996e81-c4a8-43ec-8c90-0dc492dcd2de/deploy-status)](https://app.netlify.com/sites/covd/deploys)

## Endpoints
Base Url is [https://novelcovid-19-tracker.herokuapp.com/](https://novelcovid-19-tracker.herokuapp.com/).

- ```GET /```  This gives you global stats about the COVID-19 cases. ```{"coronavirus_cases":"189,669 ","deaths":"7,513","recovered":"80,874"}```

- ```GET /all``` Returns a JSON array with the data (stats) for all the countires that are currently affected by COVID-19.

- ```GET /c/<country_name>``` e.g ```/c/china``` will return stats for china, sample data ```{"active_cases":"8,940","new_cases":"+21","new_deaths":"+13","serious/critical":"3,226","total_cases":"80,881","total_deaths":"3,226","total_recovered":"68,715"}```

## Data Sources
- [Worldometer](https://www.worldometers.info/coronavirus/)

## Term of Use
The data is available to the public. Reliance on the Website for medical guidance or use of the Website in commercial is strictly prohibited.
