import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import useStorage from "@/src/shared/hooks/useStorage";

interface IModal {
  password: string;
  handleClose: () => void;
}

export default function ModalPassword({ password, handleClose }: IModal) {
  const { saveItem } = useStorage();

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);
    Alert.alert("Senha salva com sucesso!");
    await saveItem("@pass", password);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha gerada:</Text>

        <Pressable style={styles.innerPassword} onPress={handleCopyPassword}>
          <Text style={styles.password}>{password}</Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={handleClose} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleCopyPassword}
          >
            <Text style={styles.buttonSaveText}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    paddingBlockStart: 24,
    paddingBlockEnd: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBlockEnd: 24,
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  password: {
    color: "#fff",
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBlockStart: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginBlockStart: 14,
    marginBlockEnd: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
