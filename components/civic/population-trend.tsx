export interface TrendPoint {
  year: string;
  population: number;
  context: string;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-PH");
}

/**
 * Census population trend: CSS bars for sighted users (aria-hidden) with
 * an accessible data table carrying the same figures plus intercensal
 * change. No chart library — three points do not need one.
 */
export function PopulationTrend({ points }: { points: TrendPoint[] }) {
  if (points.length === 0) return null;
  const max = Math.max(...points.map((point) => point.population));

  return (
    <section aria-labelledby="population-trend-heading" className="mt-10">
      <h2
        id="population-trend-heading"
        className="text-lg font-semibold text-ink"
      >
        Population trend
      </h2>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
        Pagsanjan&apos;s census population across the last three censuses.
        Change is measured between censuses, not per year.
      </p>

      <div aria-hidden="true" className="mt-4 max-w-2xl space-y-3">
        {points.map((point) => (
          <div key={point.year} className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-sm font-medium text-slate-700">
              {point.year}
            </span>
            <div className="h-8 flex-1 overflow-hidden rounded-md bg-slate-100">
              <div
                className="flex h-full items-center justify-end rounded-md bg-primary-700 px-2"
                style={{
                  width: `${Math.max((point.population / max) * 100, 8)}%`,
                }}
              >
                <span className="text-xs font-semibold text-white">
                  {formatNumber(point.population)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 max-w-2xl overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Census population of Pagsanjan with change since the previous census
          </caption>
          <thead>
            <tr className="border-b border-line bg-surface text-left">
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink">
                Census
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink">
                Population
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink">
                Change since previous census
              </th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, index) => {
              const previous = index > 0 ? points[index - 1] : undefined;
              const change =
                previous !== undefined
                  ? point.population - previous.population
                  : undefined;
              return (
                <tr
                  key={point.year}
                  className="border-b border-line last:border-0"
                >
                  <td className="px-4 py-2.5 font-medium text-ink">
                    {point.year}
                    <span className="block text-xs font-normal text-muted">
                      {point.context}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-slate-700">
                    {formatNumber(point.population)}
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-slate-700">
                    {change === undefined || previous === undefined
                      ? "—"
                      : `+${formatNumber(change)} (+${((change / previous.population) * 100).toFixed(1)}%)`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
