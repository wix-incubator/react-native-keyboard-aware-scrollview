import React, { PropTypes } from 'react';

import {
  ScrollView
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
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset)
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
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
