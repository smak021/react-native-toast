"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_1 = __importDefault(require("react"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ModernToast = (props) => {
    const isIconRemote = props.toastIcon &&
        typeof props.toastIcon === "string" &&
        (props.toastIcon.startsWith("http://") ||
            props.toastIcon.startsWith("https://") ||
            props.toastIcon.startsWith("ftp://"));
    const estimatedWidth = props.toastMessage && props.toastMessage.length * 7;
    const translateText = (0, react_native_reanimated_1.useSharedValue)(0);
    const isOverFlowed = estimatedWidth && estimatedWidth >= 300;
    const NumberOfTimesToBeRepeated = Math.ceil(props.duration / props.marqueeDuration) || 1;
    const marqueeAnimStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            transform: [{ translateX: translateText.value }],
        };
    });
    const imageUri = isIconRemote ? { uri: props.toastIcon } : props.toastIcon;
    if (isOverFlowed && translateText.value === 0) {
        translateText.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withDelay)(props.marqueeDelay, (0, react_native_reanimated_1.withTiming)(-estimatedWidth, {
            duration: props.marqueeDuration,
            easing: react_native_reanimated_1.Easing.linear,
        })), NumberOfTimesToBeRepeated, false, () => {
            translateText.value = 1;
        });
    }
    return (<react_native_reanimated_1.default.View style={[
            styles.container,
            {
                backgroundColor: props.backgroundColor,
            },
            props.animStyle,
        ]}>
      <react_native_1.View style={styles.contentContainer}>
        {props.toastIcon && (<react_native_1.View style={styles.logoContainer}>
            <react_native_1.Image source={imageUri} style={{ width: "100%", height: "100%", overflow: "hidden" }}/>
          </react_native_1.View>)}
        <react_native_1.View style={{ width: estimatedWidth, overflow: "hidden" }}>
          <react_native_reanimated_1.default.Text style={[styles.toastText, marqueeAnimStyle]}>
            {props.toastMessage}
          </react_native_reanimated_1.default.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_reanimated_1.default.View>);
};
exports.default = ModernToast;
const styles = react_native_1.StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 45,
        height: 50,
        borderRadius: 50,
        margin: "auto",
        alignSelf: "center",
        paddingHorizontal: 20,
        justifyContent: "center",
        paddingVertical: 5,
    },
    logoContainer: {
        backgroundColor: "grey",
        width: 25,
        height: 25,
        borderRadius: 20,
        overflow: "hidden",
    },
    contentContainer: {
        gap: 10,
        flexDirection: "row",
        maxWidth: 300,
        minWidth: 100,
        overflow: "hidden",
        alignItems: "center",
    },
    toastText: {
        position: "relative",
        color: "white",
        transform: [{ translateX: -0 }],
    },
});
//# sourceMappingURL=ModernToast.js.map