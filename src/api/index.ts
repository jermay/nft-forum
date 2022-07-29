import { CreateUserDto, LoginDto, LoginResponseDto } from "./swagger";

export interface Post {
  id: number;
  threadId: number;
  author: string;
  content: string;
}

export interface Thread {
  id: number;
  title: string;
  postId: number;
  comments?: Post[];
}

export interface ICreateComment {
  threadId: number;
  // author: string;
  content: string;
}

export interface ICreateThread {
  title: string;
  // author: string;
  content: string;
}

export interface IPaginationOPtions {
  page: number;
  size: number;
}

export interface IPaginationResponse<T> {
  offset: number;
  total: number;
  items: T[];
}

export interface IAPI {
  login(credentials: LoginDto): Promise<LoginResponseDto>;
  logout(): Promise<boolean>;
  register(info: CreateUserDto): Promise<LoginResponseDto>;

  createThread(thread: ICreateThread): Promise<Thread>;
  getThreads(): Promise<Thread[]>;
  getThread(threadId: number): Promise<Thread | undefined>;
  getThreadComments(threadId: number): Promise<Post[]>;

  createComment(comment: ICreateComment): Promise<Post>;
  editComment(comment: Post): Promise<boolean>;
}
