import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/db";

const COL = "contacts";

/**
 * Real-time listener (sorted by lastName, firstName).
 * @param {(items: Array) => void} cb - callback receives array of contacts
 * @returns {() => void} unsubscribe function
 */
export function listenContacts(cb) {
  const q = query(
    collection(db, COL),
    orderBy("lastName"),
  );
  const unsub = onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
  return unsub;
}

/**
 * One-time read all contacts (sorted).
 */
export async function getAllContacts() {
  const q = query(
    collection(db, COL),
    orderBy("lastName"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * One-time read single contact by id.
 */
export async function getContact(id) {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Create a contact. Required: firstName, lastName, email
 * @returns created doc id
 */
export async function createContact(data) {
  const payload = {
    firstName: data.firstName?.trim() || "",
    lastName: data.lastName?.trim() || "",
    email: data.email?.trim() || "",
    phone: data.phone?.trim() || "",
    company: data.company?.trim() || "",
    notes: data.notes?.trim() || "",
    createdAt: serverTimestamp(),
  };
  if (!payload.firstName || !payload.lastName || !payload.email) {
    throw new Error("firstName, lastName, and email are required");
  }
  const ref = await addDoc(collection(db, COL), payload);
  return ref.id;
}

/**
 * Update a contact by id.
 */
export async function updateContact(id, data) {
  const ref = doc(db, COL, id);
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  await updateDoc(ref, payload);
}


export async function deleteContact(id) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);
}


export function filterContacts(list, searchText) {
  const s = (searchText || "").trim().toLowerCase();
  if (!s) return list;
  return list.filter((c) => {
    const fn = (c.firstName || "").toLowerCase();
    const ln = (c.lastName || "").toLowerCase();
    return fn.includes(s) || ln.includes(s);
  });
}


export async function searchByLastNamePrefix(prefix) {
  const s = (prefix || "").trim();
  if (!s) return [];
  const upper = s + "\uf8ff";
  const q = query(
    collection(db, COL),
    where("lastName", ">=", s),
    where("lastName", "<=", upper),
    orderBy("lastName")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
