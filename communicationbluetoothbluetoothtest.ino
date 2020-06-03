
#include <ArduinoJson.h>
#include <SoftwareSerial.h>




/* Example code for HC-SR04 ultrasonic distance sensor with Arduino. No library required. More info: https://www.makerguides.com */
// Define Trig and Echo pin:
#define trigPin1 A2
#define echoPin1 A3

#define trigPin2 4
#define echoPin2 5

#define trigPin3 6
#define echoPin3 7
// Define variables:
long duration1;
int distance1;
bool etat1;

long duration2;
int distance2;
bool etat2;


long duration3;
int distance3;
bool etat3;

int redPin1 = 8;
int greenPin1 = 9;

int redPin2 = 10;
int greenPin2 = 11;

int redPin3 = 12;
int greenPin3 = 13;

StaticJsonDocument<200> doc;

void setup() {
  // Define inputs and outputs:
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  //Begin Serial communication at a baudrate of 9600:
  Serial.begin(9600);

  pinMode(redPin1, OUTPUT);
  pinMode(greenPin1, OUTPUT);


  pinMode(redPin2, OUTPUT);
  pinMode(greenPin2, OUTPUT);

  pinMode(redPin3, OUTPUT);
  pinMode(greenPin3, OUTPUT);
  Serial.begin(38400);
}
void loop() {
  
  // Clear the trigPin by setting it LOW:
  digitalWrite(trigPin2, LOW);

  delayMicroseconds(5);
  // Trigger the sensor by setting the trigPin high for 10 microseconds:
  digitalWrite(trigPin2, HIGH);

  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);

  // Read the echoPin, pulseIn() returns the duration (length of the pulse) in microseconds:
  duration2 = pulseIn(echoPin2, HIGH);

  // Calculate the distance:
  distance2= duration2*0.034/2.0;

  // Print the distance on the Serial Monitor (Ctrl+Shift+M):
  //Serial.print("Distance = ");
  //Serial.print(distance2);
  //Serial.println(" cm");

  delay(100);

  digitalWrite(trigPin1, LOW);

  delayMicroseconds(5);
  // Trigger the sensor by setting the trigPin high for 10 microseconds:
  digitalWrite(trigPin1, HIGH);

  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);

  // Read the echoPin, pulseIn() returns the duration (length of the pulse) in microseconds:
  duration1 = pulseIn(echoPin1, HIGH);

  // Calculate the distance:
  distance1= duration1*0.034/2.0;

  //Serial.print("Distance1 = ");
  //Serial.print(distance1);
  //Serial.println(" cm");
  
  delay(100);

    // Clear the trigPin by setting it LOW:
  digitalWrite(trigPin3, LOW);

  delayMicroseconds(5);
  // Trigger the sensor by setting the trigPin high for 10 microseconds:
  digitalWrite(trigPin3, HIGH);

  delayMicroseconds(10);
  digitalWrite(trigPin3, LOW);

  // Read the echoPin, pulseIn() returns the duration (length of the pulse) in microseconds:
  duration3 = pulseIn(echoPin3, HIGH);

  // Calculate the distance:
  distance3= duration3*0.034/2.0;

  // Print the distance on the Serial Monitor (Ctrl+Shift+M):
  //Serial.print("Distance3 = ");
  //Serial.print(distance3);
  //Serial.println(" cm");

  delay(50);
  
  if (distance1>20){
        digitalWrite(redPin1,HIGH);
        digitalWrite(greenPin1,LOW);
        etat1 = 0;
      }
      else {
        digitalWrite(redPin1,LOW);
        digitalWrite(greenPin1,HIGH);
        etat1 = 1;
      }

   if (distance2<20){
        digitalWrite(redPin2,LOW);
        digitalWrite(greenPin2,HIGH);
        etat3 = 1;
      }
      else {
        digitalWrite(redPin2,HIGH);
        digitalWrite(greenPin2,LOW);
        etat3 = 0;
      }
  if (distance3>20){
        digitalWrite(redPin3,HIGH);
        digitalWrite(greenPin3,LOW);
        etat2 = 0;
      }
      else {
        digitalWrite(redPin3,LOW);
        digitalWrite(greenPin3,HIGH);
        etat2 = 1;
      }
  Serial.write(2);
  Serial.write(etat1);
  delay(10);
  Serial.write(4);
  Serial.write(etat2);
  delay(10);
  Serial.write(6);
  Serial.write(etat3);
  delay(100); 
  //Serial.println(etat1);
  //Serial.println(etat2);
  //Serial.println(etat3);

}
