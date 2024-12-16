import { Skeleton } from "@/components/ui/skeleton";
export function MetricCardSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 py-1">
      <Skeleton className="h-6 w-[calc(60%-1.5rem)]" />
      <Skeleton className="h-3 w-[calc(100%-1.5rem)]" />
    </div>
  );
}
