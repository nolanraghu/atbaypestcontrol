import * as React from 'react';
import {Component} from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Appearance,
  useColorScheme,
  ImageBackground,
  Platform,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Email from './Email'
import Payment from './Payment'
import ShippingLocations from "./ShippingLocations";
import Separator from './Separator'

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

const EMAIL = [
  [
    "1",
    "personal",
    "fake.person@gmail.com",
  ],
  [
    "2",
    "work",
    "fake.person2@gmail.com",
  ],
  [
    "3",
    "play",
    "fake.person3@gmail.com",
  ]
]

const PAY = [
    [
        "1",
        "debit",
        "1234 5678 9101 1121"
    ],
    [
        "2",
        "credit",
        "3141 5161 7181 9202",
    ]
]

const LOC = [
    [
        ['1 Real Place', 'New York City', 'New York', '12345'],
    ],
    [
        ['2 Real Place', 'Nashville', 'Tennessee', '678910'],
    ]
]

const PLAN = "Current Plan"

export default function ProfileTabScreen() {


  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderHeader({})}
            {renderEmail()}
            {Separator()}
            {/*<Text style={styles.userCityText}></Text>*/}
            {renderPlan()}
            {Separator()}
            {renderLoc()}
            {Separator()}
            {renderPay()}
          </Card>
        </View>
      </ScrollView>
  )

}

function onPressPlace () {
  console.log('place')
}

function renderHeader ({avatar = require('../assets/images/profile_picture.jpg'), avatarBackground = require('../assets/images/splash.png'),
                         name = 'John Doe', city = 'New York', state = 'New York'}: RenderHProps) {

  console.log(avatar, avatarBackground)

  return (
      <View style={styles.headerContainer}>
        <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={avatarBackground}
        >
          <View style={styles.headerColumn}>
            <Image
                style={styles.userImage}
                source={avatar}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                    name="place"
                    underlayColor="transparent"
                    iconStyle={styles.placeIcon}
                    onPress={onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {state}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
  )
}

interface RenderHProps {
  avatar?: object
  avatarBackground?: object
  name?: string
  city?: string
  state?: string

}

function renderEmail () {

  function onPressEmail () {
    console.log('email')
  }

  let EmailArray = EMAIL.map(function([id, name, email], index) {
    return  <Email
              key={id}
              index={index}
              name={name}
              email={email}
              onPressEmail={onPressEmail}

            />
  })


  return (
      <View style={styles.emailContainer}>
        {EmailArray}
      </View>
  )
}

function renderPlan () {

  function onPressPlan () {
    console.log('email')
  }


  return (
      <View style={styles.emailContainer}>
        <TouchableOpacity onPress={() => onPressPlan()}>
          <View style={[styles.planContainer]}>
            <View style={styles.iconRow}>
              <Icon
                  name= 'payment'
                  underlayColor = 'transparent'
                  iconStyle={styles.Icon}
                  onPress={() => onPressPlan()}
              />
            </View>
            <View style={styles.Row}>
              <Text style={styles.Text}>{PLAN}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
  )
}

function renderPay () {

  function onPressPayment () {
    console.log('payed')
  }

  function onPressEdit () {
    console.log('edit')
  }

  let PayArray = PAY.map(function([id, name, card], index) {
    return  <Payment
        key={id}
        index={index}
        name={name}
        card={card}
        onPressEdit={onPressEdit}
        onPressPayment={onPressPayment}

    />
  })

  return (
      <View style={styles.emailContainer}>
        {PayArray}
      </View>
  )
}

function renderLoc () {

  let LocationArray = LOC.map(function([location], index) {
    return  <ShippingLocations
        key={location[1]}
        index={index}
        location={location}
        onPressPlace={onPressPlace}
    />
  })

  return (
      <View style={styles.emailContainer}>
        {LocationArray}
      </View>
  )
}

const ionColor = Appearance.getColorScheme() === 'dark'? 'white':'black'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  Icon: {
    color: 'gray',
    fontSize: 30,
  },
  Row: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 16,
  },
})
