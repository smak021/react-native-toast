/// <reference types="react" />
import { ColorValue } from "react-native";
type props = {
    toastMessage?: String;
    setToastMessage?: () => void;
    duration: number;
    showButton?: boolean;
    buttonText?: String;
    textLeft?: boolean;
    buttonDisabled?: boolean;
    marqueeDuration?: number;
    onPress?: () => void;
    onAnimationEnd?: () => void;
    backgroundColor?: ColorValue;
    type?: 'modern' | 'compact';
    toastIcon?: String | null;
    marqueeDelay?: number;
};
declare const Toast: ({ toastMessage: message, setToastMessage: setMessage, duration, showButton, buttonText, textLeft, buttonDisabled, marqueeDuration, onPress, onAnimationEnd, backgroundColor, type, toastIcon, marqueeDelay, }: props) => JSX.Element | null;
export default Toast;
//# sourceMappingURL=Toast.d.ts.map