import React, { useState } from 'react';

export interface ComplexityRow {
  operation: string;
  best?: string;
  average?: string;
  worst: string;
  space?: string;
  reason: string;
  category?: string;
}

interface TimeComplexityTableProps {
  rows: ComplexityRow[];
  title?: string;
}

const badgeColor = (val: string) => {
  if (!val) return 'bg-slate-100 text-slate-500';
  if (val === 'O(1)') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  if (val.includes('log')) return 'bg-sky-100 text-sky-800 border border-sky-200';
  if (val === 'O(N)') return 'bg-amber-100 text-amber-800 border border-amber-200';
  if (val.includes('N²') || val.includes('N^2')) return 'bg-rose-100 text-rose-800 border border-rose-200';
  if (val.includes('N log')) return 'bg-purple-100 text-purple-800 border border-purple-200';
  return 'bg-slate-100 text-slate-600 border border-slate-200';
};

const ComplexityBadge: React.FC<{ val?: string }> = ({ val }) => {
  if (!val) return <span className="text-slate-300 text-xs">—</span>;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold font-mono ${badgeColor(val)}`}>
      {val}
    </span>
  );
};

export const TimeComplexityTable: React.FC<TimeComplexityTableProps> = ({
  rows,
  title = 'Zaman Karmaşıklığı (Time Complexity)',
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  // Group by category if any row has a category
  const hasCategories = rows.some(r => r.category);
  const hasAverage = rows.some(r => r.average);
  const hasBest = rows.some(r => r.best);
  const hasSpace = rows.some(r => r.space);

  const categories = hasCategories
    ? [...new Set(rows.map(r => r.category || 'Genel'))]
    : ['Genel'];

  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 w-1 bg-[#235347] rounded-full" />
        <h3 className="text-lg font-extrabold text-[#051F20] tracking-tight">{title}</h3>
      </div>

      {/* Color legend */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">O(1)</span>
          <span className="text-slate-500">Sabit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-mono font-bold text-xs">O(log N)</span>
          <span className="text-slate-500">Logaritmik</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-mono font-bold text-xs">O(N)</span>
          <span className="text-slate-500">Doğrusal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-mono font-bold text-xs">O(N log N)</span>
          <span className="text-slate-500">Linearitmik</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 font-mono font-bold text-xs">O(N²)</span>
          <span className="text-slate-500">Karesel</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F2F7F4] border-b border-slate-200">
              <th className="text-left px-5 py-3 font-bold text-[#051F20] text-xs uppercase tracking-wider">İşlem</th>
              {hasBest && <th className="text-center px-3 py-3 font-bold text-xs uppercase tracking-wider text-emerald-700">En İyi</th>}
              {hasAverage && <th className="text-center px-3 py-3 font-bold text-xs uppercase tracking-wider text-sky-700">Ortalama</th>}
              <th className="text-center px-3 py-3 font-bold text-xs uppercase tracking-wider text-rose-700">En Kötü</th>
              {hasSpace && <th className="text-center px-3 py-3 font-bold text-xs uppercase tracking-wider text-purple-700">Alan</th>}
              <th className="text-left px-5 py-3 font-bold text-xs uppercase tracking-wider text-slate-500">Neden?</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <React.Fragment key={cat}>
                {hasCategories && (
                  <tr className="bg-slate-50 border-t border-b border-slate-100">
                    <td
                      colSpan={2 + (hasBest ? 1 : 0) + (hasAverage ? 1 : 0) + (hasSpace ? 1 : 0)}
                      className="px-5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {cat}
                    </td>
                  </tr>
                )}
                {rows
                  .filter(r => (r.category || 'Genel') === cat)
                  .map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 hover:bg-[#F2F7F4] transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === i ? null : i)}
                    >
                      <td className="px-5 py-3 font-semibold text-[#051F20] whitespace-nowrap">
                        {row.operation}
                      </td>
                      {hasBest && <td className="px-3 py-3 text-center"><ComplexityBadge val={row.best} /></td>}
                      {hasAverage && <td className="px-3 py-3 text-center"><ComplexityBadge val={row.average} /></td>}
                      <td className="px-3 py-3 text-center"><ComplexityBadge val={row.worst} /></td>
                      {hasSpace && <td className="px-3 py-3 text-center"><ComplexityBadge val={row.space} /></td>}
                      <td className="px-5 py-3 text-slate-600 text-xs leading-snug">{row.reason}</td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
