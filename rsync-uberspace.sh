# replicate www folder 
ionic build browser
rsync -ruv --stats --progress www/ jrg@deneb.uberspace.de:/home/jrg/html/locosoftPrototype/

# create apk & deploy
git push
ionic cordova build android
rsync -ruv --stats --progress platforms/android/build/outputs/apk/android-armv7-debug.apk jrg@deneb.uberspace.de:/home/jrg/html/mw/android-armv7-debug.apk
~/scripts/sendMail-apk-ready.sh
