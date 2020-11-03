import * as React from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

const PDATA = [
  {
    id: "p1",
    title: "Product 1",
    imgSource: require("../assets/images/product2.png"),
    description: "This describes product 1. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p2",
    title: "Product 2",
    imgSource: require("../assets/images/product3.jpg"),
    description: "This describes product 2. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p3",
    title: "Product 3",
    imgSource: require("../assets/images/product4.jpeg"),
    description: "This describes product 3. It will contain a brief descriptions, price, and a link to additional " +
        "resources (such as instructional videos for application)",
  },
  {
    id: "p4",
    title: "Product 4",
    imgSource: require("../assets/images/product5.jpeg"),
    description: "This describes product 4. It will contain a brief descriptions, price, and a link to additional " +
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
// , and description + Link on right side

// @ts-ignore
const ProductItem = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.productBox, style]}>
      <View style={{flex: 1, flexDirection: 'column',  backgroundColor: 'rgb(206,212,206)'}}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Image source={item.imgSource} style={styles.image}/>
      </View>
      <View style={{flex: 2, flexDirection:'column',  backgroundColor: 'rgb(206,212,206)'}}>
          <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
);



export default function PlanTabScreen() {
  const navigation = useNavigation();

  const [expandedId, setExpandedId] = useState("");

  const toggleSelected = (id: React.SetStateAction<string>) => {
    if(expandedId == id){
      setExpandedId("");
    } else {
      setExpandedId(id);
    }
  };


  // @ts-ignore
  const renderProduct = ({item}) => {
    const backgroundColor = 'rgb(206,212,206)';

    return(
        <ProductItem
          item={item}
          onPress={() => {navigation.navigate("PlanProductPopup",{
            prodId: item.id}
              )}}
          style={{backgroundColor}}
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



//I wonder if every web dev just has a huge compilation of various styles that they use 10% of
const styles = StyleSheet.create({

  bContainer: {
    alignItems: 'flex-start',
  },
  productBox: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '2%',
    aspectRatio: 3,
    backgroundColor: 'rgb(206,212,206)',
    borderRadius: 20,
    padding: 10,
    alignItems: "flex-start",
    flexDirection: 'row',
  },
  productTitle:{
    fontSize: 16,
    fontWeight: "bold",

  },
  section: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productDescription:{
    fontSize: 12,
    fontWeight: "normal",

  },
  link:{
    color: '#0000EE',
    fontSize: 20,
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
  },
  image: {
    flex: 1,
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
});
