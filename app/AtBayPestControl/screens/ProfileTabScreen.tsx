import * as React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from '../components/RenderEmail'
import Payment from '../components/RenderPayment'
import ShippingLocations from '../components/RenderShippingLocations';
import { useNavigation } from '@react-navigation/native';
import PlanTabScreen from "./PlanTabScreen";
import {getUser} from "../assets/Data/Data";
import {planText} from "../assets/text/text";
import {changePlan, logOut} from "../redux/action";
import {useDispatch, useSelector} from "react-redux";
import AddPayment from "../components/addPayment";
import {RootState} from "../redux/store";
import profileComponent from "../components/profileComponent";

export default function ProfileTabScreen() {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  let User = getUser();

  let keys = 0;

  // This makes the screen rerender if hasPayment might have changed
  useSelector((state:RootState) => state.hasPaymentVersion);
  useSelector((state:RootState) => state.profileVersion);

  const dispatch = useDispatch();
  const navigation = useNavigation();

    function contactUsLogOut(){

        return(
            <View style={{paddingHorizontal: 30,
                paddingVertical: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <Text style={styles.link} onPress={()=>{navigation.navigate("ContactUsScreen")}}>Contact Us</Text>
                <Text style={[styles.captionFade, {fontSize: 30, paddingBottom: 18}]}>.</Text>
                <Text style={styles.link} onPress={()=>{
                    dispatch(changePlan());
                    dispatch(logOut())
                    getUser().delete();
                }}>Log Out</Text>
            </View>
        )
    }

    function renderUserPassword(){
        let codedPass = '*'.repeat(User.getPassword().length);
        return(
            profileComponent('account-circle', User.getUserName(), codedPass)
        )
    }

    function renderEmail () {

        function onPressEdit () {
            navigation.navigate('EditEmails');
        }

        let EmailArray = User.getEmails().map(function(email, index) {
            return  <Email
                key={keys++}
                index={index}
                email={email}
                onPressEmail={()=>{}}
                onPressEdit={onPressEdit}
            />
        })

        if (User.getEmails().length != 0) {
            return (
                <View style={styles.emailContainer}>
                    {EmailArray}
                    {/*Separator()*/}
                </View>
            )
        } else return
    }

    function renderPlan () {

        function onPressPlan () {
            navigation.navigate('PlanTabScreen');
        }

        return (
            <View style={styles.emailContainer}>
                <TouchableOpacity onPress={() => onPressPlan()}>
                    <View style={styles.container}>
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
                            <Text style={styles.Text}>{planText()}</Text>
                        </View>
                        <View style={styles.editRow}>

                        </View>
                    </View>
                </TouchableOpacity>
                {/*Separator()*/}
            </View>
        )
    }

    function renderPay () {

        let payArray;

        if(!User.hasPayment()){
            payArray = <AddPayment screen={'ProfileTabScreen'} key={"addPaymentScreen"}/>
        } else {
            payArray = User.getPayments().map(function(payment, index) {
                return  <Payment
                    key={keys++}
                    payment={payment}
                    index={index}
                    onPressEdit={()=>{navigation.navigate('EditPayments');}}
                    onPressPayment={()=>{}}
                />
            })
        }

        return (
            <View style={styles.emailContainer}>
                {payArray}
                {/*Separator()*/}
            </View>
        )
    }

    function renderLoc () {

        let LocationArray = User.getAddresses().map(function(address, index) {
            return  <ShippingLocations
                key={keys++}
                index={index}
                address={address}
                onPressPlace={()=>{}}
                onPressEdit={()=>{navigation.navigate('EditAddresses')}}
            />
        })

        if (User.getAddresses().length != 0){
            return (
                <View style={styles.emailContainer}>
                    {LocationArray}
                    {/*{Separator()}*/}
                </View>
            )
        } else return
    }

  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderUserPassword()}
            {renderEmail()}
            {renderPlan()}
            {renderLoc()}
            {renderPay()}
            {contactUsLogOut()}
          </Card>
        </View>
      </ScrollView>
  )

}



// function renderDeleteButton () {
//   const scheme = useColorScheme();
//   let styles = getStyle(scheme);
//   const dispatch = useDispatch();
//   let myRed = styles.deleteProfile.borderColor;
//
//   let deleteButton =
//       <Pressable onPress={() => {getUser().delete(); dispatch(changePlan()); dispatch(logOut())}}>
//         <Text style ={[styles.Text, {color: myRed, fontWeight:"bold"}]}>
//           {deleteProfile()}
//         </Text>
//       </Pressable>;
//
//   return (
//       <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
//         <View style={styles.deleteProfile}>
//           {deleteButton}
//         </View>
//       </View>
//   )
// }

// function renderHeader ({avatar = User.getProfilePic(), avatarBackground = User.getBackgroundPic(),
//                          name = User.getUserName(), city = User.defaultAddress().city,
//                          state = User.defaultAddress().state}: RenderHProps) {
//
//   const scheme = useColorScheme();
//   let styles = getStyle(scheme);
//   const navigation = useNavigation();
//
//   return (
//       <View>
//         <ImageBackground
//             style={styles.headerBackgroundImage}
//             blurRadius={10}
//             source={avatarBackground}
//         >
//           <Icon name='info'
//                 style={styles.contactUs}
//                 color={buttonColor}
//                 onPress={()=>{navigation.navigate("ContactUsScreen")}}
//           />
//           <View style={styles.headerColumn}>
//             <Image
//                 style={styles.userImage}
//                 source={avatar}
//             />
//             <Text style={styles.userNameText}>{name}</Text>
//             <View style={styles.userAddressRow}>
//               <View>
//                 <Icon
//                     name="place"
//                     underlayColor="transparent"
//                     iconStyle={styles.placeIcon}
//                     onPress={()=>{}}
//                 />
//               </View>
//               <View style={styles.userCityRow}>
//                 <Text style={styles.userCityText}>
//                   {city}, {state}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//   )
// }
//
// interface RenderHProps {
//   avatar?: object
//   avatarBackground?: object
//   name?: string
//   city?: string
//   state?: string
//
// }
