import {Component, Input, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';


@Component({
	selector : "home",
	host: {"class": "view"},
	templateUrl : "./home.component.html"
})
export class HomeComponent implements OnInit {

	public columns = 4;
	public iconClass = "xxxlarge";

	constructor(private media: ObservableMedia) {
	}

	ngOnInit() {
		this.reflow();
		this.media.asObservable().subscribe(this.reflow);
	}

	private reflow = () => {
		if (this.media.isActive('lt-md')) {
			this.columns = 2;
			this.iconClass = "xxlarge";
		}
		else {
			this.columns = 4;
			this.iconClass = "xxxlarge";
		}
	}

}