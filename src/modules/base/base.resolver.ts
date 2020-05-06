import { Arg, ClassType, Mutation, Query, Resolver } from 'type-graphql';
import { ReturnModelType } from '@typegoose/typegoose';

function baseResolver<T extends ClassType, S extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: S,
  modelType: ReturnModelType<any>,
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg('data', () => inputType) data: any) {
      return new modelType(data).save();
    }
    @Query(() => [returnType], { name: `getAll${suffix}` })
    async getAll() {
      return modelType.find();
    }
  }

  return BaseResolver;
}

export default baseResolver;
