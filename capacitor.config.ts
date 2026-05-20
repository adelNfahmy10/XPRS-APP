import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'XPRS',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: "#000000",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
  },
};

export default config;
