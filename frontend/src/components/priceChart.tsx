import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

export type ChartData = {
  date: string;
  price: number;
}[];

type PriceChartProps = {
  instrument: string;
  fromDate: string;
  toDate: string;
  chartData: ChartData;
  chartConfig: {
    price: {
      label: string;
      color: string;
    };
  };
};

export default function PriceChart({
  instrument,
  fromDate,
  toDate,
  chartData,
  chartConfig,
}: PriceChartProps) {
  const firstPrice = chartData?.[0]?.price ?? 0;
  const lastPrice = chartData?.[chartData?.length - 1]?.price ?? 0;
  const isTrendingUp = lastPrice >= firstPrice;
  const trendingPercent = ((lastPrice - firstPrice) / firstPrice) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>
          Showing the price for {instrument} from {fromDate} to {toDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="price"
                type="linear"
                stroke="blue"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {!isNaN(trendingPercent) && (
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending {isTrendingUp ? 'up' : 'down'} by {trendingPercent.toFixed(2)}%
                for this period
                {isTrendingUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {fromDate} to {toDate}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
