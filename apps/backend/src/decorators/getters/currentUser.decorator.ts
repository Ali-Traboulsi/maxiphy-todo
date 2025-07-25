import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to get the current authenticated user from the request.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
export type CurrentUser = ReturnType<typeof CurrentUser>;
