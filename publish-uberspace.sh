# replicate www folder 
ionic build browser
rsync -ruv --stats --progress www/ jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/

# create apk & deploy
git push
ionic cordova build android
#ionic cordova build android --prod --release
rsync -ruv --stats --progress platforms/android/build/outputs/apk/android-armv7-debug.apk jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/android-armv7-debug.apk
#rsync -ruv --stats --progress platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/android-armv7-release-unsigned.apk
#~/scripts/sendMail-apk-ready.sh "https://jrg.deneb.uberspace.de/locosoftPrototype/android-armv7-debug.apk" "https://jrg.deneb.uberspace.de/locosoftPrototype/android-armv7-release-unsigned.apk"  "https://jrg.deneb.uberspace.de/locosoftPrototype/"
~/scripts/sendMail-apk-ready.sh "https://jrg.deneb.uberspace.de/locosoftPrototype/android-armv7-debug.apk" "not available" "https://jrg.deneb.uberspace.de/locosoftPrototype/"
