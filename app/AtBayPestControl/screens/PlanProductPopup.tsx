import * as React from 'react';
import {
    ScrollView,
    useColorScheme,
    Text,
    View, Button
} from "react-native";
import CaptionImage from "../components/CaptionImage";
import {buttonColor, getOffButtonColor, getStyle} from "../assets/Stylesheets/Styles";
import {getProductByID} from "../assets/Data/Data";
import {
    captionProductWithLink,
    costText,
    equipmentListTitle,
    justEquipmentDescription,
    purchaseButton
} from "../assets/text/text";
import {useState} from "react";
import Equipment from "../assets/Classes/Equipment";

//TODO: Add button in header that allows you to repurchase the product before you would normally receive it. Add
// the equipment views, and allow the user to repurchase lost equipment.

export default function PlanProductPopup({route, navigation}:any){
    const {prodId} = route.params;
    let product = getProductByID(prodId);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const equipment:Equipment[] = product.equipmentList();

    const [buyEarly, setBuyEarly] = useState<boolean>(false);
    const [purchasing, setPurchasing] = useState<Equipment[]>([]);
    const [i, update] = useState(0);
    //Idky but the given functions didn't work. These shouldn't be necessary but they are, idk
    function isPurchasing(equipment:Equipment) {
        for (let pEquipment of purchasing){
            if (equipment.isEqual(pEquipment)){
                return true;
            }
        }
        return false;
    }
    function removePurchasing(equipment:Equipment) {
        let array = purchasing;
        for (let i = 0; i < purchasing.length; i++){
            if (equipment.isEqual(purchasing[i])){
                array.splice(i, 1);
                return array;
            }
        }
        return purchasing;
    }

    let keys = 0;

    function link(text:string){
        return (
            <Text style={styles.link}
                  onPress={()=>{
                      setBuyEarly(!buyEarly);
                  }}
                  key={keys++}>
                {text}
            </Text>
        )
    }

    function renderEquipment (){
        function equipmentLink(text:string, add:boolean, equipment:Equipment){
            return (
                <Text style={styles.link}
                      onPress={()=>{
                          if (add) {
                              // This adds the equipment to the purchasing array
                              setPurchasing(purchasing.concat(equipment));
                          } else {
                              // This takes the equipment out of the purchasing array
                              setPurchasing(removePurchasing(equipment));
                              // This shouldn't be necessary but it is
                              update(i + 1);
                          }
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
                    let addPurchasing = !isPurchasing(equipment);
                    return (
                        <CaptionImage source={equipment.getEquipmentImage()}
                                      text={
                                          justEquipmentDescription(equipment, addPurchasing,
                                              (text:string) => {return equipmentLink(text, addPurchasing, equipment)})
                                      }
                                      key={keys++}/>
                    )
                })
            ])
        }
    }

    function getButtonColor() {
        if ((!buyEarly) && (purchasing.length == 0)){
            return getOffButtonColor(scheme);
        } else {
            return buttonColor;
        }
    }

    function pressButton() {
        if ((buyEarly) || (purchasing.length != 0)){
            //TODO
        }
    }

    function footer() {
        if ((!buyEarly) && (purchasing.length == 0)){
            return ;
        } else {
            let cost = 0;
            if (buyEarly) {
                cost += product.getPrice();
            }
            for (let equipment of purchasing){
                cost += equipment.getPrice();
            }
            return (
                <View style={styles.header}>
                    <Text style={styles.fullText}>
                        {costText(cost)}
                    </Text>
                </View>
            );
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{product.getProductName()}</Text>
                <Button title={purchaseButton()}
                        color={getButtonColor()}
                        onPress={pressButton}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={product.getProductImage()}
                                  text={captionProductWithLink(product, link, buyEarly)}/>
                </View>
                {renderEquipment()}
            </ScrollView>
            {footer()}
        </View>
    );
};
