import * as React from 'react';
import * as FileSystem from 'expo-file-system';

const profilePath = "../profile/profile.txt";
export default function getCurrentPlan(){
    try {
        let status;
        FileSystem.getInfoAsync(profilePath)
                .then((value => status = (value)));
        if(status){
            let profile = {};
            FileSystem.readAsStringAsync(profilePath)
                .then((value => {profile = JSON.parse(value)}));
            return profile;
        } else {
            throw "Profile not found";
        }
    } catch (e) {
        console.log(e+" occured at getCurrentPath");
    }
};
