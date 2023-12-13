export const createResponse = <T>(result?: T, ok: boolean = true) => {
  return {
    ok,
    ...(result ? { data: result } : {}),
  };
};
