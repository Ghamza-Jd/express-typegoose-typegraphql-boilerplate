import { prop, Typegoose } from '@hasezoey/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User extends Typegoose {
  @prop()
  @Field()
  public username?: string;

  @prop()
  @Field()
  public password?: string;
}

// Export it as a model to use save it in mongodb
export const userModel = new User().getModelForClass(User);

// Export it as class to use it as a type for graphql
export default User;
