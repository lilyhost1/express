ECHO OFF
set newline=^& echo.

echo %newline% %newline%
echo ============ Evolv Client - Install ===============
echo %newline% %newline%
echo Waiting for device (if this hangs, you may not have USB debugging enabled) .... %newline%
adb wait-for-device
echo Device found. %newline%

echo Killing any existing running app...
adb shell am force-stop com.evolv.sensor.management.cloud.client

echo Removing any existing applications... %newline%
adb uninstall com.evolv.sensor.management.cloud.client

echo Installing applications .... %newline%
for %%f in (../assemble/cordova/*.apk) do adb install ../assemble/cordova/%%f
echo Application Installed. %newline%

echo === Install Complete ===
exit /b