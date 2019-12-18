#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Dec 13 16:54:11 2019

@author: matthiasprevost
"""

from flask import Flask
from flask_restplus import Resource, Api 
import json
import serial
import time

## with open('/Users/matthiasprevost/Desktop/free_parking_spots.json') as json_data:
  #  data = json.load(json_data)
  #  print(data[0]['AVAILABLE_SPOTS'])

app = Flask(__name__)
api = Api(app=app)

        
@api.route("/article/<int:id>")
class Article(Resource):
    def get(self, id):
        # TODO
        # Retourner un article

        if id==1 :
            with open('/Users/matthiasprevost/Desktop/free_parking_spots.json') as json_data:
                data = json.load(json_data)
            return data
        if id==2 :
            with open('/Users/matthiasprevost/Desktop/etats.json') as json_etats:
                etats = json.load(json_etats)
            return etats
        return f"wait"
    def put(self, id):
        # TODO
        # Editer un article
        return f"L'article {id} a été modifié"
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)
    
    
    
    
# id=0 : Parking Coat Ar Gueven
# id=1 : Parking Jaurès
# id=2 : Parking Liberté
# id = 3 : Parking Sangnier
# id = 4 : Parking Gares
# id = 5 : Parking Château
    
    
# Jaurès = 1
# Liberté = 2
# Coat-Ar-Gueven = 21
# Enclos Gares = 19
# Enclos Sangnier = 18
# Enclos Château = 17