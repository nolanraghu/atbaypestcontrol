import * as React from 'react';
import {
    Button,
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";
import {getStyle, buttonColor, getOffButtonColor} from '../assets/Stylesheets/Styles';
import CaptionImage from "../components/CaptionImage";
import {useState} from "react";
import {getBugByID, getUser} from "../assets/Data/Data";
import {
    changePlan,
    captionProductDescription,
    equipmentDescription, infestationName,
    noInfestationProductText, priceText,
    productEquipmentText,
    productOwnedEquipmentText, productsIntro
} from "../assets/text/text";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";
import Infestation from "../assets/Classes/Infestation";

//TODO: Test this screen a lot! Example cases: what if an infestation is pending and then you realize you are missing
// some of the equipment? Or if you are removing an infestation, but you click on missing equipment?


export default function BugInfoPopup({route, navigation}: any) {
    const {infestationID} = route.params;
    const infestation:Infestation = getBugByID(infestationID)

    const user = getUser();

    // This is for making the screen re-render. If it isn't
    // working, set a View around productImages, and have its key={i}
    const [i, update] = useState(0);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    // True if the infestation can be added to the plan, false if it can be removed
    const adding = !(user.getPlan().containsInfestation(infestation) ||
        user.getPlan().isPendingInfestation(infestation))

    // True if you are getting missing equipment for an infestation on your plan
    const [purchasing, setPurchasing] = useState(false);

    //False if the user is not allowed to remove the infestation from their plan
    const canRemove = user.getPlan().isRemovable(infestation)

    const products:Product[] = infestation.getProducts()

    // These will make a comprehensive list of any equipment that would be needed for this infestation.
    let newEquipment:Map<Equipment,Product[]|any> = new Map<Equipment, Product[]>()
    let ownedEquipment:Map<Equipment,Product[]|any> = new Map<Equipment, Product[]>()

    let equipmentPrice:number = 0;

    //Otherwise its hard to give everything its own key
    let keys = 1;

    // Creates the list of product images and descriptions
    let productImages = () => {
        let retVal;
        if (products.length == 0){
            retVal = <Text style={styles.captionFade}>{noInfestationProductText()}</Text>
        } else {
            retVal = products.map(function(product){
                let equipment = product.equipmentList();

                // Makes lists of equipment that will be needed, along with the product(or products)
                // that they are needed for, in a map
                if (equipment.length != 0){
                    for (let item of equipment){
                        if(user.hasEquipment(item)){
                            if (ownedEquipment.has(item)){
                                ownedEquipment.get(item).push(product);
                            } else {
                                ownedEquipment.set(item, [product])
                            }
                        } else {
                            if (newEquipment.has(item)){
                                newEquipment.get(item).push(product);
                            } else {
                                newEquipment.set(item, [product])
                            }
                        }
                    }
                }

                return <CaptionImage source={product.getProductImage()}
                                     text={captionProductDescription(product)}
                                     key={keys++}/>;
            })

            // Makes the list of new equipment that will need to be added, if any
            if (newEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={keys++}>{productEquipmentText(adding)}</Text> );
                let {imageList:imageList, price:price} = equipmentImages(newEquipment)
                retVal = retVal.concat(imageList);
                equipmentPrice = price;
            }

            // Makes the list of equipment they already own, and gives them the option to add it if they don't have it
            if (ownedEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={keys++}>{productOwnedEquipmentText(adding)}</Text> );
                retVal = retVal.concat(equipmentImages(ownedEquipment, true).imageList);
            }
        }
        return retVal;
    }

    //Returns a list of CaptionImages for the equipment given, with links if it is owned
    function equipmentImages(equipmentList: Map<Equipment, Product[]>, owned = false){
        //The return value
        let imageList: JSX.Element[] = [];

        //The price to purchase all the equipment
        let price:number = 0;

        // Makes a list of all the equipment
        equipmentList.forEach(function(products,equipment){
            price += equipment.getPrice();

            let link = (text:string) => {
                return(
                    <Text style={styles.link}
                          onPress={()=>{
                              // TODO: Just realized this needs to be undoable... need to add a link for unowned
                              //  equipment that they have received, just in case they accidentally clicked the link
                              user.removeEquipment(equipment);

                              // Now we'll be purchasing equipment, which will change the text if we are not
                              // adding to the plan
                              setPurchasing(true);

                              // This makes the screen re-render
                              update(i + 1)
                          }}
                          key={keys++}>{text}</Text>
                )
            }

            //This adds the equipment and description to the return array
            imageList.push(<CaptionImage source={equipment.getEquipmentImage()}
                                         text={equipmentDescription(equipment, products, owned, link)}
                                         key={keys++}/>)
        })

        // Returns the array of CaptionImages for the equipment
        return {imageList, price};
    }

    function pressButton(){
        // The button should do nothing if you cannot remove, add to plan, or purchase equipment
        if(canRemove || adding || purchasing){
            //TODO
            navigation.navigate('BugsTabScreen')
        }
    }

    function getButtonColor(){
        if(!(canRemove || adding || purchasing)){
            return getOffButtonColor(scheme);
        } else {
            return buttonColor;
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{infestationName(infestation)}</Text>
                <Button title={changePlan(adding, purchasing)}
                        color={getButtonColor()}
                        onPress={pressButton}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={infestation.getBugImage()}
                                  text={infestation.getBugDescription()}/>
                    <View style={styles.section}>
                        <Text style={styles.title}>{productsIntro(adding)}</Text>
                    </View>
                    {productImages()}
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.fullText}>
                    {priceText(infestation.getPrice(), equipmentPrice, adding, purchasing)}
                </Text>
            </View>
        </View>
    )
}



