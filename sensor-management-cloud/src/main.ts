import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./ts/app.module";
import {environment} from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

const bootstrap = () => {
	platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
};

// http://stackoverflow.com/questions/21556090/cordova-angularjs-device-ready
if (window["cordova"]) {
	console.info("Running in Cordova, will bootstrap Angular once 'device ready' event fires.");
	document.addEventListener("deviceready", () => {
		console.info("Device ready event has fired, bootstrapping Angular.");
		bootstrap();
	}, false);
}
else {
	console.info("Running in browser, bootstrapping Angular now.");
	bootstrap();
}
