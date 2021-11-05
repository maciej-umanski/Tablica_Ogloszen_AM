/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          MyWall: {
            screens: {
              MyWallScreen: 'my_wall',
            },
          },
          MainWall: {
            screens: {
              MainWallScreen: 'main_wall',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          AddAdvert: {
            screens: {
              AddAdvertScreen: 'add_advert',
            },
          },
        },
      },
      Login: {
        screens: {
          Login: 'login',
        },
      },
      Register: {
        screens: {
          Register: 'register',
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
