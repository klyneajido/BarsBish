// getQueue();
// addToQueue(item);
// removeFromQueue(id);
// updateQueue(item);

import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueueItem } from "../types/queue";

const QUEUE_KEY = "OFFLINE_QUEUE";

export const getQueue = async (): Promise<QueueItem[]> => {
  try {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("getQueue error:", error);
    return [];
  }
};

const saveQueue = async (queue: QueueItem[]) => {
  try {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error("saveQueue error:", error);
  }
};

export const addToQueue = async (item: QueueItem) => {
  try {
    const queue = await getQueue();
    queue.push(item);
    await saveQueue(queue);
  } catch (error) {
    console.error("addToQueue error:", error);
  }
};

export const removeFromQueue = async (id: string) => {
  try {
    const queue = await getQueue();
    const updatedQueue = queue.filter((item) => item.id !== id);
    await saveQueue(updatedQueue);
  } catch (error) {
    console.error("removeFromQueue error:", error);
  }
};

export const updateQueue = async (updatedItem: QueueItem) => {
  try {
    const queue = await getQueue();

    const updatedQueue = queue.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );

    await saveQueue(updatedQueue);
  } catch (error) {
    console.error("updateQueue error:", error);
  }
};
