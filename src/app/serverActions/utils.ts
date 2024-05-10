import { auth } from '@joy/auth';
import { HttpStatusCode } from '@joy/types/api';
import { apiFailure, apiSuccess } from '@joy/utils/api';

/**
 * A generic function to remove an item from the database.
 *
 * @param joyId the id of the item to remove
 * @param prismaModel the prisma model to use
 * @param adminOnly whether only admins can remove the item
 */
export async function joyRemoveItemFromDb(
  joyId: number,
  prismaModel: any,
  adminOnly: boolean = false,
) {
  const session = await auth();
  const sessionUser = session?.user;
  if (adminOnly && !sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  if (!sessionUser) {
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
