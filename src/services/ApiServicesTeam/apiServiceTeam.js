/* ==========================================================================
  Servicio de Datos (apiServicTeam.js)
  Responsabilidad: Obtención de datos externos o locales (Equipo)
========================================================================== */

// Obtener los datos de Equips
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch,} from 'firebase/firestore';
import { db } from '../../firebase/config';

const COLLECTION_NAME = 'teams';

const teamsCollection = collection(db, COLLECTION_NAME);

// Obtene todo el equipo
export const fetchTeams = async () => {
  const snapshot = await getDocs(teamsCollection);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Crea un integrante nuevo
export const createTeam = async (teamData) => {
  const docRef = await addDoc(teamsCollection, teamData);

  return { id: docRef.id, ...teamData };
};

// Actualiza un integrante
export const updateTeam = async (id, updatedData) => {
  const teamRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(teamRef, updatedData);

  return { id, ...updatedData };
};

// Elimina un integrante
export const deleteTeam = async (id) => {
  const teamRef = doc(db, COLLECTION_NAME, id);

  await deleteDoc(teamRef);

  return id;
};

// Carga masiva inicial desde tus JSON semilla
export const seedTeams = async (initialTeams) => {
  const batch = writeBatch(db);

  initialTeams.forEach(({ id, ...rest }) => {
    const newDocRef = doc(teamsCollection);

    batch.set(newDocRef, rest);
  });

  await batch.commit();
};