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
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Email from './Email'
import Separator from './Separator'

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

const EMAIL = [
  {
    id: 1,
    name: 'personal',
    email: 'fake.person@gmail.com',
  },
  {
    id: 2,
    name: 'work',
    email: 'fake.person2@gmail.com',
  },
  {
    id: 3,
    name: 'play',
    email: 'fake.person3@gmail.com',
  }
]

export default function ProfileTabScreen() {


  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderHeader({})}
            {renderEmail()}
            {Separator()}
          </Card>
        </View>
      </ScrollView>
  )

}

function renderHeader ({avatar = require('../assets/images/profile_picture.jpg'), avatarBackground = require('../assets/images/splash.png'),
                         name = 'John Doe', city = 'New York', state = 'New York'}: RenderHProps) {

  console.log(avatar, avatarBackground)
  function onPressPlace () {
    console.log('place')
  }

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
    console.log('place')
  }

  return (
    <FlatList
        contentContainerStyle={styles.emailContainer}
        data={EMAIL}
        renderItem={(list) => {
          const { email, id, name } = list.item

          return (
              <Email
                  key={`email-${id}`}
                  index={list.index}
                  name={name}
                  email={email}
                  onPressEmail={onPressEmail}
              />
          )
        }}
    />
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
})
