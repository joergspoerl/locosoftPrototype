# replicate www folder 
ionic build browser
rsync -ruv --stats --progress www/ jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/

# create apk & deploy
git push
ionic cordova build android
ionic cordova build android --prod --release
rsync -ruv --stats --progress platforms/android/build/outputs/apk/android-armv7-debug.apk jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/android-armv7-debug.apk
rsync -ruv --stats --progress platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/android-armv7-release-unsigned.apk
~/scripts/sendMail-apk-ready.sh "http://jrg.deneb.uberspace.de/locosoftPrototype/android-armv7-debug.apk" "http://jrg.deneb.uberspace.de/locosoftPrototype/android-armv7-release-unsigned.apk"
