import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import User, { userModel } from '../models/user/user';

@Resolver(User)
export class RegisterResolver {
  @Query(() => User)
  async getUser(@Arg('username') username: string): Promise<User> {
    let user!: User;
    await userModel.findOne({ username: username }, (err, res) => {
      if (err) throw new Error();
      user = res!;
    });
    return user;
  }

  @Mutation(() => User)
  async register(@Arg('username') username: string, @Arg('password') password: string): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return new userModel({
      username: username,
      password: hashedPassword,
    }).save();
  }
}
