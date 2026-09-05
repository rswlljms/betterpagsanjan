import { Card } from "@/components/ui/card";
import { getSource } from "@/data/sources";
import type { StatisticItem } from "@/types/civic";

/**
 * Statistic with mandatory source and year (AGENTS.md §43).
 */
export function StatCard({ item }: { item: StatisticItem }) {
  const source = getSource(item.sourceId);
  return (
    <Card className="p-6">
      <p className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {item.value}
      </p>
      <p className="mt-1 text-sm font-medium text-bp-graphite">{item.label}</p>
      {item.context ? <p className="text-xs text-muted">{item.context}</p> : null}
      <p className="mt-3 text-xs text-muted">
        Source: {source?.name ?? item.sourceId}
        {item.year ? ` · ${item.year}` : ""}
      </p>
    </Card>
  );
}
