#!/usr/bin/env bash
CUR_COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock`
ENV_COCOAPODS_VER=`pod --version`

# check if not the same version, reinstall cocoapods version to current project's
if [ $CUR_COCOAPODS_VER != $ENV_COCOAPODS_VER ];
then
    echo "Uninstalling all CocoaPods versions"
    sudo gem uninstall cocoapods --all --executables
    echo "Installing CocoaPods version $CUR_COCOAPODS_VER"
    sudo gem install cocoapods -v $CUR_COCOAPODS_VER
else 
    echo "CocoaPods version is suitable for the project"
fi;

# Function to copy the appropriate Firebase configuration files
copy_firebase_config() {
    if [ "$1" == "master" ]; 
    then
        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-info-prod.plist GoogleService-info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/app/google-service-prod.json google-service.json
    else
        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-info-dev.plist GoogleService-info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/app/google-service-dev.json google-service.json
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

printf "\nFirebase configuration files used: GoogleService-info.plist and google-service.json\n"

