import { User } from "./user";

export type PostImageProps = {
  src: string;
  alt: string;
};

export type PostProps = {
  id: number;
  user: PostUserProps;
  img: PostImageProps;
  likes: number;
  isLiked: boolean;
  content: string;
  date: string;
};

export type PostUserProps = {
  img: PostImageProps;
  user: string;
};

export type PostCardProps = {
  id: number;
  content: string;
  published: boolean;
  image_url: string;
  isLiked: boolean;
  created_at: string;
  owner_id: number;
  like_count: number;
  owner: User;
};

export type PostUtilsProps = {
  post_id: number;
};
