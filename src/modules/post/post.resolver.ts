import baseResolver from '../base/base.resolver';
import Post, { postModel } from './Post';
import { PostInput } from './post.input';
import { Resolver } from 'type-graphql';

const BaseResolver = baseResolver('Post', Post, PostInput, postModel);

@Resolver()
export class PostResolver extends BaseResolver {}
