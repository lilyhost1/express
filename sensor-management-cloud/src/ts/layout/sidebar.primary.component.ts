import {Component, Input, OnInit} from "@angular/core";
import {MatSidenav} from '@angular/material/sidenav';

@Component({
	selector : "sidebar-primary",
	templateUrl : "./sidebar.primary.component.html"
})
export class SidebarPrimaryComponent implements OnInit{

	@Input("sidenav") public sidenav : MatSidenav;
	constructor() {
	}

	ngOnInit() {
		
	}

	//clearing storage of cognito detailsafter user clicks signout 
	public clearStorage = () => {
		window.localStorage.clear();
    }
}

