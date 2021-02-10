import * as React from 'react';
import {ScrollView, useColorScheme, Text, View} from 'react-native';
import {getStyle} from "../assets/Stylesheets/Styles";
import {noProductText, planBriefDescription, planTitle} from "../assets/text/text";
import {getUser} from "../assets/Data/Data";
import Product from "../assets/Classes/Product";
import ProductItem from "../components/ProductItem";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export default function PlanTabScreen() {
  const scheme = useColorScheme();
  const styles = getStyle(scheme);

  useSelector((state:RootState) => state.planVersion);

  const plan = getUser().getPlan();
  const products:Product[] = plan.getProducts();

  let productsArray = products.length == 0?
      <Text style={styles.captionFade}>{noProductText()}</Text> :
      products.map((product, index) => {
          return <ProductItem product={product} key={index}/>
      })

  return (
      <View style={styles.screen}>
        <View style={[styles.header, {flexWrap: 'wrap'}]}>
          <Text style={[styles.title, {marginBottom: 2}]}>
            {planTitle(plan)}
          </Text>
          <Text style={[styles.caption, {marginBottom: 0}]}>
              {planBriefDescription(plan)}
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