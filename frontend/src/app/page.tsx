'use client';
import FullPageLoadingIndicator from '@/components/fullPageLoadingIndicator';
import LivePrice from '@/components/livePrice';
import Navbar from '@/components/navbar';
import PriceChart, { ChartData } from '@/components/priceChart';
import { ChartConfig } from '@/components/ui/chart';
import { getHistoricalData } from '@/lib/actions/historicalData';
import { useEffect, useState } from 'react';

type HistoricalData = {
  date: string;
  price: number;
  instrument: string;
};
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
        <LivePrice />
        <PriceChart
          instrument={instrument}
          fromDate={fromDate}
          toDate={toDate}
          chartData={historicalData}
          chartConfig={chartConfig}
        />
      </div>
    </>
  );
}
