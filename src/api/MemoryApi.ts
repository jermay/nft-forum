import { IAPI, ICreateComment, ICreateThread, Post, Thread } from ".";
import { CreateUserDto, LoginDto, LoginResponseDto } from "./swagger";

class MemoryApi implements IAPI {
  threads: Thread[] = [
    { id: 1, title: "First Post", postId: 1 },
    { id: 2, title: "Vite is cool", postId: 3 }
  ];
  posts: Post[] = [
    { id: 1, threadId: 1, author: "Chad", content: "When moon?" },
    { id: 2, threadId: 1, author: "Ivan", content: "Bitcoin will be pumped!" },
    { id: 3, threadId: 2, author: "Bill", content: "Vite is so fast! Oscar is king!" },
  ];

  async login(credentials: LoginDto): Promise<LoginResponseDto> {
    return {
      user: { username: credentials.username },
      accessToken: 'test',
    };
  }

  async logout(): Promise<boolean> {
    return true;
  }

  async register(info: CreateUserDto): Promise<LoginResponseDto> {
    return {
      user: { username: info.username },
      accessToken: 'test',
    };
  }

  async createThread(thread: ICreateThread): Promise<Thread> {
    const newThreadId = this.threads.length + 1;
    const newPost = this._createComment({
      ...thread,
      threadId: newThreadId,
    });
    const newThread: Thread = {
      id: newThreadId,
      title: thread.title,
      postId: newPost.id,
    };

    this.threads.push(newThread);
    this.posts.push(newPost);

    return newThread;
  }

  async getThreads(): Promise<Thread[]> {
    return this.threads;
  }

  async getThread(threadId: number): Promise<Thread | undefined> {
    const thread = this.threads.find(t => t.id === threadId);
    if (!thread) return thread;
  
    const comments = await this.getThreadComments(threadId);
    return {
      ...thread,
      comments,
    }
  }

  async getThreadComments(threadId: number): Promise<Post[]> {
    if (!threadId) return [];
    return this.posts.filter((post) => post.threadId === threadId);
  }

  private _createComment(comment: ICreateComment) {
    return {
      id: this.posts.length + 1,
      threadId: comment.threadId,
      author: comment.author,
      content: comment.content,
    };
  }

  async createComment(comment: ICreateComment): Promise<Post> {
    const newPost = this._createComment(comment);
    this.posts.push(newPost);
    return newPost;
  }

  findComment(postId: number): Post | undefined {
    return this.posts.find((post) => post.id === postId);
  }

  async editComment(comment: Post): Promise<boolean> {
    if (!comment?.id) throw new Error("comment undefined");
    const oldComment = this.findComment(comment.id);

    if (!oldComment) throw new Error("comment not found");

    oldComment.content = comment.content;
    return true;
  }
}

export const memoryApi = new MemoryApi();
