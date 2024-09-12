'use client';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { getHistoricalData } from '@/lib/actions/historicalData';
import { useEffect, useState } from 'react';

type HistoricalData = {
  date: string;
  price: number;
  instrument: string;
};

export default function Dashboard() {
  const [historicalData, setHistoricalData] = useState([]);
  

  useEffect(() => {
    getHistoricalData('NIFTY 50', '2021-01-01', '2021-12-31').then((res) => {
      setHistoricalData(res);
    });
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
}
