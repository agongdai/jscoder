'use server';
import { auth } from '@joy/auth';
import { prisma } from '@joy/db';
import { HttpStatusCode } from '@joy/types/api';
import { IFormNewUser } from '@joy/types/user';
import { apiFailure, apiSuccess } from '@joy/utils/api';
import { User } from '@prisma/client';

export async function fetchUsers(): Promise<User[]> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return [];
  }

  return prisma.user.findMany({});
}

export async function createUser({ username }: IFormNewUser) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.email) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: sessionUser.email,
    },
  });

  if (existingUserWithEmail) {
    return apiFailure(HttpStatusCode.Conflict, `Email ${sessionUser.email} has been registered.`);
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      name: sessionUser.name || '',
      email: sessionUser.email || '',
      image: sessionUser.image || '',
      isAdmin: sessionUser.email === process.env.ADMIN_EMAIL,
      provider: sessionUser.image
        ? sessionUser.image.includes('googleusercontent')
          ? 'google'
          : 'github'
        : '',
    },
  });

  return apiSuccess<User>(newUser);
}
