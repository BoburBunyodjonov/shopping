// hooks/useUser.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  access: boolean
  // kerakli boshqa property'lar
}

export const useUser = (id: string) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(userInfo)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(`https://srvr.bordoshoes.uz/users/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setUserInfo(response.data);
      }catch (err) {
        console.error(err);
        setError('Foydalanuvchi topilmadi');
      }
       finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { userInfo, loading, error };
};
