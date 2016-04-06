
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  TextInput,
  Text
} from 'react-native';

import KeyboardAwareScrollView from 'react-native-keyboard-aware-scrollview'

class example extends Component {
  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}
                               keyboardDismissMode="interactive"
                               keyboardShouldPersistTaps={true}
                               getTextInputRefs={() => {
                                 return [this._firstNameTI, this._lastNameTI, this._countryTI, this._stateTI, this._addrTI, this._emailTI, this._msgTI, this._notesTI];
                               }}
        >
        <Text style={styles.mainTitle}>Example Form</Text>
        <TextInput style={styles.textInput} placeholder={'First Name'} ref={(r) => { this._firstNameTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._lastNameTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'Last Name'} ref={(r) => { this._lastNameTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._countryTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'Country'} ref={(r) => { this._countryTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._stateTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'State'} ref={(r) => { this._stateTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._addrTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'Address'} ref={(r) => { this._addrTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._emailTI.focus()}/>
        <TextInput style={styles.textInput} keyboardType="email-address" placeholder={'Email'} ref={(r) => { this._emailTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._msgTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'Message'} ref={(r) => { this._msgTI = r; }} returnKeyType={'next'} onSubmitEditing={(event) => this._notesTI.focus()}/>
        <TextInput style={styles.textInput} placeholder={'Notes'} ref={(r) => { this._notesTI = r; }} returnKeyType={'go'}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4890ff',
    paddingTop: 20
  },
  mainTitle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  textInput: {
    height: 47,
    margin: 20,
    paddingLeft: 10,
    fontSize: 17,
    lineHeight: 43,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 4
  }
});

AppRegistry.registerComponent('example', () => example);
