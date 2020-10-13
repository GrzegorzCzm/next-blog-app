import fire from "../config/fire-config";

export const getDocList = async (collectionName, callbackFn) => {
  await fire
    .firestore()
    .collection(collectionName)
    .onSnapshot((snap) => {
      const docList = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callbackFn(docList);
    });
};

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

export const getTagsSet = async (collectionName) => {
  const tagSet = new Set();

  const collectionRef = fire.firestore().collection(collectionName);
  const snapshot = await collectionRef.get();

  snapshot.forEach((doc) => {
    const docData = doc.data();
    docData.tags?.forEach((tag) => tagSet.add(tag));
  });
  return tagSet;
};
