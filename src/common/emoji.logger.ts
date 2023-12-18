import { ConsoleLogger } from '@nestjs/common';

export class EmojiLogger extends ConsoleLogger {
  constructor() {
    super();
  }
  log(message: string) {
    super.log('📢 ' + message);
  }

  error(message: string, trace: string) {
    super.error('❌ ' + message);
    super.error('🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    super.warn('⚠️ ' + message);
  }

  debug(message: string) {
    super.debug('🐞 ' + message);
  }
}
