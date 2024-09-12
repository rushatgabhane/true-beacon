'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { login } from '@/lib/actions/auth';
import { addOrder } from '@/lib/actions/order';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  symbol: z.string().trim().min(3, {
    message: 'Symbol must be at least 3 characters.',
  }),

  price: z.string().min(0.01, {
    message: 'Price must be at least 0.01.',
  }),
  quantity: z.string().min(1, {
    message: 'Quantity must be at least 1.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

function Order() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  function onSubmit(data: FormValues) {
    addOrder(data.symbol, Number(data.quantity), Number(data.price)).then(
      (response) => {
        if (response?.status === 200) {
          return;
        }
        const data = response.data;

        toast({
          title: `message: ${data.message}`,
          description: `order_id: ${data.order_id}`,
        });
      }
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm mt-32">
          <CardHeader>
            <CardTitle className="text-2xl">Create order</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="SPX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Create order</Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}

export default Order;
