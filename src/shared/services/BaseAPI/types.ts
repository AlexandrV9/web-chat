import { PlainObject } from '@/types';

export interface ApiRequestOptions {
  mode?: RequestMode;
  credentials?: RequestCredentials;
  headers?: PlainObject;
  params?: PlainObject;
}

export interface ApiTransport {
  get<TResData = unknown, TError = unknown>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<TResData, TError>>;
  post<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>>;

  put<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>>;

  patch<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data: TReqData,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>>;

  delete<TResData = unknown, TReqData = unknown, TError = unknown>(
    url: string,
    data?: TReqData,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TResData, TError>>;
}

export interface ApiResponse<T = unknown, U = unknown> {
  ok: boolean;
  status: number;
  data: T | null;
  error: U | null;
}
