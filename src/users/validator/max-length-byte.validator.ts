import { registerDecorator, ValidationOptions } from 'class-validator';

const LINE_FEED = 10; // '\n'

export function getByteLength(decimal: number) {
  return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
}

export function getLimitedByteText(inputText: string, maxByte: number) {
  const characters = inputText.split('');

  return (
    characters.reduce((acc, cur) => {
      const decimal = cur.charCodeAt(0);
      const byte = getByteLength(decimal); // 글자 한 개가 몇 바이트 길이인지 구해주기
      return acc + byte;
    }, 0) <= maxByte
  );
}

export function MaxByteLength(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MaxByteLength',
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [], // * 아래 validate 의 args.contraints로 넘어감
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return getLimitedByteText(value, max);
        },
      },
    });
  };
}
