import { getLast30DaysRevenue } from "@/app/_data-access/dashboard/get-last-30-days-revenue";
import RevenueChart from "./revenue-chart";

const Last30DaysRevenueCard = async () => {
  const totalLast30DaysRevenue = await getLast30DaysRevenue();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">Receita</p>
      <p className="text-sm text-slate-400">Últimos 30 dias</p>
      <RevenueChart data={totalLast30DaysRevenue} />
    </div>
  );
};

export default Last30DaysRevenueCard;
