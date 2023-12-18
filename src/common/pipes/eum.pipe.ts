import {
  PipeTransform,
  BadRequestException,
  Logger,
  ArgumentMetadata,
} from '@nestjs/common';
import Joi from '@hapi/joi';
export class ParseExplicitEnumPipe implements PipeTransform {
  private readonly logger = new Logger(ParseExplicitEnumPipe.name);
  constructor(private schema: unknown) {}

  transform(value: unknown, {}: ArgumentMetadata) {
    try {
      const valid = Joi.string().valid(...Object.values(this.schema));
      const { error, value: validValue } = valid.validate(value);
      if (error) {
        throw new BadRequestException('서비스가 원할하지 않아요.');
      }
      return validValue;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
