import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function BugsTabScreen() {
  const navigation = useNavigation();
  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Add to Plan" onPress={()=> navigation.navigate('PlanUpdatePopupScreen')}/>
        </View>
        <ScrollView style={{marginBottom: '18%'}}>
          <View style={styles.container}>
            <BugPressable button={styles.preventionButton} isPreventionButton={true}/>
            <BugPressable source={require('../assets/images/ant.png')}/>
            <BugPressable source={require('../assets/images/beetle.png')}/>
            <BugPressable source={require('../assets/images/blue_beetle.png')}/>
            <BugPressable/>
            <BugPressable/>
            <BugPressable/>
            <BugPressable/>
          </View>
        </ScrollView>
      </View>
  );
}



//Sorry Kobin, but you re-typing the specification of the BugButton was giving me
//anxiety so I did this.
function BugPressable({button = styles.fullButton,
                        source = require('../assets/images/honey_bee.png'),
                        isPreventionButton = false}: BugPressProps){
  //TODO make states, based on whether or not the bug is covered
  const scheme = useColorScheme();
  const navigation = useNavigation();
  return(
      <Pressable style={button}
                 onPress={()=> navigation.navigate('BugInfoPopupScreen')}
                 //This toggles based on the color theme now
                 android_ripple= {scheme === "dark"? {color: 'rgba(0,0,0,.15)'} : {color: 'rgba(255,255,255,0.3)'}}>

        <Image source={source} style={styles.image}/>
        {isPreventionButton ?
            <Text style={{color: 'black', alignSelf: 'center', flex: 2, textAlign: "center"}}>Ant, bee, etc.</Text>
            : <Text style={{color: 'black', alignSelf: 'center', textAlign: "center"}}>Ant, bee, etc.</Text>}

      </Pressable>
  );
}
//This is where all the parameters for the BugPressable go
interface BugPressProps {
  button?: object
  source?: object
  isPreventionButton?: boolean
  //We'll eventually need to put the other parameter here that tell the button which bug it is
}

const styles = StyleSheet.create({
  container: {
    padding: '2.5%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fullButton: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  preventionButton: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  image: {
    flex: 1,
    height: '70%',
    width: '70%',
    alignSelf: "center",
    resizeMode: 'contain',
  },
});
