'use server';
import { joyCreateItem, joyRemoveItemFromDb, joyUpdateItem } from '@joy/app/serverActions/base';
import prisma from '@joy/db';
import { IFormCv } from '@joy/types/cv';
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
export async function joyCreateCv(cv: IFormCv) {
  return joyCreateItem<IFormCv, ColorVariable>(cv, prisma.colorVariable, { admin: true }, 'key');
}

/**
 * Remove color variable by id.
 * @param joyId
 */
export async function joyRemoveCv(joyId: number) {
  return joyRemoveItemFromDb(joyId, prisma.colorVariable, { admin: true });
}

/**
 * Update color variable by id.
 * @param cv
 */
export async function joyUpdateCv(cv: ColorVariable) {
  return joyUpdateItem<ColorVariable>(cv, prisma.colorVariable, { admin: true });
}
