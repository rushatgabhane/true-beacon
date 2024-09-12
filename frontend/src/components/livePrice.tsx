import { Card, CardHeader } from './ui/card';

export default function LivePrice() {
  return (
    <div className="w-48">
      <Card>
        <CardHeader>
          <div>
            <div className="relative z-30 flex flex-1 flex-col justify-center">
              <span className="text-xs text-muted-foreground">
                Price from Websocket
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                ₹1000
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
