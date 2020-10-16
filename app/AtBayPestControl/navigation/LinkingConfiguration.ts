import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          BugsTab: {
            screens: {
              BugsTabScreen: 'Bugs',
            },
          },
          PlanTab: {
            screens: {
              PlanTabScreen: 'Plan',
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
