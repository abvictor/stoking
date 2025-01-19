import { db } from "@/app/_lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import "server-only";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export const getLast30DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const today = dayjs().endOf("day").toDate();
  const last30Days = [30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,10,9,8,7,6,5,4,3,2,1,0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalLast30DaysRevenue: DayTotalRevenueDto[] = [];
  for (const day of last30Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: Decimal }[]
    >(
      `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast30DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }
  return totalLast30DaysRevenue;
};
