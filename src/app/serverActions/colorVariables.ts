'use server';
import { auth } from '@joy/auth';
import prisma from '@joy/db';
import { HttpStatusCode } from '@joy/types/api';
import { IFormNewCv } from '@joy/types/cv';
import { apiFailure, apiSuccess } from '@joy/utils/api';
import { ColorVariable } from '@prisma/client';

export async function joyFetchColorVariables(): Promise<ColorVariable[]> {
  return prisma.colorVariable.findMany({});
}

export async function joyCreateCv(cv: IFormNewCv) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingCoin = await prisma.colorVariable.findFirst({
    where: {
      key: cv.key,
    },
  });

  if (existingCoin) {
    return apiFailure(HttpStatusCode.Conflict, `The color variable ${cv.key} exists already.`);
  }

  const newCv = await prisma.colorVariable.create({
    data: {
      ...cv,
    },
  });

  return apiSuccess<ColorVariable>(newCv);
}
