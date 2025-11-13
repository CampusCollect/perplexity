import { appConfig } from '@/lib/config/env';
import { useLogFn } from '@/lib/logging/logger';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export interface HttpError extends Error {
  status?: number;
  data?: unknown;
}

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (error) {
    throw Object.assign(new Error('Unable to parse server response'), {
      cause: error,
      status: response.status,
    });
  }
}

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private createUrl(path: string) {
    if (this.baseUrl === 'mock') {
      return path;
    }

    return `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }

  private async request(path: string, options: RequestOptions = {}) {
    const { method = 'GET', body, headers, signal } = options;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal,
    };

    if (body !== undefined) {
      fetchOptions.body = JSON.stringify(body);
    }

    const url = this.createUrl(path);
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const error: HttpError = Object.assign(new Error('Request failed'), {
        status: response.status,
        data: await parseResponse(response).catch(() => null),
      });
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return parseResponse(response);
  }

  get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request(path, { ...options, method: 'GET' }) as Promise<T>;
  }
}

export const httpClient = new HttpClient(appConfig.apiBaseUrl);

export function useHttpClient() {
  const errorLog = useLogFn('error');

  return async <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) => {
    try {
      return await httpClient.get<T>(path, options);
    } catch (error) {
      errorLog('HTTP request failed', {
        path,
        error,
      });
      throw error;
    }
  };
}
