import { isPlainObject } from '@/shared/utils/_common';
import { xmlHttpRequest } from './transports';
import { ApiRequestOptions, ApiResponse, ApiTransport } from './types';
import { convertObjKeysToCamelCase, convertObjKeysToSnakeCase } from '@/shared/utils';
import { PlainObject } from '@/types';
import { HOST_API } from '@/shared/constants';

type ApiOptions = {
  baseURL?: string;
};

export class BaseAPI {
  api: ApiTransport;
  options?: ApiOptions;

  constructor(apiTransport: ApiTransport, options?: ApiOptions) {
    this.api = apiTransport;
    this.options = options;
  }

  async post<TResData = unknown, TReqData = unknown, TError = unknown>(url: string, data: TReqData, options?: ApiRequestOptions) {
    return this.api.post<TResData, TReqData, TError>(this._prepareUrl(url), this._transformDataRequest(data), options).then(this._transformResponse);
  }

  async get<TResData = unknown, TError = unknown>(url: string, options?: ApiRequestOptions) {
    return this.api.get<TResData, TError>(this._prepareUrl(url), options).then(this._transformResponse);
  }

  async patch<TResData = unknown, TReqData = unknown, TError = unknown>(url: string, data: TReqData) {
    return this.api.patch<TResData, TReqData, TError>(this._prepareUrl(url), this._transformDataRequest(data)).then(this._transformResponse);
  }

  async put<TResData = unknown, TReqData = unknown, TError = unknown>(url: string, data: TReqData, options?: ApiRequestOptions) {
    return this.api.put<TResData, TReqData, TError>(this._prepareUrl(url), this._transformDataRequest(data), options).then(this._transformResponse);
  }

  async delete<TResData = unknown, TError = unknown>(url: string) {
    return this.api.delete<TResData, TError>(this._prepareUrl(url)).then(this._transformResponse);
  }

  private _transformDataRequest<TResData>(data: TResData): TResData {
    return data;
  }

  private _transformResponse<TResData, TError>(response: ApiResponse<TResData, TError>): ApiResponse<TResData, TError> {
    try {
      const { data } = response;

      if (typeof data !== 'string') {
        throw new Error();
      }

      let json = JSON.parse(data);

      if (isPlainObject(json)) {
        json = convertObjKeysToCamelCase(json);
      }

      return {
        ...response,
        data: json,
      };
    } catch {
      return response;
    }
  }

  private _prepareUrl(url: string): string {
    if (this.options?.baseURL) {
      return this.options?.baseURL + url;
    }

    return url;
  }
}

export const baseAPI = new BaseAPI(xmlHttpRequest, { baseURL: HOST_API });
