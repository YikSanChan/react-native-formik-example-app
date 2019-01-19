import React from "react";
import { FormLabel, FormValidationMessage } from "react-native-elements";
import { Image, TouchableOpacity, View } from "react-native";
import { ImagePicker as ExpoImagePicker, Permissions } from "expo";

const defaultImageUri = "https://facebook.github.io/react/logo-og.png";

const MaybeImage = ({ uri }) => (
  <Image
    source={{ uri: uri ? uri : defaultImageUri }}
    style={{ width: 200, height: 200, alignSelf: "center" }}
  />
);

const handleImagePick = async () => {
  try {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const pickerResult = await ExpoImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      return !pickerResult.cancelled ? pickerResult.uri : null;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

const ImagePicker = ({ value, onImagePick }) => (
  <View>
    <TouchableOpacity
      onPress={() => handleImagePick().then(value => onImagePick(value))}
    >
      <MaybeImage uri={value} />
    </TouchableOpacity>
  </View>
);

export const ImageInputField = ({ label, value, error, handleChange }) => (
  <View>
    <FormLabel>{label}</FormLabel>
    <ImagePicker value={value} onImagePick={handleChange} />
    <FormValidationMessage>{error}</FormValidationMessage>
  </View>
);
