import {Component, OnInit} from '@angular/core';
import {Sensor, SensorJob, SensorJobRequest, SensorService} from "evolv-sensor-common";
import {NotificationService,UaaAuthService} from "evolv-client-platform";
import {SensorIotJobService} from "evolv-sensor-common/src/ts/sensor-iot-job.service";
import {MatDialog} from "@angular/material";
import {JobRequestCreateDialogComponent} from "./job-request-create-dialog.component";

@Component({
	selector : "jobs",
	host : {"class" : "view"},
	templateUrl : "./jobs.component.html"
})
export class JobsComponent implements OnInit {

	public jobs : SensorJobRequest[];
	public loading = true;
	public sensors : Sensor[];

	constructor(private SensorIotJobService : SensorIotJobService, private SensorService : SensorService, private NotificationService : NotificationService, private dialog : MatDialog, private UaaAuthService : UaaAuthService) {

	}

	ngOnInit() {

		this.loading = true;

		// Get the sensors 1 time for all... otherwise they compete and duplicate getting the things when sensor list is shown
		this.SensorService.sensors().subscribe((sensors : Sensor[]) => {
			this.sensors = sensors;
		});

		this.SensorIotJobService.jobRequests().subscribe((jobs : SensorJobRequest[]) => {
			this.jobs = jobs;
			//console.info("sorted", sortBy(jobs, "created").reverse());

			this.loading = false;
		}, () => {
			this.loading = false;
			this.NotificationService.message("Error", "Unable to load sensor jobs.", "WARN");
		});

		this.SensorIotJobService.jobs().subscribe((jobs : SensorJob[]) => {
		}, () => {

		});
	}

	create = () => {

		this.dialog.open(JobRequestCreateDialogComponent, {
			data : {

			},
			//height : '400px',
			width : '75%'
		}).afterClosed().subscribe(() => {
			// Re-init in case they created a new job
			this.ngOnInit();
		});



	}
	public Manageable = () : boolean => {
		return this.UaaAuthService.isAdmin();
	}
}
