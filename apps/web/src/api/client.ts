import { env } from "@/config/env"
import { API_TIMEOUT } from "@/config/constants"

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
  timeout?: number
}

interface ApiError {
  status: number
  message: string
  code?: string
}

class ApiClient {
  private baseUrl: string
  private tenantId: string | null = null
  private orgId: string | null = null
  private getToken: (() => string | null) | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId
  }

  setOrgId(orgId: string) {
    this.orgId = orgId
  }

  setTokenProvider(getToken: () => string | null) {
    this.getToken = getToken
  }

  private buildHeaders(custom?: HeadersInit): Headers {
    const headers = new Headers(custom)

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json")
    }

    if (this.tenantId) {
      headers.set("X-Tenant-ID", this.tenantId)
    }

    if (this.orgId) {
      headers.set("X-Org-ID", this.orgId)
    }

    const token = this.getToken?.()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
    }
    return url.toString()
  }

  private async request<T>(path: string, config: RequestConfig = {}): Promise<T> {
    const { params, timeout = API_TIMEOUT, ...init } = config
    const url = this.buildUrl(path, params)
    const headers = this.buildHeaders(init.headers)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      })

      if (!response.ok) {
        const error: ApiError = {
          status: response.status,
          message: response.statusText,
        }
        try {
          const body = await response.json()
          error.message = body.message || error.message
          error.code = body.code
        } catch {
          // Use default error
        }
        throw error
      }

      if (response.status === 204) return undefined as T

      return (await response.json()) as T
    } finally {
      clearTimeout(timeoutId)
    }
  }

  get<T>(path: string, config?: RequestConfig) {
    return this.request<T>(path, { ...config, method: "GET" })
  }

  post<T>(path: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(path, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  put<T>(path: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(path, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  patch<T>(path: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(path, {
      ...config,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  delete<T>(path: string, config?: RequestConfig) {
    return this.request<T>(path, { ...config, method: "DELETE" })
  }
}

export const apiClient = new ApiClient(env.API_BASE_URL)
