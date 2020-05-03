import { AuthChecker } from 'type-graphql';
import ContextType from './ContextType';

export const authChecker: AuthChecker<ContextType> = ({ root, args, context, info }, roles) => {
  console.log(root, args, context, info, roles);

  return true; // or false if access is denied
};
