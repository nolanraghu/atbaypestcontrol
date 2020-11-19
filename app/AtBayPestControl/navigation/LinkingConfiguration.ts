import * as Linking from 'expo-linking';
import PlanProductPopup from "../screens/PlanProductPopup";

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          BugsTab: {
            screens: {
              BugsTabScreen: 'Bugs',
              BugInfoPopupScreen: 'Infestation Info',
              PlanUpdatePopupScreen: 'Plan Update'
            },
          },
          PlanTab: {
            screens: {
              PlanTabScreen: 'Plan',
              PlanProductPopup: 'Product Details',
              ConfirmPurchasePopup: 'Confirm Purchase'
            },
          },
          ProfileTab: {
            screens: {
              ProfileTabScreen: 'Profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
