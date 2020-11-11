import * as React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, useColorScheme, Text, View} from 'react-native';
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getBackgroundColor, getStyle} from "../assets/Stylesheets/Styles";
import {noProductText} from "../assets/text/text";

const PDATA = [
  {
    id: "p1",
    title: "Product 1",
    imgSource: require("../assets/images/product1.jpg"),
    description: "This describes product 1. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p2",
    title: "Product 2",
    imgSource: require("../assets/images/product2.png"),
    description: "This describes product 2. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p3",
    title: "Product 3",
    imgSource: require("../assets/images/product3.jpg"),
    description: "This describes product 3. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p4",
    title: "Product 4",
    imgSource: require("../assets/images/product4.jpeg"),
    description: "This describes product 4. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p5",
    title: "Product 5",
    imgSource: require("../assets/images/product5.jpeg"),
    description: "This describes product 5. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
];

interface productInterface{
  id: String,
  title: String,
  imgSource: any,
  description: String,
}


//TODO: Make product boxes contain the title on top left, picture on bottom left
// , and description + Link on right side.
// Make it so it can render overflowing text (Expand?)


// @ts-ignore
function ProductItem({item}) {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);
  return(
      <Pressable onPress={() => {navigation.navigate("PlanProductPopup", {prodId: item.id})}}
                 style={styles.product}
                 android_ripple= {{color: getBackgroundColor(scheme)}}>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent', margin: 12, marginHorizontal: -10}}>
          <Text style={[styles.fullText, {fontWeight: 'bold', marginBottom: 3}]}>{item.title}</Text>
          <Image source={item.imgSource}  style={styles.buttonImage}/>
        </View>
        <View style={{flex: 2, flexDirection:'column', backgroundColor: 'transparent', margin: 8, marginLeft: 0}}>
          <Text style={styles.fullText}>{item.description}</Text>
        </View>
      </Pressable>
  );
}



export default function PlanTabScreen() {
  const navigation = useNavigation();

  const [expandedId, setExpandedId] = useState("");
  const scheme = useColorScheme();
  const styles = getStyle(scheme);

  const toggleSelected = (id: React.SetStateAction<string>) => {
    if(expandedId == id){
      setExpandedId("");
    } else {
      setExpandedId(id);
    }
  };

  let productsArray = PDATA.length == 0?
      noProductText :
      PDATA.map(function(item, index){
        return (<ProductItem item={item} key={index}/>)
      })

  return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={[styles.title, {marginBottom: 2}]}>
            Your Plan
          </Text>
          <Text style={[styles.caption, {marginBottom: 0}]}>
            This is the plan description! Here are the products. Here are the different bugs that are covered! 🐛🐝🐞🦋
          </Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {productsArray}
          </View>
        </ScrollView>
      </View>
  );
}