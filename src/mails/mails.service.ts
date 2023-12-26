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
import { Letter } from 'src/entities/letter.entity';

@Injectable()
export class MailsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getMyMails(userId: string) {
    const myMails = await this.dataSource.getRepository(Mail).find({
      where: {
        userId,
      },
      relations: {
        letter: true,
      },
    });
    return myMails.map(
      (mail) =>
        new LetterFromMailResponseDTO({
          ...mail.letter,
          replyLetterId: mail.replyLetterId,
        }),
    );
  }

  async saveMails(id: string, saveMailRequestDTO: SaveMailRequestDTO) {
    const repository = this.dataSource.getRepository(Mail);
    const newMails = repository.create({
      userId: id,
      letterId: saveMailRequestDTO.letterId,
    });

    await repository.save(newMails);

    return newMails;
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

  async updateReplyMail(updateMailRequetDTO: UpdateMailRequetDTO) {
    const repository = this.dataSource.getRepository(Mail);
    const currentMail = await repository.findOne({
      where: {
        id: updateMailRequetDTO.mailId,
      },
    });

    const existLetter = await this.dataSource
      .createQueryBuilder()
      .from(Letter, 'lt')
      .where('id = :letterId', {
        letterId: updateMailRequetDTO.replyLetterId,
      });
    if (existLetter) {
      currentMail.replyLetterId = updateMailRequetDTO.replyLetterId;
      await repository.save(currentMail);
      return true;
    }
    return false;
  }
}
