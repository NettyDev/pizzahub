import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  user:
    | {
        name?: string | null;
        surname?: string | null;
        image?: string | null;
      }
    | null
    | undefined;
  className?: string;
  fallbackClassName?: string;
}

const getInitials = (name?: string | null) => {
  if (!name) return "?";
  const names = name.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function UserAvatar({ user, className, fallbackClassName }: UserAvatarProps) {
  if (user?.image || user?.name || user?.surname) {
    return (
      <Avatar className={className || "h-8 w-8"}>
        <AvatarImage src={user.image ?? undefined} alt={`${user.name} ${user.surname}`.trim() ?? "Użytkownik"} />
        <AvatarFallback className={clsx("bg-red-500 text-white text-xs font-semibold", fallbackClassName)}>
          {getInitials(`${user.name} ${user.surname}`.trim())}
        </AvatarFallback>
      </Avatar>
    );
  }
  return <UserIcon className={className || "h-5 w-5"} />;
}
