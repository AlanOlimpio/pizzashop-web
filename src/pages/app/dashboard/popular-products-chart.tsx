import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { GraphicLoading } from "./graphic-loading";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });
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

    return popularProducts ? (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {popularProducts[index].product.length > caracterLength
          ? `${caracterLength > 3 ? popularProducts[index].product.substring(0, caracterLength).concat("...") : popularProducts[index].product.substring(0, caracterLength)}`
          : popularProducts[index].product}{" "}
        ({value})
      </text>
    ) : null;
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
        {popularProducts ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
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
                {popularProducts.map((_, index) => {
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
        ) : (
          <GraphicLoading />
        )}
      </CardContent>
    </Card>
  );
}
