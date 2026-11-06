// lib/api.ts
// Re-exports both surfaces so existing imports from '@/lib/api' keep working.

export {apiFetch} from './api-server';

export {
  api,
  type User,
  type Role,
  type RegisterData,
  type LoginData,
  type AuthResponse,
} from './api-client';
