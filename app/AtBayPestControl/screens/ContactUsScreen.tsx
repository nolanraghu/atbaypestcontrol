import * as React from 'react';
import {
    ScrollView,
    Text,
    View, Appearance
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Contact from "../components/Contact";
import {contactUs, contactUsDescription} from "../assets/text/text";

export default function ContactUsScreen () {
    const styles = getStyle(Appearance.getColorScheme());
    return(
        <View style={styles.screen}>
            <View style={[styles.header, {flexWrap: 'wrap'}]}>
                <Text style={[styles.title, {marginBottom: 2}]}>
                    {contactUs()}
                </Text>
                <Text style={[styles.caption, {marginBottom: 0}]}>
                    {contactUsDescription()}
                </Text>
            </View>
          <ScrollView>
                <View style={styles.container}>
                    {Contact(0)}
                    {Contact(1)}
                    {Contact(2)}
                    {Contact(3)}
                    {Contact(4)}
                </View>
          </ScrollView>
        </View>
);

}
