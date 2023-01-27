import { registerRootComponent } from "expo";
import firestore from "@react-native-firebase/firestore";

// if (__DEV__) {
//   // se tiver um emulador ele mata ele e inicia outro
//   firestore()
//     .terminate()
//     .then(() => {
//       firestore()
//         .clearPersistence()
//         .then(() => {
//           firestore().useEmulator("localhost", 8080);
//         })
//         .catch(() => {
//           console.log("Clear persistence error");
//         });
//     })
//     .catch((e) => {
//       console.log("Terminae error");
//     });
// }

// firestore();

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
