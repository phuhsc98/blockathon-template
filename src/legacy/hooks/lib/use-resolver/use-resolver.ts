import { noobj } from '@front-end/core';
import { zodResolver as customResolver } from '@hookform/resolvers/zod';

export interface UseResolver {
  resolver: any;
  register: (name: string, rules?: object) => object;
}

export function useResolver(schema: any): UseResolver {
  const register = (name: string, rules: object = noobj) => {
    let registerResult: any = {
      name,
    };

    if (rules) {
      registerResult = { ...registerResult, rules };
    }

    return registerResult;
  };

  return { resolver: customResolver(schema), register };
}

export default useResolver;
