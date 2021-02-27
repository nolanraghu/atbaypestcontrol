import React, {useState} from 'react';
import axios from 'axios';
import {getUser} from "../assets/Data/Data";
import {ScrollView, Text, useColorScheme, View} from "react-native";
import Payment from "../assets/Classes/Payment";
import {useDispatch} from "react-redux";
import {changePayment} from "../redux/action";
import PaymentFormView from "../components/PaymentFormView";
import {getStyle} from "../assets/Stylesheets/Styles";
import {updateUserOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {notUpdated, usernameStolen} from "../assets/text/text";

/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default function AddSubscription({route, navigation}:any){
    const STRIPE_ERROR = 'Payment service error. Try again later.';
    const SERVER_ERROR = 'Server error. Try again later.';
    const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Hth3nKdUJ252rMhMm75qbcTnKrppn9GcvnGmEadjSPEqyKrI9oY3zW3ljLP3rgGyInLgOKI' +
        'YrK9vCXwBd5QwvGf00DdT2X9P1';

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<any>(null);
    const [token, setToken] = useState(null);
    let {lastScreen} = route.params;

    const dispatch = useDispatch();

    /**
     * The method sends HTTP requests to the Stripe API.
     * It's necessary to manually send the payment data
     * to Stripe because using Stripe Elements in React
     * Native apps isn't possible.
     *
     * @param creditCardData the credit card data
     * @return Promise with the Stripe data
     */
    const getCreditCardToken = (creditCardData:any) => {
        const card = {
            'card[number]': creditCardData.values.number.replace(/ /g, ''),
            'card[exp_month]': creditCardData.values.expiry.split('/')[0],
            'card[exp_year]': creditCardData.values.expiry.split('/')[1],
            'card[cvc]': creditCardData.values.cvc
        };
        return fetch('https://api.stripe.com/v1/tokens', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            // @ts-ignore
            body: Object.keys(card).map((key) => key + '=' + card[key]).join('&')
        }).then(response => response.json());
    };

    /**
     * The method imitates a request to our server.
     *
     * @param creditCardToken
     * @return {Promise<Response>}
     */
    const subscribeUser = (creditCardToken:any) => {
        return new Promise((resolve) => {
            console.log('Credit card token\n', creditCardToken);
            setTimeout(() => {
                resolve({ status: true });
            }, 1000)
        });
    };

    // Handles submitting the payment request
    const onSubmit = async (creditCardInput:any, defaultCard:boolean) => {
        console.log("checkpoint B")
        // Disable the Submit button after the request is sent
        setSubmitted(true);
        let creditCardToken;
        try {
            // Create a credit card token
            creditCardToken = await getCreditCardToken(creditCardInput);
            if (creditCardToken.error) {
                // Reset the state if Stripe responds with an error
                // Set submitted to false to let the user subscribe again
                setSubmitted(false);
                setError(STRIPE_ERROR);
                return;
            }
        } catch (e) {
            // Reset the state if the request was sent with an error
            // Set submitted to false to let the user subscribe again
            console.log("oops 2")
            setSubmitted(false);
            setError(STRIPE_ERROR);
            return;
        }
        // Send a request to your server with the received credit card token
        // @ts-ignore
        const { error } = await subscribeUser(creditCardToken);
        // Handle any errors from your server
        if (error) {
            console.log("oops 1")
            setSubmitted(false);
            setError(SERVER_ERROR);
        } else {
            setError(null);
            setToken(creditCardToken);
            getUser().addPayment(new Payment(creditCardToken.card.last4, creditCardToken.card.funding), defaultCard);
            dispatch(changePayment());

            let finishButtonPress = () => {
                setSubmitted(false);

                if (lastScreen === "EditUsernamePasswordScreen" ||
                    lastScreen === "EditEmails" ||
                    lastScreen === "EditAddresses" ||
                    lastScreen === "EditPayments" ||
                    lastScreen === 'ContactUsScreen'){
                    navigation.goBack();
                    navigation.navigate(lastScreen);
                } else if (lastScreen === 'ProfileTabScreen') {
                    navigation.navigate(lastScreen);
                } else {
                    navigation.navigate(lastScreen);
                    navigation.goBack();
                }
            }

            updateUserOnline(
                () => {
                    makeAlert(notUpdated());
                    finishButtonPress();
                },
                () => {
                    finishButtonPress();
                },
                () => {
                    makeAlert(usernameStolen());
                    finishButtonPress();
                }
            )


        }
    };

    //We need to make customers first so we can set up recurring payments from saved cards
    const makePayment = async() =>{
        axios({
            method: 'POST',
            url:'https://us-central1-atbaypestcontrol-acd63.cloudfunctions.net/completePaymentWithStripe',
            data:{
                amount: Math.round(getUser().getPendingPayment()*100),
                currency: 'usd',
                token: token
            }
        }).then(response => {
            console.log(response);
            getUser().resetPendingPayments();
        });
    };

    return (
        <View>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Use this form to add a new card to your account
                    </Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.cardArea}>
                        <PaymentFormView onSubmit={onSubmit} submitted={submitted} error={error}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    );

}