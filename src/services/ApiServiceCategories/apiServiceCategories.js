/* ==========================================================================
  Servicio de Datos (apiServiceCategories.js)
  Responsabilidad: Obtención de datos externos o locales (Categorias)
========================================================================== */

// Importaciones
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch,} from 'firebase/firestore';
import { db } from '../../firebase/config';

const COLLECTION_NAME = 'categories';

const categoriesCollection = collection(db, COLLECTION_NAME);

// Obtene todas las categorias
export const fetchCategories = async () => {
  const snapshot = await getDocs(categoriesCollection);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Crea una categoria nueva
export const createCategory = async (categoryData) => {
  const docRef = await addDoc(categoriesCollection, categoryData);

  return { id: docRef.id, ...categoryData };
};

// Actualiza un categoria existente
export const updateCategory = async (id, updatedData) => {
  const categoryRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(categoryRef, updatedData);

  return { id, ...updatedData };
};

// Elimina un categoria
export const deleteCategory = async (id) => {
  const categoryRef = doc(db, COLLECTION_NAME, id);

  await deleteDoc(categoryRef);

  return id;
};

// Carga masiva inicial desde el archico JSON
export const seedCategories = async (initialcategories) => {
  const batch = writeBatch(db);
  initialcategories.forEach(({ id, ...rest }) => {
    const newDocRef = doc(categoriesCollection);
    batch.set(newDocRef, rest);
  });
  await batch.commit();
};