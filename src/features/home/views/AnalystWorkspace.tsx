import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { KPIHero } from '@/components/ui/KPIHero';
import { BudgetBar } from '@/components/ui/BudgetBar';
import type { AnalystMetric, ActivityItem } from '@/lib/mock/dashboard';
import type { BudgetSummary } from '@/lib/mock/budgets';

interface AnalystWorkspaceProps {
  metrics: AnalystMetric[];
  spendByModel: { name: string; spend: number }[];
  activity: ActivityItem[];
  budget: BudgetSummary;
}

export const AnalystWorkspace = ({ metrics, spendByModel, activity, budget }: AnalystWorkspaceProps) => {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <KPIHero
            key={metric.name}
            label={metric.name}
            value={metric.value}
            delta={metric.change}
            trend={metric.change?.includes('-') ? 'down' : 'up'}
            tooltip="Rolling 7 day trend"
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Spend by Model</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer>
              <AreaChart data={spendByModel}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3EB0F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3EB0F1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis
                  stroke="#94A3B8"
                  tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <Tooltip contentStyle={{ background: '#15191D', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Area type="monotone" dataKey="spend" stroke="#3EB0F1" fill="url(#spendGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Performance Table</h3>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/5">
            <table className="w-full table-auto text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Runs (7d)</th>
                  <th className="px-4 py-3">Success %</th>
                  <th className="px-4 py-3">Cost</th>
                </tr>
              </thead>
              <tbody>
                {activity.slice(0, 6).map((row) => (
                  <tr key={row.id} className="border-t border-white/5 text-textSecondary">
                    <td className="px-4 py-3 text-white">{row.agentId}</td>
                    <td className="px-4 py-3">{Math.round(row.tokens / 1000)}</td>
                    <td className="px-4 py-3">{row.status === 'success' ? '96%' : '68%'}</td>
                    <td className="px-4 py-3">${row.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-accent/60">
              Export CSV
            </button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-accent/60">
              Share Snapshot
            </button>
          </div>
        </div>
      </section>

      <BudgetBar cap={budget.cap} used={budget.used} breakdown={budget.breakdown} />
    </div>
  );
};

