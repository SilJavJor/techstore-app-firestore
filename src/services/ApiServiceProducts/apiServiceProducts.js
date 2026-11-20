/* ==========================================================================
  Servicio de Datos (apiServiceProducts.js)
  Responsabilidad: Obtención de datos externos o locales (Productos)
========================================================================== */

// Importaciones 
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch,} from 'firebase/firestore';
import { db } from '../../firebase/config';

const COLLECTION_NAME = 'products';

const productsCollection = collection(db, COLLECTION_NAME);

// Obtene todos los productos
export const fetchProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Crea un producto nuevo
export const createProduct = async (productData) => {
  const docRef = await addDoc(productsCollection, productData);

  return { id: docRef.id, ...productData };
};

// Actualiza un producto existente
export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(productRef, updatedData);

  return { id, ...updatedData };
};

// Elimina un producto
export const deleteProduct = async (id) => {
  const productRef = doc(db, COLLECTION_NAME, id);

  await deleteDoc(productRef);

  return id;
};

// Carga masiva inicial desde el archico JSON
export const seedProducts = async (initialProducts) => {
  const batch = writeBatch(db);

  initialProducts.forEach(({ id, ...rest }) => {
    const newDocRef = doc(productsCollection);

    batch.set(newDocRef, rest);
  });

  await batch.commit();
};