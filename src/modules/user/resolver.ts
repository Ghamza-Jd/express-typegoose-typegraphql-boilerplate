import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import User, { userModel } from './User';
import { RegisterInput } from './input';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('username') username: string): Promise<User | null> {
    let user;
    await userModel.findOne({ where: { username: username } }, (err, res) => {
      if (err) throw new Error();
      user = res;
    });
    return user ? user : null;
  }

  @Mutation(() => User)
  async register(@Arg('data') { firstName, lastName, username, email, password }: RegisterInput): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return new userModel({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
  }
}

@Resolver()
export class LoginResolver {}
