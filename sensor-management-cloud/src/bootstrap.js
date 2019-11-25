// This is the default bootstrap for web-only.  It is overwritten by the cordova build...

var clientBootstrap = {
	prefix : "sensor-operator",
	connector: {
		port : "8000",
		protocol : "http",
		context : "/Evolv/sensor-management/1.0.0",
		host: "localhost",
		version : {
			version : "1.0.0-SNAPSHOT",
			build : "DEVELOPMENT"
		}
	}
};
