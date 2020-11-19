import * as React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  ScrollView,
  useColorScheme,
  ImageBackground,
  Image,
  TouchableOpacity,
    Text,
    View
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from '../components/RenderEmail'
import Payment from '../components/RenderPayment'
import ShippingLocations from '../components/RenderShippingLocations';
import Separator from '../components/Separator'
import {EMAIL, LOC, PAY, PLAN} from "../assets/Data/Data";
import { useNavigation } from '@react-navigation/native';
import PlanTabScreen from "./PlanTabScreen";
import {getUser} from "../assets/Data/Data";

//TODO: make editable, have a situation for no user yet

let User = getUser();

export default function ProfileTabScreen() {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderHeader({})}
            {renderEmail()}
            {Separator()}
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

function renderHeader ({avatar = User.getProfilePic(), avatarBackground = User.getBackgroundPic(),
                         name = User.getUserName(), city = User.getDefaultAddress().city,
                         state = User.getDefaultAddress().state}: RenderHProps) {

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

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

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

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
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  function onPressPlan () {
    navigation.navigate("PlanTabScreen")
  }

  return (
      <View style={styles.emailContainer}>
        <TouchableOpacity onPress={() => onPressPlan()}>
          <View style={styles.planContainer}>
            <View style={styles.iconRow}>
              <Icon
                  name= 'ios-paper'
                  type= 'ionicon'
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

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

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

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

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

