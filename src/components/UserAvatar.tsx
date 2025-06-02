import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  user: {
    name?: string | null;
    image?: string | null;
  } | null | undefined;
  className?: string;
}

const getInitials = (name?: string | null) => {
  if (!name) return "?";
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function UserAvatar({ user, className }: UserAvatarProps) {
  if (user?.image || user?.name) {
    return (
      <Avatar className={className || "h-8 w-8"}>
        <AvatarImage src={user.image ?? undefined} alt={user.name ?? "Użytkownik"} />
        <AvatarFallback className="bg-red-500 text-white text-xs font-semibold">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
    );
  }
  return <UserIcon className={className || "h-5 w-5"} />;
}