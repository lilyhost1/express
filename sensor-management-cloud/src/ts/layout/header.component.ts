import {Component, Input, AfterViewInit, OnInit} from "@angular/core";
import {MatSidenav} from '@angular/material/sidenav';
import { UaaAuthService, StorageService } from "evolv-client-platform";

@Component({
	selector : "header",
	templateUrl : "./header.component.html"
})
export class HeaderComponent implements OnInit, AfterViewInit {
	title = 'Evolv Dashboard';
    sensorUser: any;
	@Input("sidenav") public sidenav : MatSidenav;

	constructor(private uaaAuthService: UaaAuthService,private storageService: StorageService) {
	}

	ngOnInit() {
		this.sensorUser = this.storageService.get('USER_NAME');
		if(this.sensorUser !== undefined) {
			this.title = this.title + " (BETA)" + ' - ' + this.sensorUser;
		}
	}
	
	ngAfterViewInit() {
	}

}
