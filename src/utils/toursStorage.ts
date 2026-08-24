import { TourPackage, SignatureExperience } from '../types';
import { TOURS_DATA } from '../data/toursData';
import { EXPERIENCES_DATA } from '../data/experiencesData';

const TOURS_STORAGE_KEY = 'stt_custom_tours_v1';
const EXPERIENCES_STORAGE_KEY = 'stt_custom_experiences_v1';

// Initial retrieval
export function getInitialTours(): TourPackage[] {
  try {
    const local = localStorage.getItem(TOURS_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read local tours:', e);
  }
  return TOURS_DATA;
}

export function getInitialExperiences(): SignatureExperience[] {
  try {
    const local = localStorage.getItem(EXPERIENCES_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read local experiences:', e);
  }
  return EXPERIENCES_DATA;
}

// Fetch from API with local fallback
export async function fetchToursFromApi(): Promise<TourPackage[]> {
  try {
    const res = await fetch('/api/tours');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.tours)) {
        localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(data.tours));
        return data.tours;
      }
    }
  } catch (err) {
    console.warn('Using local tours cache:', err);
  }
  return getInitialTours();
}

export async function fetchExperiencesFromApi(): Promise<SignatureExperience[]> {
  try {
    const res = await fetch('/api/experiences');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.experiences)) {
        localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(data.experiences));
        return data.experiences;
      }
    }
  } catch (err) {
    console.warn('Using local experiences cache:', err);
  }
  return getInitialExperiences();
}

// Save & Sync Tours
export async function saveTourToServer(tour: TourPackage, isNew = false): Promise<TourPackage> {
  try {
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/admin/tours' : `/api/admin/tours/${tour.id}`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tour),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.tour) {
        return data.tour;
      }
    }
  } catch (e) {
    console.error('Server sync failed, saved locally:', e);
  }
  return tour;
}

export async function deleteTourFromServer(tourId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/tours/${tourId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = await res.json();
      return !!data.success;
    }
  } catch (e) {
    console.error('Server delete failed, deleting locally:', e);
  }
  return true;
}

export async function resetToursOnServer(): Promise<TourPackage[]> {
  try {
    const res = await fetch('/api/admin/tours/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.tours)) {
        localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(data.tours));
        return data.tours;
      }
    }
  } catch (e) {
    console.error('Server reset failed:', e);
  }
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(TOURS_DATA));
  return TOURS_DATA;
}

// Save & Sync Experiences
export async function saveExperienceToServer(exp: SignatureExperience, isNew = false): Promise<SignatureExperience> {
  try {
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/admin/experiences' : `/api/admin/experiences/${exp.id}`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exp),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.experience) {
        return data.experience;
      }
    }
  } catch (e) {
    console.error('Server sync failed for experience:', e);
  }
  return exp;
}

export async function deleteExperienceFromServer(expId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/experiences/${expId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = await res.json();
      return !!data.success;
    }
  } catch (e) {
    console.error('Server delete failed for experience:', e);
  }
  return true;
}

export async function resetExperiencesOnServer(): Promise<SignatureExperience[]> {
  try {
    const res = await fetch('/api/admin/experiences/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.experiences)) {
        localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(data.experiences));
        return data.experiences;
      }
    }
  } catch (e) {
    console.error('Server reset failed:', e);
  }
  localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(EXPERIENCES_DATA));
  return EXPERIENCES_DATA;
}

// Helper to persist list locally
export function persistLocalTours(tours: TourPackage[]) {
  try {
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
    window.dispatchEvent(new CustomEvent('stt_tours_updated', { detail: tours }));
  } catch (e) {
    console.error('Failed to persist local tours:', e);
  }
}

export function persistLocalExperiences(experiences: SignatureExperience[]) {
  try {
    localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(experiences));
    window.dispatchEvent(new CustomEvent('stt_experiences_updated', { detail: experiences }));
  } catch (e) {
    console.error('Failed to persist local experiences:', e);
  }
}
