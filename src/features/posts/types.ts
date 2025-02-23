export type createPostFields = {
  title: string;
  content: string;
  userId: string;
  username: string;
  mediaUrl?: string;
  category: string;
  imagefile?: any;
};

export type EditPostFields = {
  newTitle: string;
  newContent: string;
  newMediaUrl?: string;
  postId: string;
  newCategory: string;
};
export type savePostFields = {
  postId: string;
};
export type DeletePostFields = {
  postId: string;
};

export type CommentPostFields = {
  postId: string;
  comment: string;
  date: string;
};

export type PostsApiState = {
  posts?: Post[] | [];
  userPosts?: Post[] | [];
  status: "idle" | "loading" | "failed";
  error: string | null;
};

export interface PostComments {
  userId: string;
  username: string;
  userAvatar: string;
  date: string;
  comment: string;
}

export interface Post {
  _id: string;

  content: string;
  createdAt: string;
  mediaUrl?: string;
  title: string;
  updatedAt: string;
  userAvatar: string;
  userId: string;
  username: string;
  likes: string[];
  comments: PostComments[];
  shares: string[];
  showOptions: boolean;
  category: string;
  savedBy: string[];
}
