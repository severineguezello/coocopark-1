import serial
import time
import json

z1baudrate = 38400
z1port = '/dev/cu.usbmodem143301'  # set the correct port before run it

z1serial = serial.Serial(port=z1port, baudrate=z1baudrate)
z1serial.timeout = 2  # set read timeout
# print z1serial  # debug serial.
print(z1serial.is_open)  # True for opened
if z1serial.is_open:
    while True:
        size = z1serial.inWaiting()
        if size:
            data = z1serial.read(size)
            etattt = (str(data).split("'")[1].split("2")[1].split("4"))
            etatt = etattt[1].split("6")
            etat = [etattt[0]]+etatt
            print(etat)
            etats=[]
            for i in range(len(etat)):
                etats.append({'etat_'+str(i+1): etat[i]})
            with open('/Users/matthiasprevost/Desktop/etats.json', 'w') as write_file: # enregistrer dans un fichier .json
                json.dump(etats, write_file, ensure_ascii = False) 

			
        else:
            print('no data')
        time.sleep(2)
else:
    print('z1serial not open')



