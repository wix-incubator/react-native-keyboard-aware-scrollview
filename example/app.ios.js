import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';

import {KeyboardAwareScrollView, KeyboardAwareListView} from 'react-native-keyboard-aware-scrollview'

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.";

class example extends Component {
  constructor(props) {
    super(props);
    this.state = { listToggle: false, data: {} };
  }

  _genRows(pressData) {
    const dataBlob = [];
    for (var ii = 0; ii < 10; ii++) {
      var pressedText = pressData[ii] ? " (pressed)" : "";
      dataBlob.push("Row " + ii + pressedText);
    }
    return dataBlob;
  }

  _renderRow(rowData, sectionID, rowID) {
    var rowHash = Math.abs(hashCode(rowData));
    return (
      <TouchableHighlight>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData + " - " + LOREM_IPSUM.substr(0, (rowHash % 301) + 10)}
            </Text>
          </View>
          <View style={{ backgroundColor: "#F6F6F6" }}>
            <TextInput
              style={[styles.textInput, { margin: 10, borderWidth: 0.5 }]}
              placeholder={"Text goes here"}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderKeyboardAwareListView() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.topButton}
          activeOpacity={0.9}
          underlayColor="#1382cc"
          onPress={() => this.setState({ listToggle: !this.state.listToggle })}
        >
          <Text>Switch to ScrollView</Text>
        </TouchableHighlight>
        <KeyboardAwareListView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          dataSource={this.state.data}
          renderRow={this._renderRow}
          renderScrollComponent={props => (
            <RecyclerViewBackedScrollView {...props} />
          )}
          renderSeparator={(sectionID, rowID) => (
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
          )}
        />
      </View>
    );
  }

  _renderKeyboardAwareScrollView() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.topButton}
          activeOpacity={0.9}
          underlayColor="#1382cc"
          onPress={() => this.setState({ listToggle: !this.state.listToggle })}
        >
          <Text>Switch to ListView</Text>
        </TouchableHighlight>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          getTextInputRefs={() => {
            return [
              this._firstNameTI,
              this._lastNameTI,
              this._countryTI,
              this._stateTI,
              this._addrTI,
              this._emailTI,
              this._msgTI,
              this._notesTI
            ];
          }}
        >
          <Text style={styles.mainTitle}>Example Form</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"First Name"}
            ref={r => {
              this._firstNameTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._lastNameTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Last Name"}
            ref={r => {
              this._lastNameTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._countryTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Country"}
            ref={r => {
              this._countryTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._stateTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"State"}
            ref={r => {
              this._stateTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._addrTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Address"}
            ref={r => {
              this._addrTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._emailTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder={"Email"}
            ref={r => {
              this._emailTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._msgTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Message"}
            ref={r => {
              this._msgTI = r;
            }}
            returnKeyType={"next"}
            onSubmitEditing={event => this._notesTI.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Notes"}
            ref={r => {
              this._notesTI = r;
            }}
            returnKeyType={"go"}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }

  render() {
    if (this.state.listToggle) {
      return this._renderKeyboardAwareListView();
    } else {
      return this._renderKeyboardAwareScrollView();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4890ff",
    paddingTop: 20
  },
  mainTitle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  textInput: {
    height: 47,
    margin: 20,
    paddingLeft: 10,
    fontSize: 17,
    lineHeight: 43,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 4
  },
  topButton: {
    alignItems: "center",
    marginBottom: 5
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F6F6F6"
  },
  separator: {
    height: 1,
    backgroundColor: "#222222"
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
});

var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = (hash << 5) - hash + str.charCodeAt(ii);
  }
  return hash;
};

AppRegistry.registerComponent('KeyboardAwareScrollView', () => example);
