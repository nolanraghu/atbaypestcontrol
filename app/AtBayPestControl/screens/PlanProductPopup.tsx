import * as React from 'react';
import {
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";
import CaptionImage from "../components/CaptionImage";
import {getStyle} from "../assets/Stylesheets/Styles";
import {getProductByID} from "../assets/Data/Data";
import {
    captionProductWithLink,
    equipmentListTitle,
    justEquipmentDescription,
} from "../assets/text/text";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";
import {makeArray} from "../assets/Classes/ClassHelpers";

export default function PlanProductPopup({route, navigation}:any){
    const {prodId} = route.params;
    let product:Product = getProductByID(prodId);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const equipment:Equipment[] = makeArray(product.getEquipmentList(), 'equipment');

    let keys = 0;

    function link(text:string){
        return (
            <Text style={styles.link}
                  onPress={()=>{
                      navigation.navigate('ConfirmPurchasePopup', {
                          itemID:prodId, type:'Product'
                      })
                  }}
                  key={keys++}>
                {text}
            </Text>
        )
    }

    function renderEquipment (){
        function equipmentLink(text:string, equipment:Equipment){
            return (
                <Text style={styles.link}
                      onPress={()=>{
                          navigation.navigate('ConfirmPurchasePopup', {
                              itemID:equipment.getID(), type:'Equipment'
                          })
                      }}
                      key={keys++}>
                    {text}
                </Text>
            )
        }
        if (equipment.length == 0){
            return;
        } else {
            return ([
                <Text style={styles.title} key={keys++}>{equipmentListTitle()}</Text>,
                equipment.map((equipment:Equipment) => {
                    return (
                        <CaptionImage source={equipment.getEquipmentImage()}
                                      text={
                                          justEquipmentDescription(equipment,
                                              (text:string) => {return equipmentLink(text, equipment)})
                                      }
                                      key={keys++}/>
                    )
                })
            ])
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{product.getName()}</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={product.getProductImage()}
                                  text={captionProductWithLink(product, link)}/>
                </View>
                {renderEquipment()}
            </ScrollView>
        </View>
    );
};
