import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import User, { userModel } from './User';
import { RegisterInput } from './input';

@Resolver(User)
export class UserResolver {
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
