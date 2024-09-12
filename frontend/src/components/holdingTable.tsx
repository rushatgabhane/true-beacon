import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { getHoldings } from '@/lib/actions/holding';
import { toDateString } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from './ui/card';

type Holding = {
  authorised_date: string;
  average_price: number;
  close_price: number;
  day_change: number;
  day_change_percentage: number;
  exchange: string;
  isin: string;
  last_price: number;
  pnl: number;
  quantity: number;
  tradingsymbol: string;
};

export default function HoldingTable() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    getHoldings().then((holdings) => {
      setHoldings(holdings.data);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Holdings</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Authorised date</TableHead>
            <TableHead>Average price</TableHead>
            <TableHead>Close price</TableHead>
            <TableHead>Day change</TableHead>
            <TableHead>Day change %</TableHead>
            <TableHead>Exchange</TableHead>
            <TableHead>ISIN</TableHead>
            <TableHead>Last price</TableHead>
            <TableHead>PNL</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Trading Symbol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((holding) => (
            <TableRow key={holding.isin}>
              <TableCell className="font-medium">
                {toDateString(new Date(holding.authorised_date))}
              </TableCell>
              <TableCell>{holding.average_price.toFixed(2)}</TableCell>
              <TableCell>{holding.close_price.toFixed(2)}</TableCell>
              <TableCell>{holding.day_change.toFixed(2)}</TableCell>
              <TableCell>{holding.day_change_percentage.toFixed(2)}</TableCell>
              <TableCell>{holding.exchange}</TableCell>
              <TableCell>{holding.isin}</TableCell>
              <TableCell>{holding.last_price}</TableCell>
              <TableCell>{holding.pnl.toFixed(2)}</TableCell>
              <TableCell>{holding.quantity}</TableCell>
              <TableCell>{holding.tradingsymbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
