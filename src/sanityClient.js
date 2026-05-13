import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '9onhlsbk', 
  dataset: 'production',
  useCdn: true, // This makes it fast and free
  apiVersion: '2026-05-12', 
});