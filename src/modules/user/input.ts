import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  @Length(3, 16, { message: 'Provide a username having at least 3 characters and at most 16' })
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}
