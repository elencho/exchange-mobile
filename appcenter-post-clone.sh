#!/usr/bin/env bash
system_profiler SPHardwareDataType

CUR_COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock`
ENV_COCOAPODS_VER=`pod --version`

# check if not the same version, reinstall cocoapods version to current project's
echo "current env cocoapods version $ENV_COCOAPODS_VER"
if [ $CUR_COCOAPODS_VER != $ENV_COCOAPODS_VER ];
then
    echo "Uninstalling all CocoaPods versions"
    sudo gem uninstall cocoapods -aIx
    echo "Installing CocoaPods version $CUR_COCOAPODS_VER"
    sudo gem install cocoapods -v $CUR_COCOAPODS_VER
else 
    echo "CocoaPods version is suitable for the project"
fi;

# Function to copy the appropriate Firebase configuration files
copy_firebase_config() {
    if [ "$1" == "master" ]; 
    then
    # for firebase
        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info-prod.plist $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/app/google-services-prod.json $APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
      # for network
        cp $APPCENTER_SOURCE_DIRECTORY/android/app/src/main/res/xml/network_security_config_prod.xml $APPCENTER_SOURCE_DIRECTORY/android/app/src/main/res/xml/network_security_config.xml
    else
        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info-dev.plist $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/app/google-services-dev.json $APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
    fi
}

# Get the current branch name from the environment variable APPCENTER_BRANCH
branch="$APPCENTER_BRANCH"

# Check if the branch name is empty (in case APPCENTER_BRANCH is not set)
if [ -z "$branch" ]; then
    echo "APPCENTER_BRANCH is not set. Exiting."
    exit 1
fi

# Call the function to copy the appropriate Firebase configuration files
copy_firebase_config "$branch"

# Display a message indicating which .env and Firebase configuration files are used
cat $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info.plist
cat $APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
printf "\nFirebase configuration files used: GoogleService-info.plist and google-service.json\n"
cat $APPCENTER_SOURCE_DIRECTORY/android/app/src/main/res/xml/network_security_config.xml
printf "\network xml used\n"


