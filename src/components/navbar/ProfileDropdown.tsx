import { useNavigate } from "react-router"

// api
import { logout } from "@/api/auth"

// components
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Newspaper} from "lucide-react"
import { toast } from "sonner"

// contexts
import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext"

// types
import type { IUser } from "@/components/types/User"

export function ProfileDropdown({ user }: {user: IUser} ) {
    const { setIsAuthLoading, setUser } = useAuth();
    const { setError, setSuccess } = useUI();
    const navigate = useNavigate();

    async function onLogoutSubmit() {
        await toast.promise(
            logout(setIsAuthLoading, setUser, setError, setSuccess),
            { loading: "Logging out..." }
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button className="relative h-10 w-10 rounded-sm" variant="ghost">
                <UserAvatar user={user} size="default" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3">
                <UserAvatar user={user} className="h-12 w-12" />
                <div className="flex flex-col space-y-1 gap-1">
                    <p className="font-medium text-sm leading-none">{user.displayName}</p>
                    <Badge className="w-fit text-xs" variant="secondary">
                    {user.role.charAt(0) + user.role.substring(1).toLocaleLowerCase()}
                    </Badge>
                </div>
                </div>
            </DropdownMenuLabel>
            {user && user.role === "AUTHOR" &&
                <DropdownMenuItem 
                onClick={() => navigate('/create')}
                >
                <Newspaper />
                Write a Post
                </DropdownMenuItem>
            }
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => navigate(`/profile/${user && user.id}`)}
            >
                <User />
                View Profile
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive"
            onClick={() => onLogoutSubmit()}
            >
                <LogOut />
                Log out
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}