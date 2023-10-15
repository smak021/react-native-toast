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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ModernToast_1 = __importDefault(require("./ModernToast"));
const ToastProvider_1 = require("./ToastProvider");
const Toast = ({ toastMessage: message = "", setToastMessage: setMessage = () => { }, duration = 2000, showButton = false, buttonText = "OK", textLeft = false, buttonDisabled = false, marqueeDuration = 3500, onPress = () => { }, onAnimationEnd = () => { }, backgroundColor = "#333333", type = 'modern', toastIcon = null, marqueeDelay = 500, }) => {
    const context = (0, react_1.useContext)(ToastProvider_1.ToastContext);
    const [toastMessage, setToastMessage] = context
        ? context
        : [message, setMessage];
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const animValue = (0, react_native_reanimated_1.useSharedValue)(0);
    const handleAnimationEnd = () => {
        setToastMessage(null);
        setIsModalOpen(false);
        onAnimationEnd();
    };
    const closeModal = () => {
        animValue.value = (0, react_native_reanimated_1.withTiming)(0, {
            duration: 200,
            easing: react_native_reanimated_1.Easing.ease,
        }, () => {
            (0, react_native_reanimated_1.runOnJS)(handleAnimationEnd)();
        });
    };
    const openModal = () => {
        setIsModalOpen(true);
        animValue.value = (0, react_native_reanimated_1.withTiming)(1, {
            duration: 200,
            easing: react_native_reanimated_1.Easing.ease,
        });
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            closeModal();
        }, duration);
    };
    if (!isModalOpen && Boolean(toastMessage)) {
        openModal();
    }
    const [buttonStyle, setButtonStyle] = (0, react_1.useState)({
        backgroundColor: "transparent",
        opacity: 1,
    });
    const animStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            transform: [{ scale: animValue.value }],
            opacity: animValue.value,
        };
    });
    if (!isModalOpen) {
        return null;
    }
    const errorMessage = typeof toastMessage === "string"
        ? toastMessage
        : typeof (toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.message) === "string"
            ? toastMessage.message
            : typeof (toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.errorMessage) === "string"
                ? toastMessage.errorMessage
                : "Something Went Wrong";
    if (type === 'modern') {
        return (<ModernToast_1.default backgroundColor={backgroundColor} animStyle={animStyle} marqueeDelay={marqueeDelay} marqueeDuration={marqueeDuration} duration={duration} toastMessage={toastMessage} toastIcon={toastIcon}/>);
    }
    return (<react_native_reanimated_1.default.View style={[
            styles.container,
            { backgroundColor: backgroundColor },
            { justifyContent: showButton || textLeft ? "space-between" : "center" },
            animStyle,
            { backgroundColor: backgroundColor },
        ]}>
      <react_native_1.Text style={styles.message} numberOfLines={1}>{errorMessage}</react_native_1.Text>
      {showButton && (<react_native_1.Pressable style={[Object.assign({}, buttonStyle), styles.button]} onPress={() => onPress()} onPressIn={() => {
                setButtonStyle(Object.assign(Object.assign({}, buttonStyle), { backgroundColor: "grey", opacity: 0.5 }));
            }} onPressOut={() => {
                setButtonStyle(Object.assign(Object.assign({}, buttonStyle), { backgroundColor: "transparent", opacity: 1 }));
            }} disabled={buttonDisabled}>
          <react_native_1.Text style={styles.buttonText}>{buttonText}</react_native_1.Text>
        </react_native_1.Pressable>)}
    </react_native_reanimated_1.default.View>);
};
exports.default = Toast;
const styles = react_native_1.StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonText: {
        color: "#ff4081",
    },
    container: {
        alignItems: "center",
        borderRadius: 5,
        bottom: 10,
        elevation: 5,
        flexDirection: "row",
        left: 0,
        marginBottom: 10,
        marginHorizontal: 20,
        minHeight: 50,
        paddingHorizontal: 20,
        position: "absolute",
        right: 0,
        zIndex: 999,
    },
    message: {
        color: "#ffffff",
        fontSize: 16,
        flex: 1,
    },
});
//# sourceMappingURL=Toast.js.map