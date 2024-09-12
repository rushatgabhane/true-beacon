'use client';
import { useEffect, useState } from 'react';
import { DatePicker } from '@/components/datePicker';
import FullPageLoadingIndicator from '@/components/fullPageLoadingIndicator';
import LivePrice from '@/components/livePrice';
import Navbar from '@/components/navbar';
import PriceChart, { ChartData } from '@/components/priceChart';
import { ChartConfig } from '@/components/ui/chart';
import { getHistoricalData } from '@/lib/actions/historicalData';
import { toDateString } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import HoldingTable from '@/components/holdingTable';
import ProfileDetails from '@/components/profileDetails';


export default function Dashboard() {
  // if (!historicalData) {
  //   return <FullPageLoadingIndicator />;
  // }

  return (
    <>
      <Navbar />
      <div className="mt-2 mx-12">
        <LivePrice />

        <PriceChart />
        <div className="my-8">
          <HoldingTable />
        </div>
      </div>
    </>
  );
}
