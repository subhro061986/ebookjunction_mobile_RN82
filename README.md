#### BUILD RELEASE VERSION ####

implementation 'com.github.mhiew:android-pdf-viewer:3.2.0-beta.1' is added in "E:\React Native Project\ebookmobile\node_modules\react-native-view-pdf\android\build.gradle"

# BUILD KEYSTORE / JKS FILE
1. keytool -genkey -alias ebook_alias -keyalg RSA -keystore ebook.jks
run this command in your cmd

keytool -genkey -v -keystore ebookmobile.keystore -alias ebookmobile_alias -keyalg RSA -keysize 2048 -validity 365000

1.keytool -list -v -keystore ebookmobile.keystore

2. Put keystore file to project name\android\app\ in this path
3.  i) keystore file name - ebookmobile.keystore
    ii) Store Password -ebook2024
    iii) Key Alias / Alias Name - ebookmobile_alias
    iv) Key Password - ebook2024

# KEYSTORE DETAILS WITH SIGNATURE
1.keytool -list -v -keystore keystore.jks

2. Put keystore file to project name\android\app\ in this path
3.  i) keystore file name - ebook.jks
    ii) Store Password -ebook2024
    iii) Key Alias / Alias Name - ebook_alias
    iv) Key Password - ebook2024

4. open react-native\android\app\ build.gradle file and add the keystore configuration.
    add these configuration 

    android {
....
  signingConfigs {
    release {
      storeFile file('your_key_name.keystore')
      storePassword 'your_key_store_password'
      keyAlias 'your_key_alias'
      keyPassword 'your_key_file_alias_password'
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}

5. npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

6. react-native\android\app\src\main\res in this location need to remove 
drawable-hdpi,drawable-mdpi,drawable-xhdpi,drawable-xxhdpi,drawable-xxxhdpi these folder

7. cd android in terminal

8. ./gradlew bundleRelease in terminal
    ./gradlew assembleRelease (for Release APK)
    ./gradlew assembleDebug (for Debug APK)

9. As a result, the APK creation process is done. You can find the generated APK at react-native\android\app\build\outputs\bundle\release\app-release.aab

10. Company Name:  SOUTHSHORE INNOVATIONS PRIVATE LIMITED
Duns Number:  73-866-0763

email: projects@southshore.in
password: Manasvini16!


<!-- Alias name: ebook_alias
Creation date: 18-Apr-2024
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Ebook Junction, OU=ebookjunction, O=ebookjunction, L=Perungudi, ST=Chennai, C=IN
Issuer: CN=Ebook Junction, OU=ebookjunction, O=ebookjunction, L=Perungudi, ST=Chennai, C=IN
Serial number: 3c59edf67c8c343
Valid from: Thu Apr 18 22:57:48 IST 2024 until: Wed Jul 17 22:57:48 IST 2024
Certificate fingerprints:
         SHA1: 80:D7:99:EB:E9:68:9E:F0:92:90:8A:3B:12:41:89:AE:EF:75:E1:03
         SHA256: 68:13:DE:E8:0E:55:FA:28:CC:69:50:79:D8:DC:B0:66:30:7A:0E:E8:59:BC:45:BD:AD:AE:80:85:ED:47:85:AF
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions:

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 4A 90 60 DF 14 F0 09 14   D8 7A FE 09 96 2E D1 95  J.`......z......
0010: 19 1E B4 92                                        ....
]
] -->

Southshore Innovations




