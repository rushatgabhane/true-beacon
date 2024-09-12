'use client';
import FullPageLoadingIndicator from '@/components/fullPageLoadingIndicator';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { getHistoricalData } from '@/lib/actions/historicalData';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

type HistoricalData = {
  date: string;
  price: number;
  instrument: string;
};

type ChartData = {
  date: string;
  price: number;
}[];

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [historicalData, setHistoricalData] = useState<ChartData>();
  const [instrument, setInstrument] = useState<string>('NIFTY 50');
  const [fromDate, setFromDate] = useState<string>('2021-01-01');
  const [toDate, setToDate] = useState<string>('2021-12-31');

  const firstPrice = historicalData?.[0]?.price ?? 0;
  const lastPrice = historicalData?.[historicalData?.length - 1]?.price ?? 0;
  const isTrendingUp = lastPrice >= firstPrice;
  const trendingPercent = (
    ((lastPrice - firstPrice) / firstPrice) *
    100
  ).toPrecision(3);

  useEffect(() => {
    getHistoricalData('NIFTY 50', '2021-01-01', '2021-12-31').then((res) => {
      const transformedData: ChartData = res.map((data: HistoricalData) => {
        const date = new Date(data.date).toLocaleDateString();
        const price = data.price / 100; // convert from paisa to rupees
        return { date, price };
      });

      setHistoricalData(transformedData);
    });
  }, []);

  if (!historicalData) {
    return <FullPageLoadingIndicator />;
  }

  return (
    <>
      <Navbar />
      <div className="mt-2 mx-12">
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
                  data={historicalData}
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
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending {isTrendingUp ? 'up' : 'down'} by {trendingPercent}%
                  for this period
                  {isTrendingUp ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  {fromDate} to {toDate}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
