import requests
from bs4 import BeautifulSoup as bs4
from typing import List, Dict

def get_data():
    response = requests.get('https://www.worldometers.info/coronavirus/')
    return response.text

def get_table_data():
    data: List = []
    soup = bs4(get_data(), 'html.parser')
    table = soup.find('table', id='main_table_countries')
    table_body = table.find('tbody')
    rows = table_body.find_all('tr')
    for row in rows:
        stats: Dict = {}
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        stats[cols[0]] = {
            'total_cases': cols[1],
            'new_cases': cols[2],
            'total_deaths': cols[3],
            'new_deaths': cols[4],
            'total_recovered': cols[5],
            'active_cases': cols[6],
            'serious/critical': cols[7]
        }
        data.append(stats)
    return data

if __name__ == "__main__":
    get_table_data()
