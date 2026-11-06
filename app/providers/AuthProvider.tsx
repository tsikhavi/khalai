'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {loginAction, registerAction, logoutAction} from '@/lib/actions/auth';

export interface User {
  id: number;
  email: string;
  phone: string | null;
  name: string;
  age: number;
  bio: string | null;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  birthDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  bio?: string;
  acceptedTerms: boolean;
}

export interface LoginData {
  identifier: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const defaultContext: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  register: async () => {
    throw new Error('register() called outside of AuthProvider');
  },
  login: async () => {
    throw new Error('login() called outside of AuthProvider');
  },
  logout: async () => {
    throw new Error('logout() called outside of AuthProvider');
  },
  refreshUser: async () => {
    throw new Error('refreshUser() called outside of AuthProvider');
  },
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current user from cookie-backed /api/auth/me
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/me', {cache: 'no-store'});
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/me', {cache: 'no-store'});
        const data = res.ok ? await res.json() : null;
        if (!cancelled) setUser(data);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const fd = new FormData();
    fd.set('name', data.name);
    fd.set('email', data.email);
    fd.set('password', data.password);
    fd.set('age', String(data.age));
    if (data.phone) fd.set('phone', data.phone);
    if (data.bio) fd.set('bio', data.bio);

    // Throws NEXT_REDIRECT on success (redirect inside the action).
    await registerAction(fd);
  }, []);

  const login = useCallback(async (data: LoginData) => {
    const fd = new FormData();
    fd.set('identifier', data.identifier);
    fd.set('password', data.password);

    await loginAction(fd);
  }, []);

  const logout = useCallback(async () => {
    await logoutAction();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        register,
        login,
        logout,
        refreshUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
