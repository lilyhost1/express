import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SensorIotJobService} from "evolv-sensor-common/src/ts/sensor-iot-job.service";
import {Sensor, SensorJob, SensorService} from "evolv-sensor-common";
import {NotificationService, Selectable, UtilService} from "evolv-client-platform";
import {filter, map} from "lodash-es";
import {NGXLogger} from "ngx-logger";

@Component({
	selector : "job-request-create-dialog",
	styleUrls : [],
	templateUrl : "./job-request-create-dialog.component.html"
})
export class JobRequestCreateDialogComponent implements OnInit {

	public jobs : SensorJob[];
	public job : SensorJob;
	public sensors : Sensor[];
	public sensorSelections : Selectable<Sensor>[];
	public loading = true;

	constructor(private logger : NGXLogger, private UtilService : UtilService, private dialog : MatDialogRef<JobRequestCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) private data : any, private SensorService : SensorService, private SensorIotJobService : SensorIotJobService, private NotificationService : NotificationService) {

	}

	ngOnInit() {

		this.SensorIotJobService.jobs().subscribe((result : SensorJob[]) => {
			this.jobs = result;
			this.loading = false;
		});

		this.SensorService.sensors().subscribe((result : Sensor[]) => {
			this.sensors = result;
			this.sensorSelections = this.UtilService.asSelections(this.sensors);
			this.loading = false;
		});

	};

	public create = () => {

		const selectedSensorIds = map(filter(this.sensorSelections, {selected : true}), (selection : Selectable<Sensor>) => {
			return selection.item.id;
		});

		let description = "Sensor Job";

		if (this.job.operation === 'SOFTWARE_UPDATE') {
			description = "Software Update - " + this.job.packageName;
		}
		else if (this.job.operation === 'DATA_EXTRACT') {
			description = "Data Extract - " + this.job.operationQualifier;
		}

		if (!this.job || selectedSensorIds.length === 0 || !description || description.length === 0) {
			this.NotificationService.message("Job Error", "You must select a job and sensors.", "WARN");
			return;
		}

		this.loading = true;

		this.SensorIotJobService.jobRequestCreate(selectedSensorIds, this.job, description).subscribe((result : any) => {
			this.loading = false;
			this.NotificationService.message("Job Created", "New job has been created and sent to sensors.", "INFO");
			this.dialog.close();
		}, (error : any) => {
			this.logger.error("Failed to create job request", error);
			this.loading = false;
			this.NotificationService.message("Job Error", "Unable to create sensor job.", "WARN");
		});

	}

}
