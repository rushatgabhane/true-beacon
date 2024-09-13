import { useEffect, useState } from 'react';
import { Card, CardHeader } from './ui/card';

export default function LivePrice() {
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/live-price');
    socket.addEventListener('message', (event) => {
      setPrice(event.data);
    });
  }, []);

  const priceInRupees = Number(price) / 100;

  return (
    price &&
    !isNaN(priceInRupees) && (
      <div className="w-48">
        <Card>
          <CardHeader>
            <div>
              <div className="relative z-30 flex flex-1 flex-col justify-center">
                <span className="text-xs text-muted-foreground mb-1">
                  Price from Websocket
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  ₹{priceInRupees}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  );
}
