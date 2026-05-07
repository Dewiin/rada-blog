import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function SkeletonPostScreen() {
    return (
        <>
            {/* title */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-8 md:w-[85%] rounded-full" /> 
                <Skeleton className="h-8 md:w-[70%] w-[85%] rounded-full" /> 
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[80%] rounded-full" />
                <Skeleton className="h-4 w-[70%] rounded-full" />
            </div>

            <div className="flex gap-2 items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
            </div>

            <Separator />
                    <Skeleton className="h-4 w-30 rounded-full" />
            <Separator />
        </>
    )
}