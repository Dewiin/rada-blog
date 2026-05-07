import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPostPreview() {
    return (
        // skeleton preview
        <div 
            className="flex flex-col gap-4 m-4 h-fit"
        >   
            {/* author */}
            <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
            </div>

            {/* title and subtitle */}
            <div className="flex flex-col gap-2">
                {/* title */}
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-6 md:w-[85%] rounded-full" />
                    <Skeleton className="h-6 md:w-[70%] w-[85%] rounded-full" />
                </div>

                {/* subtitle */}
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-[90%] rounded-full" />
                    <Skeleton className="h-3 w-[60%] rounded-full" />
                </div>
            </div>

            <Skeleton className="h-4 md:w-60 w-30 rounded-full" />
        </div>
    )
}