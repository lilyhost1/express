import {Component} from "@angular/core";

@Component({
	selector : "layout",
	host: {"class": "flex layout-fill layout-column"},
	templateUrl : "./layout.component.html"
})
export class LayoutComponent {
	constructor() {
	}

}
