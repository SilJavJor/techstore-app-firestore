/* ==========================================================================
  Servicio de Datos (apiServiceCategories.js)
  Responsabilidad: Obtención de datos externos o locales (Categorias)
========================================================================== */

// Importaciones
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch,} from 'firebase/firestore';
import { db } from '../../firebase/config';

const COLLECTION_NAME = 'brands';

const brandsCollection = collection(db, COLLECTION_NAME);

// Obtene todas las marcas
export const fetchBrands = async () => {
  const snapshot = await getDocs(brandsCollection);
  
  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Crea una marca nueva
export const createBrand = async (brandData) => {
  const docRef = await addDoc(brandsCollection, brandData);

  return { id: docRef.id, ...brandData };
};

// Actualiza una marca existente
export const updateBrand = async (id, updatedData) => {
  const brandRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(brandRef, updatedData);

  return { id, ...updatedData };
};

// Elimina una marca
export const deleteBrand = async (id) => {
  const brandRef = doc(db, COLLECTION_NAME, id);

  await deleteDoc(brandRef);

  return id;
};

// Carga masiva inicial desde el archivo JSON
export const seedBrands = async (initialBrands) => {
  const batch = writeBatch(db);

  initialBrands.forEach(({ id, ...rest }) => {
    const newDocRef = doc(brandsCollection);

    batch.set(newDocRef, rest);
  });
  await batch.commit();
};