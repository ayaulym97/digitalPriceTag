// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   NativeModules,
//   View,
//   Text,
// } from 'react-native';
// import DeviceInfo from 'react-native-device-info';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//   DeviceInfo.getBuildId().then((buildId) => {
//     // iOS: "12A269"
//     // tvOS: not available
//     // Android: "13D15"
//     // Windows: not available
//     console.log('buildId', buildId);
//   });
//   DeviceInfo.getTotalMemory().then((totalMemory) => {
//     // 1995018240
//     console.log('totalMemory', totalMemory);
//   });
//   DeviceInfo.getSerialNumber().then((serialNumber) => {
//     // iOS: unknown
//     // Android: ? (maybe a serial number, if your app is privileged)
//     // Windows: unknown
//     console.log('serialNumber', serialNumber);
//   });
//   DeviceInfo.getTotalDiskCapacityOld().then((capacity) => {
//     // Android: 17179869184
//     // iOS: 17179869184
//     console.log('capacity', capacity);
//   });
//   DeviceInfo.getTotalDiskCapacity().then((capacity) => {
//     // Android: 17179869184
//     // iOS: 17179869184
//     console.log('getTotalDiskCapacity', capacity);
//   });
//   let uniqueId = DeviceInfo.getUniqueId();
//   // NativeModules.CustomDeviceInfo.getModel().then((MODEL) => {
//   //   // Android: 17179869184
//   //   // iOS: 17179869184
//   //   console.log('MODEL', MODEL);
//   // });

//   return (
//     <SafeAreaView>
//       <View style={styles.body}>
//         <Text style={styles.sectionTitle}>{DeviceInfo.getModel()}</Text>
//         <Text style={styles.sectionTitle}>{'uniqueId '}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';

import SharedGroupPreferences from 'react-native-shared-group-preferences';

const appGroupIdentifier = 'group.kz.digitalpricetag';
const data = {
  name: 'Vin Diesel',
  price: 34,
  email: 'aaA',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    // Not the most professional way to ask for permissions: Just ask when the app loads.
    // But for brevity, we do this here.
    if (Platform.OS === 'android') {
      this.dealWithPermissions();
    } else {
      this.saveUserDataToSharedStorage(data);
    }
  }

  async dealWithPermissions() {
    try {
      const grantedStatus = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const writeGranted =
        grantedStatus['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const readGranted =
        grantedStatus['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      if (writeGranted && readGranted) {
        this.saveUserDataToSharedStorage(data);
      } else {
        // You can either limit the user in access to the app's content,
        // or do a workaround where the user's data is saved using only
        // within the user's local app storage using something like AsyncStorage
        // instead. This is only an android issue since it uses read/write external storage.
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async saveUserDataToSharedStorage(data) {
    try {
      const appGroupIdentifier = 'group.kz.digitalpricetag';

      let myAppData = {
        c_name: 'Regina Phalange',
        c_age: 28,
        c_email: 'rphalange@gmail.com',
      };
      await SharedGroupPreferences.setItem(
        'myAppData',
        myAppData,
        appGroupIdentifier,
      );
      this.loadUsernameFromSharedStorage();
    } catch (errorCode) {
      console.log(errorCode);
    }
  }

  async loadUsernameFromSharedStorage() {
    try {
      const loadedData = await SharedGroupPreferences.getItem(
        'data',
        appGroupIdentifier,
      );
      console.log('LOAD_DAT', loadedData);
      this.setState({username: loadedData.name});
    } catch (errorCode) {
      // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
      // errorCode 1 = there is no value for that key
      console.log(errorCode);
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Text>
          {this.state.username
            ? 'Loading...'
            : 'Welcome back ' + this.state.username}
        </Text>
      </SafeAreaView>
    );
  }
}
