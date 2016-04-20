import React, {
  DeviceEventEmitter,
  NativeModules,
  PropTypes
} from 'react-native';

var ScrollViewManager = NativeModules.ScrollViewManager;

export default class KeyboardAwareBase extends React.Component {
  constructor(props) {
    super(props);
    this._bind('_onKeyboardWillShow', '_onKeyboardWillHide', '_addKeyboardEventListeners', '_removeKeyboardListeners', '_scrollToFocusedTextInput', '_onKeyboardAwareViewLayout', 'scrollToBottom', 'scrollBottomOnNextSizeChange');
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

  componentDidMount() {
    if(this._keyboardAwareView && this.props.startScrolledToBottom) {
      this.scrollToBottom(false);
      setTimeout(() => this._keyboardAwareView.setNativeProps({ opacity: 1 }), 100);
    }
  }

  _onKeyboardAwareViewLayout(layout) {
    this._keyboardAwareView.layout = layout;
    this._keyboardAwareView.contentOffset = {x: 0, y: 0};
    this._updateKeyboardAwareViewContentSize();
  }

  _onKeyboardAwareViewScroll(contentOffset) {
    this._keyboardAwareView.contentOffset = contentOffset;
    this._updateKeyboardAwareViewContentSize();
  }

  _updateKeyboardAwareViewContentSize() {
    ScrollViewManager.getContentSize(React.findNodeHandle(this._keyboardAwareView), (res)=> {
      this._keyboardAwareView.contentSize = res;
      if(this.state.scrollBottomOnNextSizeChange) {
        this.scrollToBottom();
        this.state.scrollBottomOnNextSizeChange = false;
      }
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
            React.findNodeHandle(textInputRef), 50 + (this.props.scrollOffset || 0), true);
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

    if(this.props.scrollToBottomOnKBShow) {
      this.scrollToBottom();
    }
  }

  _onKeyboardWillHide(event) {
    const keyboardHeight = this.state.keyboardHeight;
    this.setState({keyboardHeight: 0});

    const yOffset = Math.max(this._keyboardAwareView.contentOffset.y - keyboardHeight, 0);
    this._keyboardAwareView.scrollTo({x: 0, y: yOffset, animated: true});
  }

  scrollBottomOnNextSizeChange() {
    this.state.scrollBottomOnNextSizeChange = true;
  }

  scrollToBottom(scrollAnimated = true) {
    if (this._keyboardAwareView) {

      if(!this._keyboardAwareView.contentSize) {
        setTimeout(() => this.scrollToBottom(scrollAnimated), 50);
        return;
      }

      const bottomYOffset = this._keyboardAwareView.contentSize.height - this._keyboardAwareView.layout.height + this._keyboardAwareView.props.contentInset.bottom;
      this._keyboardAwareView.scrollTo({x: 0, y: bottomYOffset, animated: scrollAnimated});
    }
  }
}

KeyboardAwareBase.propTypes = {
  startScrolledToBottom: PropTypes.bool,
  scrollToBottomOnKBShow: PropTypes.bool
};
KeyboardAwareBase.defaultProps = {
  startScrolledToBottom: false,
  scrollToBottomOnKBShow: false
};
