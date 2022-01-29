import { Component } from '@angular/core';
import {Paho} from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  syringeStatus!: String;

  private client!: Paho.MQTT.Client;

  mqttbroker = 'broker.mqttdashboard.com';

  ngOnInit() {
    this.client = new Paho.MQTT.Client(this.mqttbroker, Number(8000),'clientId-P5cuDTnxOk');
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({onSuccess: this.onConnect.bind(this)});
  }

  onConnect() {
    console.log('onConnect');
    this.client.subscribe('logvacinas/syringe_status', {});
  }

  onConnectionLost(responseObject: { errorCode: number; errorMessage: string; }) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onMessageArrived(message: { destinationName: string | string[]; payloadString: string | String; }) {
    console.log('onMessageArrived: ' + message.destinationName + ': ' + message.payloadString);

    // if (message.destinationName.indexOf('wind_speed') !== -1) {
    //   this.windSpeed = Number(message.payloadString);
    // }

    if (message.destinationName.indexOf('syringe_status') !== -1) {
      this.syringeStatus = (message.payloadString);
    }

  }
}
