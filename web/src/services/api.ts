/**
 * API service utility for SORTES
 * 
 * This file provides a centralized place for API-related functionality.
 * Currently all data is loaded locally, but this could be expanded if
 * backend services are added in the future.
 */

import axios from 'axios';

// Type definitions for API responses
export interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Simple cache to avoid repeated fetches for the same data
const dataCache: Record<string, APIResponse<any>> = {};

// Helper function to ensure paths are correctly formed
function ensureCorrectPath(path: string): string {
  // Make sure the path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // Get the public URL base from package.json homepage or window location
  const getBasePath = (): string => {
    // Check if we're running in a GitHub Pages environment
    const isGitHubPages = window.location.hostname !== 'localhost' && 
                        !window.location.hostname.includes('127.0.0.1');
    
    if (isGitHubPages && window.location.pathname.includes('/sortes/')) {
      return '/sortes';
    }
    
    return '';
  };
  
  const basePath = getBasePath();
  
  // Check if the path already includes '/data/'
  const hasDataPath = path.includes('/data/');
  
  if (hasDataPath) {
    // If path already contains '/data/', just prepend the base path
    return `${basePath}${path}`.replace(/\/+/g, '/');
  } else if (!path.includes('/public/')) {
    // Otherwise, add both base path and data directory
    return `${basePath}/data${path}`.replace(/\/+/g, '/');
  }
  
  // Replace double slashes and return
  return path.replace(/\/+/g, '/');
}

// Helper function to simulate a local API call for data loading
export async function fetchLocalData<T>(dataPath: string): Promise<APIResponse<T>> {
  try {
    // Apply path correction
    const correctedPath = ensureCorrectPath(dataPath);
    
    const response = await axios.get(correctedPath);
    return { data: response.data, success: true };
  } catch (error: any) {
    console.error(`Error fetching ${dataPath}:`, error?.message);
    return { 
      data: null as unknown as T, 
      success: false, 
      error: error?.message || 'Unknown error' 
    };
  }
}

// Clear cache for testing or when needed
export function clearAPICache(): void {
  console.log('[API] Clearing cache');
  Object.keys(dataCache).forEach(key => {
    delete dataCache[key];
  });
}
