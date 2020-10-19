import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function PlanTabScreen() {
  return (
      <View>
        <View style={styles.bContainer}>
            <Text style={styles.topText}>Your Plan</Text>
            <Text style={styles.description}>
              This is the plan description! Here are the products. Here are the different bugs that are covered! 🐛 🐝🐞🦋
            </Text>
        </View>
        <View></View>
      </View>
  );
}

const styles = StyleSheet.create({

  bContainer: {
    alignItems: 'flex-start',
  },
  header: {
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  topText: {
    fontSize: 50,
    fontWeight: "bold",
    alignItems: 'flex-start',
    color: 'white',
    margin: 10,
  },
  description: {
    fontSize: 15,
    margin: 10,
    alignItems: 'flex-start',
    color: 'white',
  }
});
