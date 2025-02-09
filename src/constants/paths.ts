import { Platform } from 'react-native';

export const PATHS = {
  ASSETS2: Platform.select({
    web: '/assets',
    default: '../../assets'
  }),
  ASSETS3: Platform.select({
    web: '/assets',
    default: '../../../assets'
  }),
} as const;

export const ASSETS = {
  LOGO: Platform.select({
    web: '/assets/logo.png',
    default: require('@assets/images/icon.png')
  }),
} as const; 