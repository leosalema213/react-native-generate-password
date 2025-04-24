import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useStorage from "@/src/shared/hooks/useStorage";
import PasswordsItem from "@/src/features/passwords/components/passwordsItem";

export default function savePasswords() {
  const [listPassword, setListPassword] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  const handleDeletePassword = async (item: string) => {
    const passwords = await removeItem("@pass", item);

    setListPassword(passwords);
  };

  useEffect(() => {
    const loadPassword = async () => {
      const passwords = await getItem("@pass");

      setListPassword(passwords);
    };

    loadPassword();
  }, [focused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Senhas</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={listPassword}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordsItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392DE9",
    paddingBlockStart: 58,
    paddingBlockEnd: 14,
    paddingInlineEnd: 14,
    paddingInlineStart: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingInlineEnd: 14,
    paddingInlineStart: 14,
  },
  list: {
    flex: 1,
    paddingBlockStart: 14,
  },
});
