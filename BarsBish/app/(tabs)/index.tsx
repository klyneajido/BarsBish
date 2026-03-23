import { Alert, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { addToQueue, getQueue } from "@/src/lib/queueStorage";

export default function HomeScreen() {
  const handleAddAction = async () => {
    const item = {
      id: Math.random().toString(36).substring(2, 15),
      endpoint: "/notes",
      method: "POST" as const,
      payload: { content: "Test offline note" },
      retries: 0,
      status: "pending" as const,
      createdAt: Date.now(),
    };

    await addToQueue(item);

    const queue = await getQueue();
    console.log("QUEUE:", queue);

    Alert.alert("Added to Queue", `Total items: ${queue.length}`);
  };
  return (
    <ThemedView style={{ marginTop: 20 }}>
      <Pressable
        onPress={handleAddAction}
        style={{
          backgroundColor: "#4CAEDB",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <ThemedText style={{ color: "white", fontWeight: "bold" }}>
          Add
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
