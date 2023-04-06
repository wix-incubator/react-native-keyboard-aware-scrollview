import React from 'react';
import PropTypes from 'prop-types';


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
          if(this.props.onLayout) {
            this.props.onLayout(layoutEvent);
          }
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if(this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={(event) => {
          this._updateKeyboardAwareViewContentSize();
          if(this.props.onContentSizeChange) {
            this.props.onContentSizeChange(event);
          }
        }}
        scrollEventThrottle={200}
      />
    );
  }
}

KeyboardAwareScrollView.propTypes = {
  getTextInputRefs: PropTypes.func,
  onScroll: PropTypes.func
};
KeyboardAwareScrollView.defaultProps = {
  ...KeyboardAwareBase.defaultProps,
  getTextInputRefs: () => {
    return [];
  }
};
