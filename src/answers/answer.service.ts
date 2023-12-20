import { Injectable } from '@nestjs/common';
import { CreateAnswerDto, toEntity } from './dtos/answer.request.dto';
import { AnswerRepository } from './answer.repository';
import { createResponse } from '../utils/response.utils';
import { AnswerDetailDto } from './dtos/answer.response.dto';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {
  }

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    const answer = toEntity(createAnswerDto);
    const newAnswer = await this.answerRepository.createAnswer(answer);
    return createResponse(new AnswerDetailDto(newAnswer));
  }

  async getAnswerDetail(id: string, answerId: string) {
    const findAnswer = await this.answerRepository.getAnswer(answerId);
    if (findAnswer.receiverId != id) {
      throw new RuntimeException('User Not Found');
    }
    return createResponse(new AnswerDetailDto(findAnswer));
  }

  async getAnswerList(id: string) {
    const findAnswerList = await this.answerRepository.getAnswerList(id);
    return createResponse(findAnswerList.map(answer => {
      new AnswerDetailDto(answer);
    }));
  }
}
