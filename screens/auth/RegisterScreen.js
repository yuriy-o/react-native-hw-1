import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import Logo from "../../assets/svg/add_33.svg";

export const RegisterScreen = ({ navigation }) => {
  // const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    // setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  const keyboardHideInput = () => {
    // setIsKeyboardShow(false);
    Keyboard.dismiss();
    setName("");
    setEmail("");
    setPassword("");
    console.log(`'name:' ${name}, 'email:' ${email}, 'password: ' ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        onLayout={onLayoutRootView}
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : -100}
      >
        <ImageBackground
          source={require("../../assets/images/Photo_BG.png")}
          style={styles.image}
        >
          <View style={styles.back}>
            <View style={styles.backAvatar}></View>

            <Text style={styles.textTitle}>Регистрация</Text>

            <View style={styles.form}>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                // onFocus={() => setIsKeyboardShow(true)}
              />
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                // onFocus={() => setIsKeyboardShow(true)}
              />
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                style={styles.input}
                // onFocus={() => setIsKeyboardShow(true)}
              />

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={keyboardHideInput}
                // onPress={() => navigation.navigate("PostsScreen")}
              >
                <Text style={styles.btnTitle}>Зареєструватись</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.textRegistration}>
                  Вже є обліковий запис?{" "}
                  <Text style={(styles.textRegistration, styles.textAction)}>
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    justifyContent: "flex-end",
    alignItems: "center",
  },
  back: {
    position: "relative",
    width: "100%",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backAvatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // marginTop: -60,
  },
  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 30,
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textRegistration: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textAction: {
    color: "#053f82",
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginBottom: 45,
    alignItems: "center",
  },
});
