#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: tristanboussard
"""

'''
BEGIN
'''

import urllib.request
import json
import time

"""
GENERAL COMMENT FOR THE READER
This little program was created to scan and export in json format the data freely available on the webpage: http://www.brest-park.fr/stationner-dans-un-parking/parkings-et-places-disponibles.
This was done for a POC group project at the engineering school IMT Atlantique on December 2019.
In the context of this project we needed to extract the parking availability data of a few parkings in Brest, France.
We had no API to use as such the code presented here is highly dependent on the html format of the webpage. Modifications of the html format of the page could make this program unusable.
So take the results with a grain of salt.
"""

# Function that returns all the locations of a substring in a string
def locationOfSubstring(string, substring):
    """Return a list of locations of a substring."""
    substringLength = len(substring)    
    def recurse(locationsFound, start):
        location = string.find(substring, start)
        if location != -1:
            return recurse(locationsFound + [location], location + substringLength)
        else:
            return locationsFound
    return recurse([], 0)

# Function used to extract the number of available parking spots in a parking
def availableSpots(string, parkingName):
    """Return a string extracted from the html page about the number of available parking spots."""
    occurrenceParking = locationOfSubstring(string, parkingName)
    occurrenceParking = occurrenceParking[0] # There should be only one element in the list, so we take the first one
    subString1 = string[occurrenceParking:]
    parse1 = locationOfSubstring(subString1, 'disponibilities')
    parse1 = parse1[0] # The first occurrence is the good one
    parse2 = locationOfSubstring(subString1, '</p>')
    parse2 = parse2[0] # The first occurrence is the good one
    subString2 = subString1[parse1 + 17:parse2] # 17 is the length of 'disponibilities">'
    return subString2 # Returns only the string with the information we seek

def main():
    # url request to get the html of the page with the information about Brest'Park parking's availability
    link = "http://www.brest-park.fr/stationner-dans-un-parking/parkings-et-places-disponibles"
    f = urllib.request.urlopen(link)

    fileBytes = f.read()
    fileStr = fileBytes.decode("utf8") # Convert to string
    f.close()
    
    # Save in a txt file
    fileBrestPark = open("fileBrestPark.txt","w+") 
    fileBrestPark.write(fileStr) 
    fileBrestPark.close() 
    
    # Get the available spots
    parkings = ['Parking Coat Ar Gueven', 'Parking Jaurès', 'Parking Liberté', 'Parking Sangnier', 'Parking Gares', 'Parking Château'] # These parkings are the only one we have informations on so they are the one we will use
    freeSpots = []
    parkingsShapedData = []
    
    for i in parkings:
        freeSpots.append(availableSpots(fileStr, i))
    
    # Shape the data
    for i in range(len(parkings)):
        parkingsShapedData.append({'PARKING': parkings[i],
                                   'AVAILABLE_SPOTS': freeSpots[i]})
    
    print(parkingsShapedData)
    
    # Save the data in a json file
    with open('/Users/matthiasprevost/Documents/ReactNative/coocopark/data/free_parking_spots.json', 'w') as write_file: # enregistrer dans un fichier .json
        json.dump(parkingsShapedData, write_file, ensure_ascii = False)
    
if __name__ == "__main__":
    for i in range(60):
        main()
        time.sleep(60)
    

'''
END
'''



















