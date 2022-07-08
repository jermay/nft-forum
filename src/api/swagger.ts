/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  username: string;
  password: string;
}

export interface UserDto {
  username: string;
}

export interface LoginResponseDto {
  user: UserDto;
  accessToken: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface CreateThreadRquestDto {
  title: string;
  content: string;
}

export interface PostDto {
  id: number;
  threadId: number;
  author: string;
  content: string;
}

export interface ThreadDto {
  id: number;
  title: string;
  postId: number;
  comments: PostDto[];
}

export interface ThreadHeaderDto {
  id: number;
  title: string;
  postId: number;
}

export type UpdateThreadDto = object;

export interface CreatePostRequestDto {
  content: string;
}

export interface UpdatePostDto {
  content: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title NFT Forum API
 * @version 1.0
 * @contact
 *
 * API for the NFT forum demo app
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  thread = {
    /**
     * No description
     *
     * @name ThreadControllerCreate
     * @request POST:/thread
     */
    threadControllerCreate: (data: CreateThreadRquestDto, params: RequestParams = {}) =>
      this.request<ThreadDto, any>({
        path: `/thread`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ThreadControllerFindAll
     * @request GET:/thread
     */
    threadControllerFindAll: (params: RequestParams = {}) =>
      this.request<ThreadHeaderDto[], any>({
        path: `/thread`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ThreadControllerFindOne
     * @request GET:/thread/{threadId}
     */
    threadControllerFindOne: (threadId: number, params: RequestParams = {}) =>
      this.request<ThreadDto, any>({
        path: `/thread/${threadId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ThreadControllerUpdate
     * @request PATCH:/thread/{threadId}
     */
    threadControllerUpdate: (threadId: number, data: UpdateThreadDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/thread/${threadId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ThreadControllerRemove
     * @request DELETE:/thread/{threadId}
     */
    threadControllerRemove: (threadId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/thread/${threadId}`,
        method: "DELETE",
        ...params,
      }),
  };
  comment = {
    /**
     * No description
     *
     * @name PostControllerCreate
     * @request POST:/comment/{threadId}
     */
    postControllerCreate: (threadId: number, data: CreatePostRequestDto, params: RequestParams = {}) =>
      this.request<PostDto, any>({
        path: `/comment/${threadId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerUpdate
     * @request PATCH:/comment/{postId}
     */
    postControllerUpdate: (postId: number, data: UpdatePostDto, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/comment/${postId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerRemove
     * @request DELETE:/comment/{postId}
     */
    postControllerRemove: (postId: number, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/comment/${postId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
