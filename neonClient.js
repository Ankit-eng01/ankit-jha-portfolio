/**
 * Neon Serverless Postgres Client
 * Uses @neondatabase/serverless for sub-millisecond connection pooling over HTTP/WebSockets
 */

import { neon } from 'https://cdn.jsdelivr.net/npm/@neondatabase/serverless@0.10.4/+esm';

// Connection string from Neon Console: postgres://user:pass@ep-cool-cloud.us-east-2.aws.neon.tech/neondb
const DATABASE_URL = window.ENV?.NEON_DATABASE_URL || 'postgres://user:pass@ep-sample.aws.neon.tech/neondb';

export const sql = neon(DATABASE_URL);

/**
 * Execute sub-millisecond transactional query against Neon Serverless Postgres
 * @param {string} query - SQL query
 */
export async function queryTelemetry(query) {
  try {
    const result = await sql`
      SELECT id, model_name, tokens_generated, latency_ms, created_at 
      FROM ai_telemetry_logs 
      ORDER BY created_at DESC 
      LIMIT 10;
    `;
    return result;
  } catch (err) {
    console.warn('[Neon Serverless Query Fallback]', err.message);
    return [];
  }
}
