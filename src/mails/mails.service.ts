import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Mail } from './entities/mail.entity';
import { LetterFromMailResponseDTO } from './dtos/mails.response.dto';
import {
  ReadMailRequestDTO,
  SaveMailRequestDTO,
  UpdateMailRequetDTO,
} from './dtos/mails.request.dto';
import { Letter } from 'src/letters/entities/letter.entity';

@Injectable()
export class MailsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getMyMailById(userId: string, mailId: string) {
    const mail = await this.dataSource.getRepository(Mail).findOne({
      where: {
        id: mailId,
        userId,
      },
      relations: {
        letter: true,
      },
    });
    if (!mail) {
      throw new BadRequestException();
    }
    return new LetterFromMailResponseDTO({
      ...mail.letter,
      mailId,
      isRead: mail.isRead,
      replyLetterId: mail.replyLetterId,
    });
  }

  async getMyMails(userId: string) {
    const myMails = await this.dataSource.getRepository(Mail).find({
      where: {
        userId,
      },
      relations: {
        letter: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return myMails.map(
      (mail) =>
        new LetterFromMailResponseDTO({
          ...mail.letter,
          mailId: mail.id,
          isRead: mail.isRead,
          replyLetterId: mail.replyLetterId,
        }),
    );
  }

  async saveMails(id: string, saveMailRequestDTO: SaveMailRequestDTO) {
    const repository = this.dataSource.getRepository(Mail);
    const existMail = await repository.findOne({
      where: {
        userId: id,
        letterId: saveMailRequestDTO.letterId,
      },
    });
    if (!existMail) {
      const newMails = repository.create({
        userId: id,
        letterId: saveMailRequestDTO.letterId,
      });

      await repository.save(newMails);

      return newMails;
    }
    return existMail;
  }

  async readMail(id: string, readMailRequestDTO: ReadMailRequestDTO) {
    const repository = this.dataSource.getRepository(Mail);
    const currentMail = await repository.findOne({
      where: {
        userId: id,
        id: readMailRequestDTO.mailId,
      },
    });

    if (!currentMail) {
      throw new BadRequestException();
    }

    currentMail.isRead = true;
    await repository.save(currentMail);

    return true;
  }

  /**
   * @param updateMailRequetDTO
   * @returns
   */
  async updateReplyMail(updateMailRequetDTO: UpdateMailRequetDTO) {
    const repository = this.dataSource.getRepository(Mail);
    const existLetter = await this.dataSource
      .createQueryBuilder()
      .from(Letter, 'lt')
      .where('id = :letterId', {
        letterId: updateMailRequetDTO.replyLetterId,
      })
      .getOne();

    if (existLetter) {
      const currentMail = await repository.findOne({
        where: {
          id: updateMailRequetDTO.mailId,
          userId: existLetter.senderId,
        },
      });
      currentMail.replyLetterId = updateMailRequetDTO.replyLetterId;
      await repository.save(currentMail);
      return true;
    }
    return false;
  }
}
