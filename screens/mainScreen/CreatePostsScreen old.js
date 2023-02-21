import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const descriptionHandler = (text) => setDescription(text);
  const locationHandler = (text) => setLocation(text);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  const keyboardHideInput = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    setDescription("");
    setLocation("");
  };

  //! Перероблений код з try/catch на Запрос від локації
  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
      } catch (error) {
        console.log("Error getting location", error);
      }
    };

    getLocationAsync();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    setPhoto(photo.uri);
    // console.log("photo", camera);
  };
  const sendPhoto = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Публікації", { photo, description, location });
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.textPermission}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={setCamera} type={type}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.image} />
              </View>
            )}
            <View style={styles.buttonIconContainer}>
              <TouchableOpacity onPress={takePhoto} activeOpacity={0.9}>
                <View style={styles.backIcon}>
                  <Ionicons name="camera" size={24} color="#BDBDBD" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Завантажте фото</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "position" : "height"}
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isKeyboardShow ? 1 : 1,
              }}
            >
              <TextInput
                value={description}
                onChangeText={descriptionHandler}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                onFocus={() => setIsKeyboardShow(true)}
                onBlur={() => setIsKeyboardShow(false)}
              />

              <View style={styles.locationContainer}>
                <TextInput
                  value={location}
                  onChangeText={locationHandler}
                  placeholder="Місцевість"
                  placeholderTextColor="#BDBDBD"
                  style={styles.locationPlaceholder}
                  onFocus={() => setIsKeyboardShow(true)}
                  onBlur={() => setIsKeyboardShow(false)}
                />
                <Ionicons
                  style={styles.locationIcon}
                  name="location-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => {
                  sendPhoto();
                  keyboardHideInput();
                }}
              >
                <Text style={styles.btnTitle}>Опублікувати</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  cameraContainer: {
    marginHorizontal: 16,
  },
  camera: {
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 8,
  },
  buttonIconContainer: {
    flex: 4,
    justifyContent: "center",
    marginTop: 50,
  },
  backIcon: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  dataContainer: {
    marginHorizontal: 16,
  },
  dataLabel: {
    fontSize: 20,
    marginBottom: 35,
    color: "#BDBDBD",
  },

  form: {
    // marginBottom: 45,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    color: "#212121",
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  locationContainer: {
    width: "100%",
  },
  locationPlaceholder: {
    height: 50,
    paddingLeft: 30,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    position: "absolute",
    top: 11,
  },

  btnContainer: {
    alignItems: "center",
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    // fontFamily: "Roboto-Regular",
    fontSize: 20,
  },

  containerPermission: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  textPermission: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
