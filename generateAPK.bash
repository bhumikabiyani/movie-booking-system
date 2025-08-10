# genrate apk in desktop

mkdir -p release
cd android
# ./gradlew clean
./gradlew assembleRelease
cd app/build/outputs/apk/release
mv app-release.apk "../../../../../../release/app-release-$(date +"%Y-%m-%d-%H-%M-%S").apk"
echo "APK generated successfully"
