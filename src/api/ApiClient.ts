import { IAPI, ICreateComment, ICreateThread, Post, Thread } from ".";
import {
  Api,
  CreateUserDto,
  LoginDto,
  LoginResponseDto,
  NftBalanceDto,
  PostDto,
  ThreadDto,
  UpdateUserAvatarDto,
  UserDto,
} from "./swagger";
import { AxiosResponse } from "axios";

export interface ApiErrorData {
  message: string;
  statusCode: number;
}
export const TOKEN_KEY = "authToken";

export class ApiClient implements IAPI {
  api: Api<string>;
  authToken: string | null = null;

  constructor() {
    this.api = new Api<string>({
      secure: true,
      baseURL: "/api",
      validateStatus: (status) => true,
      securityWorker: (accessToken) =>
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {},
    });

    this.setAuthToken(localStorage.getItem(TOKEN_KEY));
  }

  private setAuthToken = (token: string | null) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);

    this.authToken = token;
    this.api.setSecurityData(token);
  };

  private handleResponse = <T>(res: AxiosResponse<T, any>): T => {
    if (res.status < 400) return res.data;
    if (res.status === 401) this.setAuthToken(null);
    const data = res.data as unknown as ApiErrorData;
    throw new Error(data.message || res.statusText);
  };

  login = async (credentials: LoginDto): Promise<LoginResponseDto> => {
    const response = await this.api.auth.authControllerLogin(credentials);
    const data = this.handleResponse(response);
    this.setAuthToken(data.accessToken);
    return data;
  };

  logout = async (): Promise<boolean> => {
    this.setAuthToken(null);
    return true;
  };

  register = async (info: CreateUserDto): Promise<LoginResponseDto> => {
    const response = await this.api.auth.authControllerRegister(info);
    const data = this.handleResponse(response);
    this.setAuthToken(data.accessToken);
    return data;
  };

  getUser = async (): Promise<UserDto> => {
    const response = await this.api.user.userControllerGetUser();
    return this.handleResponse(response);
  };

  createThread = async (thread: ICreateThread): Promise<Thread> => {
    const response = await this.api.thread.threadControllerCreate(thread);
    return this.handleResponse(response);
  };

  getThreads = async (): Promise<Thread[]> => {
    const response = await this.api.thread.threadControllerFindAll();
    return this.handleResponse(response);
  };

  getThread = async (threadId: number): Promise<ThreadDto | undefined> => {
    const response = await this.api.thread.threadControllerFindOne(threadId);
    return this.handleResponse(response);
  };

  getThreadComments = async (threadId: number): Promise<Post[]> => {
    const response = await this.api.thread.threadControllerFindOne(threadId);
    const data = this.handleResponse(response);
    return data.comments;
  };

  createComment = async (comment: ICreateComment): Promise<PostDto> => {
    const response = await this.api.comment.postControllerCreate(
      comment.threadId,
      comment
    );
    return this.handleResponse(response);
  };

  editComment = async (comment: Post): Promise<boolean> => {
    const response = await this.api.comment.postControllerUpdate(
      comment.id,
      comment
    );
    return this.handleResponse(response);
  };

  getUserNfts = async (dto: {
    chainId: number;
    address: string;
    signature: string;
  }): Promise<NftBalanceDto> => {
    const response = await this.api.nft.nftControllerGetBalance(dto);
    return this.handleResponse(response);
  };

  setUserAvatar = async (dto: UpdateUserAvatarDto) => {
    const response = await this.api.user.userControllerUpdateUserAvatar(dto);
    const data = this.handleResponse(response);
    this.setAuthToken(data.accessToken);
    return data;
  }
}

export const apiClient = new ApiClient();
