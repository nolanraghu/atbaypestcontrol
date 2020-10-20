import * as React from 'react';
import {FlatList, LayoutAnimation, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import {useState} from "react";

const PDATA = [
  {
    id: "p1",
    title: "Product 1",
    description: "This describes product 1",
    expanded: false,
  },
  {
    id: "p2",
    title: "Product 2",
    description: "This describes product 2",
    expanded: false,
  },
  {
    id: "p3",
    title: "Product 3",
    description: "This describes product 3",
    expanded: false,
  },
  {
    id: "p4",
    title: "Product 4",
    description: "This describes product 4",
    expanded: false,
  },
]

// @ts-ignore
const ProductItem = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.productBox, style]}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </TouchableOpacity>
)


export default function PlanTabScreen() {
  const [expandedId, setExpandedId] = useState(null);

  //@ts-ignore
  const renderProduct = ({item}) => {
    return(
        <ProductItem
          item={item}
          onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            item.expanded = !item.expanded;
          }}
          style={item.expanded? styles.productBox2 : styles.productBox}
          />
    );
  }



  return (
      <View>
        <View style={styles.bContainer}>
            <Text style={styles.topText}>Your Plan</Text>
            <Text style={styles.description}>
              This is the plan description! Here are the products. Here are the different bugs that are covered! 🐛 🐝🐞🦋
            </Text>
        </View>
          <FlatList style = {{marginBottom: '35%'}}
            data={PDATA}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
          />
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
  productBox: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '2%',
    aspectRatio: 3,
    backgroundColor: 'rgb(206,212,206)',
    borderRadius: 20,
    padding: 10,
  },
  productBox2: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(17,205,17)',
    borderRadius: 20,
    padding: 10,
  },
  productTitle:{
    fontSize: 16,
    fontWeight: "bold",

  },
  productDescription:{
    fontSize: 12,
    fontWeight: "normal",

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
    margin: 10,
  },
  description: {
    fontSize: 15,
    margin: 10,
    alignItems: 'flex-start',
  }
});
