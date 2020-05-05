import faker from 'faker';

import { userModel } from '../../modules/user/User';
import { gqlCall } from './integration.util';
import { RegisterInput } from '../../modules/user/input';

const REGISTER_MUTATION = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    firstName
    lastName
    email
  }
}
`;

describe('Register', () => {
  it.only('create user', async () => {
    const user: RegisterInput = {
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: [faker.name.jobTitle()],
    };

    const response = await gqlCall({
      source: REGISTER_MUTATION,
      variableValues: {
        data: user,
      },
    });

    if (response.errors) {
      console.log(response.errors[0].originalError);
    }

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbUser = await userModel.findOne({ email: user.email });
    expect(dbUser).toBeDefined();
    expect(dbUser!.firstName).toBe(user.firstName);
  });
});
