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
import {getBugByID, getUser, gimmekey} from "../assets/Data/Data";
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
import {useDispatch, useSelector} from "react-redux";
import {changePending, justEquipmentPending} from "../redux/action";
import {RootState} from "../redux/store";
import {makeArray} from "../assets/Classes/ClassHelpers";

//TODO: Test this screen a lot! Example cases: what if an infestation is pending and then you realize you are missing
// some of the equipment? Or if you are removing an infestation, but you click on missing equipment? What happens when
// the products are changed and someone who already owns that infestation with changed details goes back into the app?

export default function BugInfoPopup({route, navigation}: any) {
    const {infestationID} = route.params;
    const infestation:Infestation = getBugByID(infestationID)

    // This uses redux, see files in Redux directory
    const dispatch = useDispatch();
    // Redux hook to make screen render when state pending changes
    useSelector((state:RootState) => state.equipmentVersion);

    const user = getUser();

    // This is for making the screen re-render. If it isn't
    // working, set a View around productImages, and have its key={i}
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    // True if the infestation can be added to the plan, false if it can be removed
    const adding = !((user.getPlan().containsInfestation(infestation) &&
        !(user.getPlan().isPendingRemoval(infestation))) ||
        user.getPlan().isPendingInfestation(infestation));

    // True if you will be purchasing MISSING equipment (equipment once owned)
    const [purchasing, setPurchasing] = useState(false);

    //False if the user is not allowed to remove the infestation from their plan
    const canRemove = user.getPlan().isRemovable(infestation)

    const price = {upfront: infestation.getUpfrontPrice(), monthly: infestation.getMonthlyPrice()};

    const products:Product[] = makeArray(infestation.getProducts(), 'product');

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
                let equipment:Equipment[] = makeArray(product.getEquipmentList(), 'equipment');

                // Makes lists of equipment that will be needed, along with the product(or products)
                // that they are needed for, in a map
                if (equipment.length != 0){
                    for (let item of equipment){
                        if(user.hasEquipment(item)){
                            if (ownedEquipment.has(item)){
                                ownedEquipment.get(item).push(product);
                            } else {
                                ownedEquipment.set(item, [product]);
                            }
                        } else {
                            if (user.hadEquipment(item) && !purchasing){
                                setPurchasing(true);
                            }
                            if (newEquipment.has(item)){
                                newEquipment.get(item).push(product);
                            } else {
                                newEquipment.set(item, [product]);
                            }
                        }
                    }
                }

                return <CaptionImage source={product.getProductImage()}
                                     text={captionProductDescription(product)}
                                     key={++keys}/>;
            })

            // Makes the list of new equipment that will need to be added, if any
            if (newEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={++keys}>{productEquipmentText(adding)}</Text> );
                let {imageList:imageList, price:price} = equipmentImages(newEquipment)
                retVal = retVal.concat(imageList);
                equipmentPrice = price;
            }

            // Makes the list of equipment they already own, and gives them the option to add it if they don't have it
            if (ownedEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={++keys}>{productOwnedEquipmentText(adding)}</Text> );
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
            let onceOwned = user.hadEquipment(equipment);

            let link = (text:string) => {
                return(
                    <Text style={styles.link}
                          onPress={()=>{
                              if (!owned && onceOwned){
                                  user.addHasEquipment(equipment);
                                  setPurchasing(false);
                              } else {
                                  user.removeEquipment(equipment);
                              }
                              // This makes the screen re-render
                              dispatch(justEquipmentPending())
                          }}
                          key={++keys}>{text}</Text>
                )
            }

            //This adds the equipment and description to the return array
            imageList.push(<CaptionImage source={equipment.getEquipmentImage()}
                                         text={equipmentDescription(equipment, products, owned, link, onceOwned)}
                                         key={++keys}/>)
        })

        // Returns the array of CaptionImages for the equipment
        return {imageList, price};
    }

    function pressButton(){
        // The button should do nothing if you cannot remove, add to plan, or purchase equipment
        if(canRemove || adding || purchasing){
            if (adding) {
                user.getPlan().addPendingInfestation(infestation);
            }
            if (newEquipment.size != 0){
                newEquipment.forEach(( products, equipment) => {
                    user.addEquipment(equipment);
                })
            } else if(!adding) {
                user.removeManyEquipment(user.getPlan().removePendingInfestation(infestation));
            }
            dispatch(changePending())
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
                    {priceText(price.monthly, price.upfront, equipmentPrice, adding, purchasing)}
                </Text>
            </View>
        </View>
    )
}



