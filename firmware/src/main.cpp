#include <Arduino.h>
#include <ESP8266WiFi.h>
 

#define Liquid_Detection_Pin 5     //Output pin on sensor

void setup() {
  Serial.begin(115200);
  pinMode(Liquid_Detection_Pin, INPUT);
}

int last_syringe_status = 0;

void loop() {
  int syringe_status = digitalRead(Liquid_Detection_Pin);
  
  if ((syringe_status == 1) && (last_syringe_status == 0)) {
    Serial.println("Seringa Carregou");
  }
  else if ((syringe_status == 0) && (last_syringe_status == 1)){
    Serial.println("Seringa Descarregou");
  }
  
  last_syringe_status = syringe_status;

  delay(1000);
}
