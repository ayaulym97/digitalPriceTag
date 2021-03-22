/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {savePermanentItem} from './store/actions/permanentAction';
import {Theme, normalize} from './utils';
const Main = (props) => {
  const handlePress = () => {
    props.savePermanentItem('launched', true);
  };
  const handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {url} = newNavState;
    console.log('URL', url);
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
  return (
    <SafeAreaView style={props.launched ? styles.body : styles.white}>
      {props.launched ? (
        <WebView
          source={{
            uri: `Http://139.59.15.12/order/${props.vendorCode}`,
          }}
        />
      ) : (
        <View style={styles.inputView}>
          <Text style={styles.sectionTitle}>Введите артикуль</Text>
          <TextInput
            placeholder="0000000000"
            style={styles.input}
            value={props.vendorCode}
            onChangeText={(text) => props.savePermanentItem('vendorCode', text)}
          />
          <TouchableOpacity
            disabled={props.vendorCode === ''}
            onPress={() => handlePress()}
            style={[styles.btnContainer]}>
            <Text style={styles.btnText}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  white: {
    flex: 1,
  },
  inputView: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    marginTop: 32,
    height: normalize(48),
    paddingLeft: 4,
    borderRadius: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(48),
    backgroundColor: Theme.colors.yellow,
    borderRadius: normalize(8),
    marginTop: normalize(24),
  },
  btnText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: normalize(16),
    lineHeight: 19,
    color: Theme.colors.primary,
    textAlign: 'center',
  },
});

const mapPropsToState = (state) => {
  return {
    launched: state.permanent.launched,
    vendorCode: state.permanent.vendorCode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    savePermanentItem: (name, data) => dispatch(savePermanentItem(name, data)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(Main);
