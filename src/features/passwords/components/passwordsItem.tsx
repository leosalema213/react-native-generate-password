import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface IPasswordItem {
  data: string;
  removePassword: () => void;
}

export default function PasswordsItem({ data, removePassword }: IPasswordItem) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      <Text style={styles.title}>{passwordVisible ? data : "************"}</Text>
      <Ionicons
        onPress={() => setPasswordVisible(!passwordVisible)}
        name={passwordVisible ? "eye-off" : "eye"}
        color="#fff"
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBlockEnd: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
  },
});
