import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for better performance
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-03-07', // Use the latest API version from env or default
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Add the token for authenticated requests
});
