#!/usr/bin/env bash

# Example: Change bundle name of an iOS app for non-production

cd $APPCENTER_SOURCE_DIRECTORY && cd ios && rm -rf Pods && pod cache clean --all && pod update && cd ..

#!/usr/bin/env bash

# Function to copy the appropriate Firebase configuration files
copy_firebase_config() {
    if [ "$1" == "master" ]; then

        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-info-prod.plist GoogleService-info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/google-service-prod.json google-service.json
    else
   
        cp $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-info-dev.plist GoogleService-info.plist
        cp $APPCENTER_SOURCE_DIRECTORY/android/google-service-dev.json google-service.json
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
