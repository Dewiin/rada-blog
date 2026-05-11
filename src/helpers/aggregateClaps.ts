import type { IClap } from "@/components/types/Clap";

export function aggregateClaps(claps: IClap[]) {
    return claps.reduce((acc, curr) => acc + curr.amount, 0);
}