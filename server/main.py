#!flask/bin/python
from typing import List
from flask import Flask, jsonify, abort, make_response
from utils import get_global_stats, get_table_data

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify(get_global_stats())

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({ 'ping': 'pong' })

@app.route('/all', methods=['GET'])
def get_all_stats():
    return jsonify(get_table_data())

@app.route('/c/<country_name>', methods=['GET'])
def get_country_stats(country_name: str):
    country_name = country_name.strip().capitalize()
    data: List = get_table_data()
    for stat in data:
        try:
            if stat[country_name]:
                return jsonify(stat[country_name])
        except KeyError as i:
            abort(404)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({ 'error': 'Not found' }), 404)

if __name__ == '__main__':
    app.run(debug=True)