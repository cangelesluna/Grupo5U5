import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";

// ⭐ Agregar un plan seleccionado al usuario
export async function addPlanToUser(uid, planId) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    selectedPlans: arrayUnion(planId),
  });
}

// ⭐ Obtener los planes seleccionados del usuario
export async function getUserPlans(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return [];

  const data = snap.data();
  return data.selectedPlans || [];
}
