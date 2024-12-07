import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const data = [
  { product: "Pepperoni", amount: 40 },
  { product: "Mussarela", amount: 30 },
  { product: "Marguerita", amount: 50 },
  { product: "4 Queijos", amount: 16 },
  { product: "Frango frito", amount: 26 },
];

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularProductsChart() {
  const isBiggerMedia = useMediaQuery("(min-width: 520px)");
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    value: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 12 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const caracterLength = isBiggerMedia ? 12 : 3;

    return (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].product.length > caracterLength
          ? `${caracterLength > 3 ? data[index].product.substring(0, caracterLength).concat("...") : data[index].product.substring(0, caracterLength)}`
          : data[index].product}{" "}
        ({value})
      </text>
    );
  };
  return (
    <Card className="col-span-3 max-xl:col-span-6">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              nameKey="product"
              dataKey="amount"
              cx="50%"
              cy="50%"
              outerRadius={isBiggerMedia ? 86 : 55}
              innerRadius={isBiggerMedia ? 64 : 40}
              strokeWidth={8}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
