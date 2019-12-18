#include <SoftwareSerial.h>



int state = 0;

void setup() {
  Serial.begin(38400);
}

void loop() {
  if (state==0){
    Serial.write('1');
    state=1;
    delay(1000);
    }
  if (state==1){
    Serial.write('0');
    state=0;
    delay(1000);
  }
    
}
