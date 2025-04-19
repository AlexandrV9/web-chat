import { queryStringify } from '@/shared/utils';
import { ApiRequestOptions, ApiResponse, ApiTransport } from '../../types';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

interface XMLHttpOptions extends ApiRequestOptions {
  method: keyof typeof METHODS;
}

export class XMLHttpTransport implements ApiTransport {
  async get<TResData = unknown, TError = unknown>(url: string, options: ApiRequestOptions): Promise<ApiResponse<TResData, TError>> {
    const xhr = await this._request(url, undefined, { method: METHODS.GET, ...options });
    return this._transformResponse<TResData, TError>(xhr);
  }

  async post<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>> {
    const xhr = await this._request(url, data, { method: METHODS.POST, ...options });
    return this._transformResponse<TResData, TError>(xhr);
  }

  async patch<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>> {
    const xhr = await this._request(url, data, { method: METHODS.PATCH, ...options });
    return this._transformResponse<TResData, TError>(xhr);
  }

  async put<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>> {
    const xhr = await this._request(url, data, { method: METHODS.PUT, ...options });
    return this._transformResponse<TResData, TError>(xhr);
  }

  async delete<TResData = unknown, TError = unknown>(url: string, options: ApiRequestOptions): Promise<ApiResponse<TResData, TError>> {
    const xhr = await this._request(url, undefined, { method: METHODS.DELETE, ...options });
    return this._transformResponse<TResData, TError>(xhr);
  }

  async _request(url: string, data: unknown, options: XMLHttpOptions): Promise<XMLHttpRequest> {
    const { method = METHODS.GET, credentials, params = {}, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const targetUrl = url + '?' + queryStringify(params);

      xhr.withCredentials = credentials === 'include';

      xhr.open(method, targetUrl);
      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      const defaultHeaders = {
        'Content-type': 'application/json; charset=utf-8',
      };

      Object.entries(headers ? headers : defaultHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as never);
      }
    });
  }

  _transformResponse<T, U>(xhr: XMLHttpRequest): ApiResponse<T, U> {
    if (xhr.status >= 200 && xhr.status <= 299) {
      return {
        ok: true,
        status: xhr.status,
        data: xhr.response,
        error: null,
      };
    }

    return {
      ok: false,
      status: xhr.status,
      data: null,
      error: xhr.response,
    };
  }
}

export const xmlHttpRequest = new XMLHttpTransport();
