import * as React from 'react';
import { Button, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// Idea: can we make a basic object that has an icon, text, and an edit button all arranged in
// a horizontal plane. This way we can just change the text and icon for each section of the Personal
// Information screen
const UDATA = [
  {
    id: "UserName",
    title: "John Doe",
    editButton: "Edit",
  },
  {
    id: "Address",
    title: "123 Main Street" +
        "New York, NY 12345",
    editButton: "Edit",
  },
  {
    id: "Plan",
    title: "Basic Plan",
  },
]

//const PAYDATA = [
// Could we do the same with the payment data as was proposed with the user data?
//]

// Only for asthetic use, barely functional
export default function ProfileTabScreen() {
  return (

      <View>
        <View style={styles.header}>
          <Text style={styles.topText}> Personal Information </Text>
        </View>
        <ScrollView style={{marginBottom: '18%'}}>
          <View style={styles.container}>

            <View style={styles.userEntry}>
              <Ionicons name="md-person" size={64} color="white" />
              <Text style={styles.title}> John Doe </Text>
              <EditPressable button={styles.editButton}/>
            </View>

            <View style={styles.userEntry}>
              <Ionicons name="md-home" size={64} color="white" />
              <View style={styles.container}>
                <Text style={styles.title}> 123 Main St. </Text>
                <Text style={styles.title}> New York, NY 12345 </Text>
              </View>
              <EditPressable button={styles.editButton}/>
            </View>

            <View style={styles.userEntry}>
              <Ionicons name="md-paper" size={64} color="white" />
              <Text style={styles.title}> Basic Plan ($6.99 Month) </Text>
            </View>

          </View>

          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.topText}> Payment Information </Text>
            </View>

            <View style={styles.userEntry}>
              <Ionicons name="md-card" size={64} color="white" />
              <Text style={styles.title}> XXXX-1234 </Text>
              <EditPressable button={styles.editButton}/>
            </View>

            <View style={styles.userEntry}>
              <Ionicons name="md-card" size={64} color="white" />
              <Text style={styles.title}> XXXX-5678 </Text>
              <EditPressable button={styles.editButton}/>
            </View>

            <View style={styles.userEntry}>
              <Ionicons name="md-card" size={64} color="white" />
              <Text style={styles.title}> Bank Account </Text>
              <EditPressable button={styles.editButton}/>
            </View>
          </View>
        </ScrollView>
      </View>

  );
}

// My function now
function EditPressable(props: EditPressProps){
  return(
      <Pressable style={props.button}
                 onPress={()=>{}}
                 android_ripple={{color: 'rgba(0,0,0,.15)'}
                 }/>
  );
}
//This is where all the parameters for the BugPressable go
interface EditPressProps {
  button: object
  //We'll eventually need to put the other parameter here that tell the button which bug it is
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  header: {
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgb(41,41,41)'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 35,
    fontWeight: "bold",
    alignItems: 'flex-start',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  userEntry: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    width: '10%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
  },
});
