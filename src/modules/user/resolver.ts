import 'reflect-metadata';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import User, { userModel } from './User';
import { RegisterInput } from './input';
import Context from '../../Context';
import accessToken from '../../accessToken';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true, description: 'Query Description' })
  async getUser(@Arg('username', { description: 'Param Description' }) username: string): Promise<User> {
    let user!: User;
    await userModel.findOne({ username: username }, (err, res) => {
      if (err) throw new Error();
      user = res!;
    });
    return user;
  }

  @Mutation(() => User)
  async register(@Arg('data') { firstName, lastName, username, email, password, roles }: RegisterInput): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return new userModel({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles,
    }).save();
  }
}

@Resolver()
export class LoginResolver {
  @Mutation(() => String)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context,
  ): Promise<String | null> {
    let user!: User;
    await userModel.findOne({ username: username }, (err, res) => {
      if (err) throw new Error();
      user = res!;
    });
    if (!user) return null;
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return null;
    const token = accessToken.generateAccessToken(username);
    ctx.token = token;
    return token;
  }
}
