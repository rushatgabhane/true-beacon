import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getProfile } from '@/lib/actions/profile';

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
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <div>
            <div className="text-sm text-gray-500">User ID</div>
            <div className="text-sm ">{profile?.user_id}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">User Type</div>
            <div className="text-sm">{profile?.user_type}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="text-sm">{profile?.email}</div>
          </div>
        </div>
        <div className="flex gap-8 mt-2">
          <div>
            <div className="text-sm text-gray-500">User Name</div>
            <div className="text-sm">{profile?.user_name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Broker</div>
            <div className="text-sm">{profile?.broker}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
