import React, {
  ScrollView,
  DeviceEventEmitter,
  PropTypes
} from 'react-native';

export default class KeyboardAwareScrollView extends React.Component {
  constructor(props) {
    super(props);
    this._bind('_onKeyboardWillShow', '_onKeyboardWillHide', '_addKeyboardEventListeners', '_removeKeyboardListeners', '_scrollToFocusedTextInput');
    this.state = {keyboardHeight: 0};
  }

  _bind(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  _addKeyboardEventListeners() {
    this.keyboardEventListeners = [
      DeviceEventEmitter.addListener('keyboardWillShow', this._onKeyboardWillShow),
      DeviceEventEmitter.addListener('keyboardWillHide', this._onKeyboardWillHide)
    ];
  }

  _removeKeyboardListeners() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  componentWillMount() {
    this._addKeyboardEventListeners();
  }

  componentWillUnmount() {
    this._removeKeyboardListeners();
  }

  render() {
    return (
      <ScrollView {...this.props} {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._scrollView = r;
        }}
      />
    );
  }

  _scrollToFocusedTextInput() {
    if (this.props.getTextInputRefs) {
      const textInputRefs = this.props.getTextInputRefs();
      textInputRefs.forEach((textInputRef) => {
        if (textInputRef.isFocused()) {
          this._scrollView.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(
            React.findNodeHandle(textInputRef), 50, true);
        }
      });
    }
  }

  _onKeyboardWillShow(event) {
    this._scrollToFocusedTextInput();

    const newKeyboardHeight = event.endCoordinates.height;
    if (this.state.keyboardHeight === newKeyboardHeight) {
      return;
    }

    this.setState({keyboardHeight: newKeyboardHeight});
  }

  _onKeyboardWillHide(event) {
    this.setState({keyboardHeight: 0});
    this._scrollView.scrollTo({x: 0, y: 0, animated: true});
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
