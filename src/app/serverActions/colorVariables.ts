import prisma from '@joy/db';
import { ColorVariable } from '@prisma/client';

export async function joyFetchColorVariables(): Promise<ColorVariable[]> {
  return prisma.colorVariable.findMany({});
}
