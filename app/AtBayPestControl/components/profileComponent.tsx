import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {getStyle} from "../assets/Stylesheets/Styles";
import * as React from "react";
import {Icon} from "react-native-elements";

export default function profileComponent (iconName:string,
                                          mainText:string,
                                          subText:string = '',
                                          hasEdit = true) {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    function onPressEdit () {
        navigation.navigate('EditUsernamePasswordScreen');
    }

    return (
        <View style={styles.emailContainer}>
            <TouchableOpacity>
                <View style={[styles.container]}>
                    <View style={styles.iconRow}>
                        <Icon
                            name= {iconName}
                            underlayColor = 'transparent'
                            iconStyle={styles.Icon}
                            onPress={() => {}}
                        />
                    </View>
                    <View style={styles.Row}>
                        <View style={styles.column}>
                            <Text style={styles.Text}>{mainText}</Text>
                        </View>
                        <View style={styles.nameColumn}>
                            {subText !== '' && (
                                <Text style={styles.subText}>
                                    {subText}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.editRow}>
                        {hasEdit && (
                            <Icon
                                name="edit"
                                underlayColor="transparent"
                                iconStyle={styles.Icon}
                                onPress={() => onPressEdit()}
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {/*<Separator/>*/}
        </View>
    )
}