import { Response } from 'src/common/interface';

export const createResponse = <T>(
  result?: T,
  ok: boolean = true,
): Response<T> => {
  return {
    ok,
    ...(result ? { data: result } : {}),
  };
};
