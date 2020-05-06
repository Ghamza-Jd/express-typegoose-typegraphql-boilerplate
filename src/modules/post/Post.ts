import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
class Post {
  @Field()
  _id!: string;

  @Field()
  @prop()
  title!: string;

  @Field()
  @prop()
  body!: string;
}

export const postModel = getModelForClass(Post);

export default Post;
