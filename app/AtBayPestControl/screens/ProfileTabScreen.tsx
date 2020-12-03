import * as React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  ScrollView,
  useColorScheme,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  View, Pressable
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from '../components/RenderEmail'
import Payment from '../components/RenderPayment'
import ShippingLocations from '../components/RenderShippingLocations';
import Separator from '../components/Separator'
import {PLAN} from "../assets/Data/Data";
import { useNavigation } from '@react-navigation/native';
import PlanTabScreen from "./PlanTabScreen";
import LoginScreen from "./LoginScreen";
import {getUser} from "../assets/Data/Data";
import {deleteProfile} from "../assets/text/text";
import {changePlan, LOG_OUT, logOut} from "../redux/action";
import {useDispatch} from "react-redux";
import images from "../assets/images";
import {NavigationActions} from "react-navigation";



//TODO: make editable, have a situation for no user yet

let User = getUser();

export default function ProfileTabScreen({route, navigation}: any) {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderHeader({})}
            {renderEmail()}
            {renderPlan()}
            {renderLoc()}
            {renderPay()}
            {renderDeleteButton()}
          </Card>
        </View>
      </ScrollView>
  )

}

function onPressPlace () {
  console.log('place')
}

function renderHeader ({avatar = User.getProfilePic(), avatarBackground = User.getBackgroundPic(),
                         name = User.getUserName(), city = User.getLatestAddress().city,
                         state = User.getLatestAddress().state}: RenderHProps) {

  const scheme = useColorScheme();
  let styles = getStyle(scheme);
  const navigation = useNavigation();

  console.log(avatar, avatarBackground)

  return (
      <View>
        <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={avatarBackground}
        >
          <Icon name='info' underlayColor={'transparent'} style={styles.contactUs}
                onPress={()=>{navigation.navigate("ContactUsScreen")}}
          />
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
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  function onPressEmail () {
    navigation.navigate('EditProfileScreen');
  }

  let EmailArray = User.getEmails().map(function(email, index) {
    return  <Email
              key={email.getType()}
              index={index}
              email={email}
              onPressEmail={onPressEmail}
            />
  })

  if (User.getEmails().length != 0) {
    return (
        <View style={styles.emailContainer}>
          {EmailArray}
          {Separator()}
        </View>
    )
  } else return
}

function renderPlan () {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  function onPressPlan () {
    navigation.navigate('EditProfileScreen');
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
              <Text style={styles.Text}>{"Go to Current Plan"}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {Separator()}
      </View>
  )
}

function renderPay () {
  const navigation = useNavigation();

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  function onPressPayment () {
    console.log('payed')
  }

  function onPressEdit () {
    navigation.navigate('PlanTabScreen');
  }

  let PayArray = User.getPayments().map(function(payment, index) {
    return  <Payment
        key={payment.getCardNumber().substr(payment.getCardNumber().length-4)}
        payment={payment}
        index={index}
        onPressEdit={onPressEdit}
        onPressPayment={onPressPayment}

    />
  })

  if (User.getPayments().length != 0) {
    return (
        <View style={styles.emailContainer}>
          {PayArray}
          {Separator()}
        </View>
    )
  } else return
}

function renderLoc () {

  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  let LocationArray = User.getAddresses().map(function(address, index) {
    return  <ShippingLocations
        key={address.getAddress()}
        index={index}
        address={address}
        onPressPlace={onPressPlace}
    />
  })

  if (User.getAddresses().length != 0){
    return (
        <View style={styles.emailContainer}>
          {LocationArray}
          {Separator()}
        </View>
    )
  } else return
}

function renderDeleteButton () {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);
  const dispatch = useDispatch();
  let myRed = styles.deleteProfile.borderColor;

  let deleteButton =
      <Pressable onPress={() => {getUser().delete(); dispatch(changePlan()); dispatch(logOut())}}>
        <Text style ={[styles.Text, {color: myRed, fontWeight:"bold"}]}>
          {deleteProfile()}
        </Text>
      </Pressable>;

  return (
      <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
        <View style={styles.deleteProfile}>
          {deleteButton}
        </View>
      </View>
  )
}

