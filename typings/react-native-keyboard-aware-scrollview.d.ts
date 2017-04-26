
//
// Copyright © 2017-present Pouya Kary <k@karyfoundation.org>
//

declare module 'react-native-keyboard-aware-scrollview' {

    interface KeyboardAwareScrollViewProperties extends React.ScrollViewProperties {
        /**
         * Normally this component will just take care of handling the content inset.
         *  If you wish for KeyboardAwareScrollView to automatically scroll to a TextInput
         * that gets focus (so it's ensured to be visible), you can add an attribute called
         * `getTextInputRefs` - a callback in which you can return an array of references
         * to the TextInput components that auto-scrolling to be handled for.
         * 
         * KeyboardAwareScrollView will look for the focused TextInput in the array and make
         * sure it's visible by scrolling to it's location. Example:
         * ```
         * <KeyboardAwareScrollView style={styles.container}
         *              getTextInputRefs={() => { return [this._textInputRef];}}>
         *     <TextInput style={styles.textInput}
         *          placeholder={'My Input'}
         *                  ref={(r) => { this._textInputRef = r; }}/>
         * </KeyboardAwareScrollView>
         * ```
         */
        getTextInputRefs?: ( ) => __React.TextInput[ ]
    }

    interface KeyboardAwareScrollViewStatic extends React.ComponentClass<KeyboardAwareScrollViewProperties> {

    }

    /**
     * A helper component meant to be used as a drop-in replacement for
     * RN ScrollView which handles the ScrollView insets properly when the
     * keyboard is shown or hides so all the content is scrollable and
     * available to the user.
     */
    export var KeyboardAwareScrollView: KeyboardAwareScrollViewStatic
}