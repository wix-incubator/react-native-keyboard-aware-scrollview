import React, {
  DeviceEventEmitter,
  NativeModules
} from 'react-native';

var ScrollViewManager = NativeModules.ScrollViewManager;

export default class KeyboardAwareBase extends React.Component {
  constructor(props) {
    super(props);
    this._bind('_onKeyboardWillShow', '_onKeyboardWillHide', '_addKeyboardEventListeners', '_removeKeyboardListeners', '_scrollToFocusedTextInput', '_onKeyboardAwareViewLayout', 'scrollToBottom');
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

  _onKeyboardAwareViewLayout(layout) {
    this._keyboardAwareView.layout = layout;
    ScrollViewManager.getContentSize(React.findNodeHandle(this._keyboardAwareView), (res)=> {
      this._keyboardAwareView.contentSize = res;
    })
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

  scrollToBottom() {
    const bottomYOffset = this._keyboardAwareView.contentSize.height - this._keyboardAwareView.layout.height + this._keyboardAwareView.props.contentInset.bottom;
    this._keyboardAwareView.scrollTo({x: 0, y: bottomYOffset, animated: true});
  }
}
