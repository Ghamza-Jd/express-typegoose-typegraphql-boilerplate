import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, Root } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  public _id!: string;

  @prop()
  @Field()
  public firstName!: string;

  @prop()
  @Field()
  public lastName!: string;

  @prop()
  @Field()
  public username!: string;

  @prop()
  @Field()
  public email!: string;

  @prop()
  public password!: string;

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}

// Export it as a model to save it in mongodb
export const userModel = getModelForClass(User);

// Export it as class to use it as a type for graphql
export default User;
