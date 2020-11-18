import * as React from 'react';
import {ScrollView, useColorScheme, Text, View} from 'react-native';
import {getStyle} from "../assets/Stylesheets/Styles";
import {noProductText, planBriefDescription, planTitle} from "../assets/text/text";
import {getUser} from "../assets/Data/Data";
import Product from "../assets/Classes/Product";
import ProductItem from "../components/ProductItem";

//TODO: Make it so it can render overflowing text (Expand?)

export default function PlanTabScreen() {
  //const navigation = useNavigation();

  // const [expandedId, setExpandedId] = useState("");
  const scheme = useColorScheme();
  const styles = getStyle(scheme);

  const plan = getUser().getPlan();
  const products:Product[] = plan.getProducts();

  // const toggleSelected = (id: React.SetStateAction<string>) => {
  //   if(expandedId == id){
  //     setExpandedId("");
  //   } else {
  //     setExpandedId(id);
  //   }
  // };

  let productsArray = products.length == 0?
      <Text style={styles.captionFade}>{noProductText()}</Text> :
      products.map((product, index) => {
          return <ProductItem product={product} key={index}/>
      })

  return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={[styles.title, {marginBottom: 2}]}>
            {planTitle()}
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