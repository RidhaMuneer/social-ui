export type User = {
  id: number;
  username: string;
  email: string;
  image_url: string;
  follower_count: number;
  following_count: number;
};

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