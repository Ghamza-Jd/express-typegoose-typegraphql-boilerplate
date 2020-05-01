import { prop, Typegoose } from '@hasezoey/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User extends Typegoose {
  @Field()
  public _id!: string;

  @prop()
  @Field()
  public username!: string;

  @prop()
  public password!: string;
}

// Export it as a model to save it in mongodb
export const userModel = new User().getModelForClass(User);

// Export it as class to use it as a type for graphql
export default User;
