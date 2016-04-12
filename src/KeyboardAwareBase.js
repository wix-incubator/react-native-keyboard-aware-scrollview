import React, {
  DeviceEventEmitter
} from 'react-native';

export default class KeyboardAwareBase extends React.Component {
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
    //ReactNativeEventEmitter.putListener('123', 'focus', () => {console.error('ReactNativeEventEmitter')});
  }

  componentWillUnmount() {
    this._removeKeyboardListeners();
  }
  
  _scrollToFocusedTextInput() {
    if (this.props.getTextInputRefs) {
      const textInputRefs = this.props.getTextInputRefs();
      textInputRefs.forEach((textInputRef) => {
        if (textInputRef.isFocused()) {
          this._keyboardAwareView.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(
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
    if(this._keyboardAwareView) {
      this._keyboardAwareView.scrollTo({x: 0, y: 0, animated: true});
    }
  }
}
