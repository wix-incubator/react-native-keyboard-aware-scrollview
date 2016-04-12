import React, {
  ListView
} from 'react-native';

import KeyboardAwareBase from './KeyboardAwareBase'

export default class KeyboardAwareListView extends KeyboardAwareBase {
  render() {
    return (
      <ListView {...this.props} {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._keyboardAwareView = r;
        }}
      />
    );
  }
}
