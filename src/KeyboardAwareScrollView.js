import React, {
  ScrollView,
  PropTypes
} from 'react-native';

import KeyboardAwareBase from './KeyboardAwareBase'

export default class KeyboardAwareScrollView extends KeyboardAwareBase {
  render() {
    return (
      <ScrollView {...this.props} {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._keyboardAwareView = r;
        }}
      />
    );
  }
}

KeyboardAwareScrollView.propTypes = {
  getTextInputRefs: PropTypes.func
};
KeyboardAwareScrollView.defaultProps = {
  getTextInputRefs: () => {
    return [];
  }
};
