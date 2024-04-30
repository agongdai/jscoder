import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    joyId: number;
    isAdmin: boolean;
    provider: string | null;
    username?: string | null;
    image: string;
    name?: string | null;
    email?: string | null;
  }
}
