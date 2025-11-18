import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";

export async function addPlanToUser(uid, planId) {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, { selectedPlans: [] }, { merge: true });

  await updateDoc(userRef, {
    selectedPlans: arrayUnion(planId),
  });
}

export async function getUserPlans(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];
  return snap.data().selectedPlans || [];
}
