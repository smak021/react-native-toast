
import React, { useContext, useState } from "react";
import { ColorValue, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ModernToast from "./ModernToast";
import { ToastContext } from "./ToastProvider";

type props = {
  toastMessage?: String;
  setToastMessage?: ()=>void;
  duration :number;
  showButton ?: boolean,
  buttonText ?: String,
  textLeft ?: boolean,
  buttonDisabled ?:boolean,
  marqueeDuration ?: number,
  onPress ?: () => void ,
  onAnimationEnd ?: () => void ,
  backgroundColor ?: ColorValue,
  type ?:'modern'|'compact',
  toastIcon ?: String | null,
  marqueeDelay ?: number,
}

const Toast = ({
  toastMessage: message = "",
  setToastMessage: setMessage = () => {},
  duration = 2000,
  showButton = false,
  buttonText = "OK",
  textLeft = false,
  buttonDisabled = false,
  marqueeDuration = 3500,
  onPress = () => {},
  onAnimationEnd = () => {},
  backgroundColor = "#333333",
  type = 'modern',
  toastIcon = null,
  marqueeDelay = 500,
}:props) => {

  
  const context:any = useContext(ToastContext)
  const [toastMessage, setToastMessage] =context
    ? context
    : [message, setMessage];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const animValue = useSharedValue(0);

  const handleAnimationEnd = () => {
    setToastMessage(null);
    setIsModalOpen(false);
    onAnimationEnd();
  };

  const closeModal = () => {
    animValue.value = withTiming(
      0,
      {
        duration: 200,
        easing: Easing.ease,
      },
      () => {
        runOnJS(handleAnimationEnd)();
      }
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
    animValue.value = withTiming(1, {
      duration: 200,
      easing: Easing.ease,
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

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "transparent",
    opacity: 1,
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animValue.value }],
      opacity: animValue.value,
    };
  });

  if (!isModalOpen) {
    return null;
  }

  const errorMessage =
    typeof toastMessage === "string"
      ? toastMessage
      : typeof toastMessage?.message === "string"
      ? toastMessage.message
      : typeof toastMessage?.errorMessage === "string"
      ? toastMessage.errorMessage
      : "Something Went Wrong";

  if (type==='modern') {
    return (
      <ModernToast
        backgroundColor={backgroundColor}
        animStyle={animStyle}
        marqueeDelay={marqueeDelay}
        marqueeDuration={marqueeDuration}
        duration={duration}
        toastMessage={toastMessage}
        toastIcon={toastIcon}
      />
    );
  }
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        { justifyContent: showButton || textLeft ? "space-between" : "center" },
        animStyle,
        { backgroundColor: backgroundColor },
      ]}
    >
      <Text style={styles.message} numberOfLines={1}>{errorMessage}</Text>
      {showButton && (
        <Pressable
          style={[{ ...buttonStyle }, styles.button]}
          onPress={() => onPress()}
          onPressIn={() => {
            setButtonStyle({
              ...buttonStyle,
              backgroundColor: "grey",
              opacity: 0.5,
            });
          }}
          onPressOut={() => {
            setButtonStyle({
              ...buttonStyle,
              backgroundColor: "transparent",
              opacity: 1,
            });
          }}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
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
    flex:1,
  },
});
