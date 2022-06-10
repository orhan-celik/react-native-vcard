# Build Action

cd android
.\gradlew clean
.\gradlew assembleRelease
.\gradlew bundleRelease
cd ..
npx react-native run-android --variant=release
OPEN PROJECT WITH ANDROID STUDIO
Sync Project With gradle files
Go To Build -> Generate Signed Bundle / APK 