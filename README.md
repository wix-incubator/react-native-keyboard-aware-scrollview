# react-native-keyboard-aware-scrollview
A helper component meant to be used as a drop-in replacement for RN ScrollView which handles the ScrollView insets properly when the keyboard is shown or hides so all the content is scrollable and available to the user.

## Installation

Install using `npm`:
```
npm i react-native-keyboard-aware-scrollview --save
```

## How To Use
Simply import the new component:

```js
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
```

Now use it as you would normally do with a `ScrollView` to wrap arround TextInput components:

```jsx
<KeyboardAwareScrollView style={styles.container}>
    <TextInput style={styles.textInput} placeholder={'My Input'}/>
</KeyboardAwareScrollView>
```

#### Auto-Scrolling for TextInput components

Normally this component will just take care of handling the content inset. If you wish for `KeyboardAwareScrollView` to automatically scroll to a TextInput that gets focus (so it's ensured to be visible), you can add an attribute called `getTextInputRefs` - a callback in which you can return an array of references to the TextInput components that auto-scrolling to be handled for. `KeyboardAwareScrollView` will look for the focused TextInput in the array and make sure it's visible by scrolling to it's location.

Example:

```jsx
<KeyboardAwareScrollView style={styles.container} getTextInputRefs={() => { return [this._textInputRef];}}>
    <TextInput style={styles.textInput} placeholder={'My Input'} ref={(r) => { this._textInputRef = r; }}/>
</KeyboardAwareScrollView>
```

## Example Project

Check out the full example project [here](https://github.com/wix/react-native-keyboard-aware-scrollview/tree/master/example).

In the example folder, perform `npm install` and then run it from the Xcode project.
