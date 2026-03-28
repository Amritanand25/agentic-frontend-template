# Basic API Integration Example

This example shows how to set up TanStack Query with Axios for API integration.

## 1. Setup Axios Instances

### File: `apps/web/src/api/axios-instances.ts`

```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { queryClient } from "./query-client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

// AuthInstance - for private/authenticated API calls
export const AuthInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // ✅ CRITICAL: Send httpOnly cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

// GeneralInstance - for public API calls (no auth)
export const GeneralInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add tenant ID
AuthInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ SECURE: Auth token automatically sent via httpOnly cookie
    // Backend sets: Set-Cookie: access_token=xxx; HttpOnly; Secure; SameSite=Strict
    // Browser auto-includes cookie in requests - no manual handling needed!

    // Add tenant ID from sessionStorage (not sensitive)
    const tenantId = sessionStorage.getItem("tenant_id");
    if (tenantId && config.headers) {
      config.headers["X-Tenant-ID"] = tenantId;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle errors
AuthInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 Unauthorized - token expired, try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ✅ SECURE: Refresh token stored in httpOnly cookie
        // Backend automatically reads refresh_token from cookie
        await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }, // Send cookies with request
        );

        // ✅ Backend sets new access_token cookie automatically
        // No need to manually store - just retry the request
        return AuthInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 403 Forbidden - no permission
    if (error.response?.status === 403) {
      console.error("Access denied");
      // Could redirect to "no permission" page
    }

    // 429 Too Many Requests - rate limited
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded");
      // Could show a toast notification
    }

    return Promise.reject(error);
  },
);
```

## Important: Token Security with httpOnly Cookies

**✅ SECURE: Tokens stored in httpOnly cookies**

With this setup:

- **Backend** sets tokens as httpOnly cookies (JavaScript cannot access them)
- **Browser** automatically sends cookies with every request
- **Frontend** doesn't need to manually handle tokens (browser does it!)

```typescript
// Backend sets cookie (Express example):
res.cookie("access_token", token, {
  httpOnly: true, // ✅ Cannot be accessed by JavaScript (XSS protection)
  secure: true, // ✅ Only sent over HTTPS
  sameSite: "strict", // ✅ CSRF protection
  maxAge: 15 * 60 * 1000, // 15 minutes
});
```

**Why httpOnly cookies?**

- ❌ localStorage is vulnerable to XSS attacks
- ✅ httpOnly cookies cannot be accessed by JavaScript
- ✅ Browser automatically includes cookies in requests
- ✅ No manual token management needed

> **📚 For full security details**, see [security-guardian skill](../../security-guardian/references/input-validation-example.md)

---

## 2. Setup TanStack Query

### File: `apps/web/src/api/query-client.ts`

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache configuration
      staleTime: 15 * 60 * 1000, // 15 min - data considered fresh
      gcTime: 30 * 60 * 1000, // 30 min - cache persists in memory (was cacheTime)

      // Retry configuration
      retry: 2, // Retry failed requests 2 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch configuration
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: true, // Refetch on network reconnect
      refetchOnMount: false, // Use cache if available
    },
    mutations: {
      retry: 1, // Retry mutations once on failure
    },
  },
});
```

### File: `src/main.tsx`

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './api/query-client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* DevTools - only shows in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
```

## 3. Create API Functions

### File: `apps/web/src/features/users/api/get-users.ts`

```typescript
import { AuthInstance } from "@/api/axios-instances";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
  const { data } = await AuthInstance.get<User[]>("/users");
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await AuthInstance.get<User>(`/users/${id}`);
  return data;
}
```

### File: `apps/web/src/features/users/api/create-user.ts`

```typescript
import { AuthInstance } from "@/api/axios-instances";
import { User } from "./get-users";

export interface CreateUserDto {
  name: string;
  email: string;
}

export async function createUser(dto: CreateUserDto): Promise<User> {
  const { data } = await AuthInstance.post<User>("/users", dto);
  return data;
}
```

## 4. Create Query Hooks

### File: `apps/web/src/features/users/hooks/use-users.ts`

```typescript
import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "../api/get-users";

// Get all users
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 15 * 60 * 1000, // 15 min
  });
}

// Get single user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only fetch if ID exists
    staleTime: 30 * 60 * 1000, // 30 min - user profiles change rarely
  });
}
```

### File: `apps/web/src/features/users/hooks/use-create-user.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, CreateUserDto } from "../api/create-user";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
      // Could show error toast here
    },
  });
}
```

## 5. Use in Components

### File: `apps/web/src/features/users/components/user-list.tsx`

```tsx
import { useUsers } from "../hooks/use-users";
import { UserCard } from "./user-card";

export function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### File: `apps/web/src/features/users/components/create-user-form.tsx`

```tsx
import { useState } from "react";
import { useCreateUser } from "../hooks/use-create-user";
import { Button } from "@repo/ui";

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(
      { name, email },
      {
        onSuccess: () => {
          // Reset form
          setName("");
          setEmail("");
          alert("User created successfully!");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Button type="submit" isLoading={isPending}>
        Create User
      </Button>
    </form>
  );
}
```

## Key Patterns

1. **Two Axios instances** - AuthInstance (private), GeneralInstance (public)
2. **Interceptors** - Auto-add token, handle 401/403/429 errors
3. **Token refresh** - Automatic retry with new token on 401
4. **Multi-tenant** - X-Tenant-ID header on all requests
5. **TanStack Query** - Caching, loading states, error handling
6. **Query keys** - `['users']`, `['users', id]` for cache management
7. **Invalidation** - Refresh data after mutations

## Cache Times by Data Type

```typescript
// User profile - rarely changes
staleTime: 30 * 60 * 1000; // 30 min

// Dashboard stats - frequent updates
staleTime: 5 * 60 * 1000; // 5 min

// List data - default
staleTime: 15 * 60 * 1000; // 15 min

// Search results - transient
staleTime: 5 * 60 * 1000; // 5 min

// Real-time data - always fresh
staleTime: 0;
```
