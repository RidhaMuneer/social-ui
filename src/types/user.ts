export type User = {
  id: number;
  username: string;
  email: string;
  image_url: string;
  follower_count?: number;
  following_count?: number;
  posts: Post[];
};

type Post = {
  content: string
  id: number
  published: boolean
  owner_id: number
  like_count: number;
  isLiked: boolean;
  image_url: string
  created_at: string
}

export type UserCardProps = {
  username: string;
  image_url: string;
}

export type UsersSuggestions = {
  id: number;
  username: string;
  image_url: string;
}

export type FollowButtonProps = {
  id: number;
};