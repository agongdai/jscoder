import { auth } from '@joy/auth';
import { AnyPrismaModel, HttpStatusCode } from '@joy/types/api';
import { apiFailure, apiSuccess } from '@joy/utils/api';

type PermissionOptions = {
  logined?: boolean;
  admin?: boolean;
};

/**
 * Check whether the user is eligible to perform the action.
 * @param logined
 * @param admin
 */
export async function eligible({ logined, admin }: PermissionOptions) {
  const session = await auth();
  const sessionUser = session?.user;

  if (admin && sessionUser?.isAdmin) {
    return true;
  }

  if (logined && !!sessionUser) {
    return true;
  }

  return false;
}

/**
 * A generic function to remove an item from the database.
 *
 * @param joyId the id of the item to remove
 * @param prismaModel the prisma model to use
 * @param permissionOptions the permission options
 */
export async function joyRemoveItemFromDb(
  joyId: number,
  prismaModel: AnyPrismaModel,
  permissionOptions: PermissionOptions,
) {
  if (!(await eligible(permissionOptions))) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const item = await prismaModel?.findUnique({
    where: { joyId },
  });

  if (!item) {
    return apiFailure(HttpStatusCode.NotFound, 'Item not found in the database.');
  }

  await prismaModel?.delete({
    where: { joyId },
  });

  return apiSuccess(item);
}

/**
 * A generic function to create an item in the database.
 *
 * @param newItem
 * @param prismaModel
 * @param uniqueField before creating the item, check whether the item with uniqueField has existed or not
 * @param permissionOptions the permission options
 */
export async function joyCreateItem<T, N>(
  newItem: T,
  prismaModel: AnyPrismaModel,
  permissionOptions: PermissionOptions,
  uniqueField?: keyof T,
) {
  if (!(await eligible(permissionOptions))) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  if (uniqueField) {
    const existingItem = await prismaModel?.findFirst({
      where: {
        [uniqueField]: newItem[uniqueField],
      },
    });

    if (existingItem) {
      return apiFailure(
        HttpStatusCode.Conflict,
        `The item with ${String(uniqueField)} ${newItem[uniqueField]} exists already.`,
      );
    }
  }

  const createdItem = await prismaModel?.create({
    data: {
      ...newItem,
    },
  });

  return apiSuccess<N>(createdItem);
}

/**
 * A generic function to update an item in the database.
 *
 * @param itemWithUpdatedData
 * @param prismaModel
 * @param permissionOptions
 */
export async function joyUpdateItem<T extends { joyId: number }>(
  itemWithUpdatedData: T,
  prismaModel: AnyPrismaModel,
  permissionOptions: PermissionOptions,
) {
  if (!(await eligible(permissionOptions))) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingItem = await prismaModel?.findFirst({
    where: {
      joyId: itemWithUpdatedData?.joyId,
    },
  });

  if (!existingItem) {
    return apiFailure(HttpStatusCode.Conflict, `The item does not exist.`);
  }

  const updatedItem = await prismaModel?.update({
    where: { joyId: itemWithUpdatedData?.joyId },
    data: {
      ...itemWithUpdatedData,
    },
  });

  return apiSuccess<T>(updatedItem);
}
