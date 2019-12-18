#include <SoftwareSerial.h>



int etat=0;

void setup() {
  Serial.begin(38400);
  
}

void loop() {
  if(Serial.available()){
    etat=char(Serial.read());
    Serial.print(etat);
  }
  
}
