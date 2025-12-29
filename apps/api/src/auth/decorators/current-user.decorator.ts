import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface CurrentUserType {
  userId: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType | undefined, context: ExecutionContext): CurrentUserType | string => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as CurrentUserType;
    
    return data ? user[data] : user;
  },
);