/**
 * Supabase Client Configuration & Vector Database Interface
 * Uses @supabase/supabase-js for Authentication and pgvector similarity search
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Environment variables or fallback demo credentials
const SUPABASE_URL = window.ENV?.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Query vector embeddings with cosine similarity via Supabase pgvector
 * @param {number[]} embedding - Query embedding vector
 * @param {number} matchThreshold - Minimum similarity score (0.0 to 1.0)
 * @param {number} matchCount - Number of chunks to retrieve
 */
export async function matchEmbeddings(embedding, matchThreshold = 0.8, matchCount = 5) {
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('[Supabase Vector Search Fallback]', err.message);
    return [];
  }
}
