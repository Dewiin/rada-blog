import type { ComponentProps } from "react";

// components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// types
import type { IUser } from "@/components/types/User";

type UserAvatarProps = ComponentProps<typeof Avatar> & {
    user?: IUser | null;
    className?: string;
};
export function UserAvatar({ 
    user, 
    className, 
    ...props 
}: UserAvatarProps) {
    return (
        <Avatar className={className} {...props}>
            <AvatarImage alt={`@${user?.displayName}`} />
            <AvatarFallback>{user?.displayName.substring(0,2)}</AvatarFallback>
        </Avatar>
    )
} 