import {Sensor, SensorService} from "evolv-sensor-common";
import {Component, Input, OnInit} from '@angular/core';
import {find} from "lodash-es";

@Component({
	selector : "sensor-reference",
	template : "<div *ngIf=\"sensor\" class=\"sensor-reference\" [routerLink]=\"['/sensors', sensor.id]\">{{sensor.name}}</div>"
})
export class SensorReferenceComponent implements OnInit {

	@Input("sensorId") sensorId : string;
	@Input("sensors") sensors : Sensor[];
	public sensor : Sensor;

	constructor(private SensorService : SensorService) {

	}

	ngOnInit() {
		this.sensor = find(this.sensors, {id : this.sensorId});
	}

}
