const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require('stripe')('sk_test_51Hth3nKdUJ252rMhn5rfGzBeHwt1VN5O3Bz3MhYaafU3bXVdFfxK6Qqfnn7dmgApegsN4a2tgRnorvvxd8FA3UPH009elv2iDx');

exports.completePaymentWithStripe = functions.https.onRequest((request,response)=>{

    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: 'tok_mastercard',
    })// eslint-disable-next-line promise/always-return
        .then(charge => {
        response.send(charge);
    }).catch(error => {
        console.log(error);
    });
})