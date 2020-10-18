import * as React from 'react';
import {Button, Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function BugsTabScreen() {
  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Add to Plan" onPress={()=>{}}/>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Pressable style={styles.preventionButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
            <Pressable style={styles.fullButton} onPress={()=>{}} android_ripple={{color: 'rgba(0,0,0,.15)'}}/>
          </View>
        </ScrollView>
      </View>
  );
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
    padding: 10,
  },
  preventionButton: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    padding: 10,
  },
  ripple: {
    color: 'rgba(0,0,0,.15)'
  }
});
