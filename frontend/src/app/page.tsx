'use client';
import LivePrice from '@/components/livePrice';
import Navbar from '@/components/navbar';
import PriceChart from '@/components/priceChart';
import HoldingTable from '@/components/holdingTable';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="mt-2 mx-12">
        <div className="my-8">
          <LivePrice />
        </div>

        <PriceChart />
        <div className="my-8">
          <HoldingTable />
        </div>
      </div>
    </>
  );
}
