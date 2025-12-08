// src/services/service.js
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase"; // ruta según tu estructura

const COLECCION = "monitoreo";

/**
 * Escucha en tiempo real la colección "monitoreo".
 * onUpdate recibe el array de documentos; onError recibe el error (opcional)
 * Devuelve la función unsubscribe.
 */
export function listenMonitoreo(onUpdate, onError) {
  try {
    const q = query(collection(db, COLECCION), orderBy("fecha", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        onUpdate(arr);
      },
      (err) => {
        console.error("listenMonitoreo - onSnapshot error:", err);
        if (onError) onError(err);
      }
    );
    return unsub;
  } catch (err) {
    console.error("listenMonitoreo error:", err);
    if (onError) onError?.(err);
    return () => {};
  }
}

/**
 * Agrega un documento a la colección.
 * Retorna el id creado.
 */
export async function addMonitoreo(data) {
  try {
    const docRef = await addDoc(collection(db, COLECCION), {
      actividad: data.actividad || "sin actividad",
      usuario: data.usuario || "anónimo",
      fecha: serverTimestamp(), // timestamp de servidor
    });
    return docRef.id;
  } catch (err) {
    console.error("addMonitoreo error:", err);
    throw err;
  }
}

/**
 * Elimina un documento por id.
 */
export async function deleteMonitoreo(id) {
  try {
    await deleteDoc(doc(db, COLECCION, id));
  } catch (err) {
    console.error("deleteMonitoreo error:", err);
    throw err;
  }
}
