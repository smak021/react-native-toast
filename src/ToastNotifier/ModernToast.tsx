import { ColorValue, Image,  StyleSheet,  View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type props  = {
  animStyle: {};
  toastMessage: String ;
  toastIcon ?: any,
  duration :number;
  marqueeDuration:number ;
  marqueeDelay: number ;
  backgroundColor?: ColorValue;
}

const ModernToast = (props:props) => {
  const isIconRemote =
  props.toastIcon &&
    typeof props.toastIcon === "string" &&
    (props.toastIcon.startsWith("http://") ||
      props.toastIcon.startsWith("https://") ||
      props.toastIcon.startsWith("ftp://")); 
  const estimatedWidth = props.toastMessage && props.toastMessage.length * 7;
  const translateText = useSharedValue(0);
  const isOverFlowed = estimatedWidth && estimatedWidth >= 300;
  const NumberOfTimesToBeRepeated = Math.ceil(props.duration / props.marqueeDuration) || 1;

  const marqueeAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateText.value }],
    };
  });

  const imageUri = isIconRemote ? { uri: props.toastIcon } : props.toastIcon;

  if (isOverFlowed && translateText.value === 0) {
    translateText.value = withRepeat(
      withDelay(
        props.marqueeDelay,
        withTiming(-estimatedWidth, {
          duration: props.marqueeDuration,
          easing: Easing.linear,
        })
      ),
      NumberOfTimesToBeRepeated,
      false,
      () => {
        translateText.value = 1;
      }
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: props.backgroundColor,
        },
        props.animStyle,
      ]}
    >
      <View style={styles.contentContainer}>
        {props.toastIcon && (
          <View style={styles.logoContainer}>
            <Image
              source={imageUri}
              style={{ width: "100%", height: "100%", overflow: "hidden" }}
            />
          </View>
        )}
        <View style={{ width: estimatedWidth, overflow: "hidden" }}>
          <Animated.Text style={[styles.toastText, marqueeAnimStyle]}>
            {props.toastMessage}
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default ModernToast;

const styles = StyleSheet.create({
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
