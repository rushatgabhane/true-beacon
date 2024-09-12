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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { DatePicker } from './datePicker';
import { useEffect, useState } from 'react';
import { getHistoricalData } from '@/lib/actions/historicalData';
import { toDateString } from '@/lib/utils';

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
const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type HistoricalData = {
  date: string;
  price: number;
  instrument: string;
};

export default function PriceChart() {
  const [historicalData, setHistoricalData] = useState<ChartData>();
  const [instrument, setInstrument] = useState<string>('NIFTY 50');
  const [fromDate, setFromDate] = useState<Date>(new Date('2017-01-01'));
  const [toDate, setToDate] = useState<Date>(new Date());

  const firstPrice = historicalData?.[0]?.price ?? 0;
  const lastPrice = historicalData?.[historicalData?.length - 1]?.price ?? 0;
  const isTrendingUp = lastPrice >= firstPrice;
  const trendingPercent = ((lastPrice - firstPrice) / firstPrice) * 100;

  useEffect(() => {
    getHistoricalData(
      instrument,
      toDateString(fromDate),
      toDateString(toDate)
    ).then((res) => {
      const transformedData: ChartData = res.map((data: HistoricalData) => {
        const date = new Date(data.date).toLocaleDateString();
        const price = data.price / 100; // convert from paisa to rupees
        return { date, price };
      });

      setHistoricalData(transformedData);
    });
  }, [fromDate, toDate, instrument]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>
          Showing the price for {instrument} from {toDateString(fromDate)} to{' '}
          {toDateString(toDate)}
        </CardDescription>
        <div className="flex flex-col gap-2 md:flex-row">
          <Select
            defaultValue="NIFTY 50"
            onValueChange={(v) => setInstrument(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NIFTY 50">Nifty 50</SelectItem>
              <SelectItem value="NIFTY BANK">Nifty Bank</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker date={fromDate} setDate={setFromDate} label="From" />
          <DatePicker date={toDate} setDate={setToDate} label="To" />
        </div>
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
            {!isNaN(trendingPercent) && (
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending {isTrendingUp ? 'up' : 'down'} by{' '}
                {trendingPercent.toFixed(2)}% for this period
                {isTrendingUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {toDateString(fromDate)} to {toDateString(toDate)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
