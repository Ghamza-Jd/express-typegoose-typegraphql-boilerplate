import { userModel } from '../../src/modules/user/User';

describe('...', () => {
  it('...', async () => {
    const count = await userModel.countDocuments();
    expect(count).toEqual(0);
  });
});
