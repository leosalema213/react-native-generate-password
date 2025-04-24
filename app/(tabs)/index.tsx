import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import ModalPassword from "@/src/components/modal";
import useStorage from "../../src/shared/hooks/useStorage";

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";

export default function Home() {
  const [caracterValue, setCaracterValue] = useState(6);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const generatePassword = () => {
    let passwordTemp = "";

    for (let i = 0, n = charset.length; i < caracterValue; i++) {
      passwordTemp += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(passwordTemp);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../src/assets/lock-icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>{caracterValue} caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor="#000"
          thumbTintColor="#392de9"
          value={caracterValue}
          step={1}
          onValueChange={setCaracterValue}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>
      <Modal transparent visible={modalVisible} animationType="fade">
        <ModalPassword
          handleClose={() => setModalVisible(false)}
          password={password}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3ff",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    marginBlockEnd: 20,
  },
  area: {
    marginBlockStart: 14,
    marginBlockEnd: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  button: {
    marginBlockStart: 14,
    backgroundColor: "#392de9",
    height: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
});
