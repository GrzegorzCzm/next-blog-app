import fire from "../config/fire-config";

export const deleteDoc = async (id, collectionName) => {
  try {
    const res = await fire
      .firestore()
      .collection(collectionName)
      .doc(id)
      .delete();
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

export const getRef = async (id, collectionName) =>
  fire.firestore().collection(collectionName).doc(id);

export const setDoc = ({ collectionName, docKey, content }) =>
  fire.firestore().collection(collectionName).doc(docKey).set(content);
