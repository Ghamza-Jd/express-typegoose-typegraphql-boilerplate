import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import User, { userModel } from './user';

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  helloWorld() {
    return 'hello world';
  }

  @Mutation(() => User)
  register(@Arg('username') username: string, @Arg('password') password: string): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return new userModel({
      username: username,
      password: hashedPassword,
    }).save();
  }
}
