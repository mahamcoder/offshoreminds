import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const LOCAL_STORAGE_KEY = 'om_cms_pages';

export const getLocalPages = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading local CMS pages:', e);
    return [];
  }
};

export const setLocalPages = (pages) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    console.error('Error saving local CMS pages:', e);
  }
};

// Deeply sanitize an object to ensure no `undefined` values are passed to Firestore
export const sanitizeData = (obj) => {
  if (obj === undefined) return null;
  return JSON.parse(JSON.stringify(obj, (key, value) => (value === undefined ? null : value)));
};

/**
 * Fetch pages from Firestore and merge with any locally created pages
 */
export const getAllPages = async () => {
  const localList = getLocalPages();
  let firestoreList = [];

  try {
    const q = query(collection(db, 'pages'), orderBy('updatedAt', 'desc'));
    const snap = await getDocs(q);
    firestoreList = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      isCloudSynced: true
    }));
  } catch (err) {
    // Try fallback without orderBy
    try {
      const snap = await getDocs(collection(db, 'pages'));
      firestoreList = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        isCloudSynced: true
      }));
    } catch (fErr) {
      console.warn('Firestore pages fetch warning:', fErr.message);
    }
  }

  // Merge: Firestore documents take priority, but keep local pages that aren't in Firestore yet
  const mergedMap = new Map();

  // First add local pages
  localList.forEach(p => {
    mergedMap.set(p.slug || p.id, { ...p, isCloudSynced: Boolean(p.isCloudSynced) });
  });

  // Overwrite / add Firestore pages
  firestoreList.forEach(p => {
    mergedMap.set(p.slug || p.id, { ...p, isCloudSynced: true });
  });

  const merged = Array.from(mergedMap.values());
  // Keep local storage in sync
  setLocalPages(merged);
  return merged;
};

/**
 * Save (create or update) a page with dual Firestore + Local persistence
 */
export const savePage = async (pageData, isExistingId = null) => {
  const sanitized = sanitizeData({
    ...pageData,
    updatedAt: new Date().toISOString()
  });

  let savedPage = null;
  let cloudError = null;

  // 1. Try to save to Firestore
  try {
    if (isExistingId && !isExistingId.startsWith('local-')) {
      const docPayload = {
        ...sanitized,
        updatedAt: serverTimestamp()
      };
      await updateDoc(doc(db, 'pages', isExistingId), docPayload);
      savedPage = { id: isExistingId, ...sanitized, isCloudSynced: true };
    } else {
      const docPayload = {
        ...sanitized,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'pages'), docPayload);
      savedPage = { id: docRef.id, ...sanitized, isCloudSynced: true };
    }
  } catch (err) {
    console.warn('Firestore write failed, falling back to local storage:', err);
    cloudError = err;

    // Local fallback
    const localId = isExistingId || `local-${Date.now()}`;
    savedPage = {
      id: localId,
      ...sanitized,
      createdAt: sanitized.createdAt || new Date().toISOString(),
      isCloudSynced: false
    };
  }

  // 2. Always persist into local storage
  const currentList = getLocalPages();
  const existingIndex = currentList.findIndex(p => p.id === savedPage.id || (p.slug && p.slug === savedPage.slug));

  let updatedList;
  if (existingIndex !== -1) {
    updatedList = currentList.map((p, idx) => (idx === existingIndex ? savedPage : p));
  } else {
    updatedList = [savedPage, ...currentList];
  }
  setLocalPages(updatedList);

  return {
    page: savedPage,
    isCloudSynced: !cloudError,
    cloudError
  };
};

/**
 * Delete a page from both Firestore and local storage
 */
export const deletePage = async (pageId) => {
  try {
    if (pageId && !pageId.startsWith('local-')) {
      await deleteDoc(doc(db, 'pages', pageId));
    }
  } catch (err) {
    console.warn('Firestore delete failed:', err);
  }

  const currentList = getLocalPages();
  const filtered = currentList.filter(p => p.id !== pageId);
  setLocalPages(filtered);
};

/**
 * Get a single page by slug or id (checks Firestore, then local storage)
 */
export const getPageBySlugOrId = async (slugOrId) => {
  if (!slugOrId) return null;

  // 1. Try Firestore by slug
  try {
    const q = query(collection(db, 'pages'), orderBy('updatedAt', 'desc'));
    const snap = await getDocs(q);
    const found = snap.docs.find(d => {
      const data = d.data();
      return data.slug === slugOrId || d.id === slugOrId;
    });
    if (found) {
      return { id: found.id, ...found.data(), isCloudSynced: true };
    }
  } catch (_) {
    // try direct getDoc
    try {
      const dRef = doc(db, 'pages', slugOrId);
      const dSnap = await getDoc(dRef);
      if (dSnap.exists()) {
        return { id: dSnap.id, ...dSnap.data(), isCloudSynced: true };
      }
    } catch (__) {}
  }

  // 2. Fallback to local storage
  const localList = getLocalPages();
  const localFound = localList.find(p => p.slug === slugOrId || p.id === slugOrId);
  return localFound || null;
};
