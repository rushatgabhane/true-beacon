import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getProfile } from '@/lib/actions/profile';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type Profile = {
  user_id: string;
  user_type: string;
  email: string;
  user_name: string;
  broker: string;
};

export default function ProfileDetails() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data);
    });
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-gray-200 w-10 h-10 dark:border-gray-800"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/true-beacon.png"
              alt="User Avatar"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-blue-600">
            <AvatarImage
              src="https://github.com/true-beacon.png"
              alt="User Avatar"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium leading-none">
              {profile?.user_id}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {profile?.email}
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Broker: {profile?.broker}</p>
          <p className="text-sm font-medium">User type: {profile?.user_type}</p>
          <p className="text-sm font-medium">Username: {profile?.user_name}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
