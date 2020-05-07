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
    @Mutation(() => returnType, { name: `delete${suffix}` })
    async delete(@Arg('id', () => String) id: string) {
      const model = await modelType.findById(id);
      await modelType.deleteOne({ _id: id });
      return model;
    }
    @Mutation(() => returnType, { name: `update${suffix}` })
    async update(@Arg('id', () => String) id: string, @Arg('data', () => inputType) data: any) {
      await modelType.updateOne({ _id: id }, data);
      return await modelType.findById(id);
    }
  }
  return BaseResolver;
}

export default baseResolver;
