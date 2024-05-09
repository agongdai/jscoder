'use server';
import { auth } from '@joy/auth';
import prisma from '@joy/db';
import { HttpStatusCode } from '@joy/types/api';
import { IFormNewCv } from '@joy/types/cv';
import { apiFailure, apiSuccess } from '@joy/utils/api';
import { ColorVariable } from '@prisma/client';

/**
 * Fetch all color variables.
 */
export async function joyFetchColorVariables(): Promise<ColorVariable[]> {
  return prisma.colorVariable.findMany({});
}

/**
 *
 * @param cv
 */
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

/**
 * Remove color variable by id.
 * @param joyId
 */
export async function joyRemoveCv(joyId: number) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const cv = await prisma.colorVariable.findUnique({
    where: { joyId },
  });

  if (!cv) {
    return apiFailure(HttpStatusCode.NotFound, 'Color variable not found.');
  }

  await prisma.colorVariable.delete({
    where: { joyId },
  });

  return apiSuccess(cv);
}
