import * as React from 'react';
import {
    Button,
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles';
import CaptionImage from "../components/CaptionImage";
import {useState} from "react";
import {getBugByID, getUser} from "../assets/Data/Data";
import {
    equipmentDescription, lostProduct,
    noInfestationProductText,
    productEquipmentText,
    productOwnedEquipmentText
} from "../assets/text/text";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";
import Infestation from "../assets/Classes/Infestation";


export default function BugInfoPopup({route, navigation}: any) {
    const {infestationID} = route.params;
    const infestation:Infestation = getBugByID(infestationID)

    const user = getUser();
    // This is for making the screen re-render. If it isn't
    // working, set a View around productImages, and have its key={i}
    const [i, update] = useState(0);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const products:Product[] = infestation.getProducts()

    // These will make a comprehensive list of any equipment that would be needed for this infestation.
    let newEquipment:Map<Equipment,Product[]|any> = new Map<Equipment, Product[]>()
    let ownedEquipment:Map<Equipment,Product[]|any> = new Map<Equipment, Product[]>()

    //Otherwise its hard to give everything its own key
    let keys = 1;

    // Creates the list of product images and descriptions
    let productImages = () => {
        let retVal;
        if (products.length == 0){
            retVal = <Text style={styles.captionFade}>{noInfestationProductText()}</Text>
        } else {
            retVal = products.map(function(product){
                let productText = product.getProductName() + ':\n' + product.getProductDetails()
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
                                     text={productText}
                                     key={keys++}/>;
            })

            // Makes the list of new equipment that will need to be added, if any
            if (newEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={keys++}>{productEquipmentText()}</Text> );
                retVal = retVal.concat(equipmentImages(newEquipment));
            }

            // Makes the list of equipment they already own, and gives them the option to add it if they don't have it
            if (ownedEquipment.size != 0){
                retVal.push(<Text style={styles.title} key={keys++}>{productOwnedEquipmentText()}</Text> );
                retVal = retVal.concat(equipmentImages(ownedEquipment, true));
            }
        }
        return retVal;
    }


    //Returns a list of CaptionImages for the equipment given, with links if it is owned
    function equipmentImages(equipmentList: Map<Equipment, Product[]>, owned = false){
        //The return value
        let imageList: JSX.Element[] = [];

        // Makes a list of all the equipment
        equipmentList.forEach(function(products,equipment){

            // This will say the list of products the equipment is needed for
            // (ex. 'Bugkiller spray, cockroach spray, and Ant Spray')
            let productText:string = '';
            for(let i = products.length - 1; i >= 0; i--){
                if(i == products.length - 1){
                    productText = products[i].getProductName();
                } else if (i == products.length - 2) {
                    productText = products[i].getProductName() + " and " + productText;
                } else {
                    productText = products[i].getProductName() + ", " + productText;
                }
            }

            // Sets the text explaining that this is the equipment needed for a certain
            // product, using equipmentDescription. It's in an array so you can add a link
            let equipmentText:string[] | any = [
                equipmentDescription()[0] +
                equipment.getEquipmentName() +
                equipmentDescription()[1] +
                productText +
                equipmentDescription()[2]
            ];

            // This is the link to set the equipment to no longer owned, ex. if the customer lost a product. Note that
            // the link will not display correctly if it is below the picture, because it wrapped around, but this is
            // unlikely to be a problem, so I didn't think it was worth it to fix
            if (owned) {
                equipmentText.push(<Text style={styles.link}
                                         onPress={()=>{
                                             user.removeEquipment(equipment);
                                             //This makes the screen re-render
                                             update(i + 1)
                                         }}
                                         key={keys++}>{lostProduct()}</Text>)
            }

            // This is the description of the equipment
            equipmentText.push(equipment.getEquipmentDescription())

            //This adds the equipment and description to the return array
            imageList.push(<CaptionImage source={equipment.getEquipmentImage()} text={equipmentText} key={keys++}/>)
        })

        // Returns the array of CaptionImages for the equipment
        return imageList;
    }

    let priceText = ():string => {
        //TODO
        return 'Price to add: $3.99';
    }

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{infestation.getBugName() + " Infestation"}</Text>
                <Button title="Add to Plan"
                        color= {buttonColor}
                        onPress={()=> navigation.navigate('BugsTabScreen')}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={infestation.getBugImage()} text={infestation.getBugDescription()}/>
                    <View style={styles.section}>
                        <Text style={styles.title}>Products to be added:</Text>
                    </View>
                    <View>
                        {productImages()}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.fullText}>{priceText()}</Text>
            </View>
        </View>
    )
}



