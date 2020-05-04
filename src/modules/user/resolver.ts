import 'reflect-metadata';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import User, { userModel } from './User';
import { RegisterInput } from './input';
import accessToken from '../../accessToken';
import Context from '../../context';

@Resolver()
export class UserResolver {
  @Authorized('MODERATOR')
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

  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Context) {
    let user!: User;
    const currentUser = accessToken.validateAccessToken(ctx.req.headers.authorization);
    await userModel.findOne({ username: currentUser?.username }, (err, res) => {
      if (err) throw new Error();
      user = res!;
    });
    return user;
  }
}

@Resolver()
export class LoginResolver {
  @Mutation(() => String, { description: 'Requesting an access token by Logging in' })
  async login(@Arg('password') password: string, @Arg('username') username: string): Promise<String | null> {
    let user!: User;
    await userModel.findOne({ username: username }, (err, res) => {
      if (err) throw new Error();
      user = res!;
    });
    if (!user) return null;
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return null;
    return accessToken.generateAccessToken(user);
  }
}
