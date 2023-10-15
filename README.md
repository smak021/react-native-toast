# React Native Toast

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

A react native custom toast message viewer .


## Usage

```javascript
import Toast,{ ToastProvider } from '@smak021/react-native-toast'

function App(){
    return(
        <ToastProvider>
        // ...Your code goes here
            <Toast duration={3000}  backgroundColor={'#33333'}/>
        <ToastProvide>
    )
}
```


 Set toast message in other components using the useToast() hook:

```javascript
import { useToast } from '@smak021/react-native-toast'

function Component(){

const { setToastMessage } = useToast()

const handleError=()=>{
    setToastMessage('Your Toast Message')
}

return(
    //..UI
)
}

```

#### Props

| Property                              | Description                                                                                                   | Default Value    |
| --------------------------------------| --------------------------------------------------------------------------------------------------------------| -----------------|
| `duration (in milliseconds)`          | The amount of time the toast component is visible                                                             | 2000             |
| `type`                                | Compact or modern                                                                                             | modern           |
| `toastIcon`                           | *(only for modern)* Custom icon used in the toast                                                             | null             |
| `marqueeDuration  (in milliseconds)`  | *(only for modern)* The amount of time required for the text message to complete the marquee animation        | 3500             |
| `marqueeDelay  (in milliseconds)`     | *(only for modern)* The delay between each text animation                                                     | 500              |
| `backgroundColor`                     | Toast background color                                                                                        | #333333          |
| `showButton`                          | *(only for compact)* Shows a button next to message                                                           | -                |
| `onPress`                             | *(only for compact)* Function for managing the button press                                                   | -                |
| `buttonDisabled`                      | *(only for compact)* Disables the button                                                                      | false            |
| `buttonText`                          | *(only for compact)* Text rendered on the button                                                              | OK               |
| `showButton`                          | *(only for compact)* For activating the button                                                                | false            |
| `textLeft`                            | *(only for compact)* Align text to the left                                                                   | false            |
| `onAnimationEnd`                      | Function, which execute after toast is closed                                                                 | -                |

