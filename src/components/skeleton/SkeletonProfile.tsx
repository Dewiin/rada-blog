import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProfile() {
    return (
        <>
            {/* title */}
            <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-20 rounded-full" /> 
                <Skeleton className="h-4 md:w-30 rounded-full" /> 
            </div>
        </>
    )
}