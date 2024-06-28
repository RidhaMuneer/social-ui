// types
import { UserCardProps } from "@/types/user";

const UserCard: React.FC<UserCardProps> = ({ username, image_url }) => {
  return (
    <article className="border border-neutral-500 flex gap-4 justify-start items-center px-5 py-3 cursor-pointer">
      <img
        src={image_url}
        alt={username}
        className="w-10 h-10 rounded-full border border-neutral-500"
      />
      <p className="text-sm text-muted-foreground">@{username}</p>
    </article>
  );
};

export default UserCard;
