import {NgModule} from "@angular/core";
import {
	ClientModule,
	PlatformAppComponent,
	PlatformAppModule,
	PlatformCommonModule,
	PlatformDependencyModule,
	UaaAuthGuard,
	UaaModule,
	UaaUnAuthGuard,
	WindowService,
	UaaAuthPasswordResetComponent,
} from "evolv-client-platform";
import {UaaAuthCognitoModule} from "evolv-client-platform/src/ts/uaa/uaa-auth-cognito.module";
import {HomeComponent} from "./home/home.component";
import {WelcomeComponent} from "./home/welcome.component";
import {HeaderComponent} from "./layout/header.component";
import {SidebarPrimaryComponent} from "./layout/sidebar.primary.component";
import {LayoutComponent} from "./layout/layout.component";
import {SensorComponent, SensorManagementModule, SensorsComponent} from "evolv-sensor-management";
import {SensorIotModule} from "evolv-sensor-common/src/ts/sensor-iot.module";
import {JobsComponent} from "./jobs/jobs.component";
import {SensorReferenceComponent} from "./jobs/sensor-reference.component";
import {JobRequestCreateDialogComponent} from "./jobs/job-request-create-dialog.component";
import {Location} from '@angular/common';
import {Route, Router, RouterModule} from '@angular/router';

// NOTE : Angular 6 is not ready yet for proper lazy loaded children with AOT.
// To get things to work we will simply define all routes directly
const routes : Route[] = [
	{path : "", redirectTo : "/welcome", pathMatch : "full"},
	{path : "welcome", component : WelcomeComponent, canActivate : [UaaUnAuthGuard]},
	{path : "uaa/password/reset", component : UaaAuthPasswordResetComponent, canActivate : [UaaUnAuthGuard]},
	{
		path : "", component : LayoutComponent, canActivate : [UaaAuthGuard],
		children : [
			{path : "home", component : HomeComponent},
			{path : "sensors", component : SensorsComponent},
			{path : "sensors/:sensorId", component : SensorComponent},
			{path : "jobs", component : JobsComponent},
		]
	}
];

@NgModule({
	imports : [
		PlatformDependencyModule,
		PlatformAppModule.forRoot(),
		PlatformCommonModule.forRoot(),
		ClientModule.forRoot(),
		PlatformCommonModule.forRoot(),
		UaaModule.forRoot(),
		UaaAuthCognitoModule.forRoot(),
		SensorIotModule.forRoot(),
		SensorManagementModule.forRoot(),

		// NOTE : Intentionally at the bottom otherwise our hash config ignored
		RouterModule.forRoot(routes, {useHash : true, enableTracing : false})
	],
	entryComponents : [
		JobRequestCreateDialogComponent
	],
	declarations : [
		PlatformAppComponent,
		LayoutComponent,
		HomeComponent,
		WelcomeComponent,
		HeaderComponent,
		SidebarPrimaryComponent,
		JobsComponent,
		SensorReferenceComponent,
		JobRequestCreateDialogComponent
	],
	providers : [
		{provide : "storageNamespace", useValue : "sensor-operator"},
		{provide : "sensorStatePrimary", useValue : "stateDesired"}
	],
	bootstrap : [PlatformAppComponent]
})
export class AppModule {

	constructor(private location : Location, private router : Router, private window : WindowService) {
	}

}
