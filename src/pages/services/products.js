// src/services/products.js
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

// Obtener TODOS los productos
export async function getProducts() {
  const ref = collection(db, "products");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Obtener UN producto por ID
export async function getProductById(id) {
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}

// Crear un producto
export async function createProduct(productData) {
  const ref = collection(db, "products");
  const newDoc = await addDoc(ref, productData);

  return newDoc.id;
}

// Actualizar un producto
export async function updateProduct(id, data) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, data);
}

// Eliminar un producto
export async function deleteProduct(id) {
  const ref = doc(db, "products", id);
  await deleteDoc(ref);
}
