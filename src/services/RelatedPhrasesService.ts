import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserInterface } from "../context/user.interface";
import { RelatedPhraseNotRetrieved } from "../db/dbUtils/DbErrors";
import { RelatedPhrases } from "../db/entities/RelatedPhrases";
import { CreateRelatedPhrases } from "../db/inputInterfaces/CreateRelatedPhrases";
import { UpdateRelatedPhrases } from "../db/inputInterfaces/UpdateRelatedPhrases";
import { RelatedPhrasesRepository } from "../db/repositories/RelatedPhrasesRepository";
import { UserRole } from "../utilities/UserRoles";
import {
  CannotBeDeletedError,
  InvalidGroupIdError,
  PhraseExistsError,
  PhraseNotFoundError,
  UnAuthorizedError,
  UnknownError,
} from "./serviceUtils/Errors";
import { MyError } from "./serviceUtils/MyError";
import { BooleanType } from "./serviceUtils/subEntities/BooleanType";
import { RelatedPhrasesArray } from "./serviceUtils/subEntities/RelatedPhrasesArray";

@Service()
export class RelatedPhrasesService {
  @InjectRepository()
  private readonly relatedPhrasesRepository: RelatedPhrasesRepository;

  public async getAllRelatedPhrases(
    limit: number = 20,
    offset: number = 0
  ): Promise<RelatedPhrasesArray> {
    try {
      const [
        relatedPhrases,
        totalCount,
      ] = await this.relatedPhrasesRepository.all(limit, offset);
      return Object.assign(new RelatedPhrasesArray(), {
        relatedPhrases,
        totalCount,
      });
    } catch (error) {
      if (error instanceof MyError) throw error;

      console.log(error);
      throw new UnknownError();
    }
  }

  public async getRelatedPhrase(id: string): Promise<RelatedPhrases> {
    try {
      const phrase = await this.relatedPhrasesRepository.findOneById(id);
      if (!phrase) throw new PhraseNotFoundError(id);
      return phrase;
    } catch (error) {
      if (error instanceof MyError) throw error;

      console.log(error);
      throw new UnknownError();
    }
  }

  public async createRelatedPhrase(
    user: UserInterface,
    data: CreateRelatedPhrases
  ): Promise<RelatedPhrases> {
    try {
      if (!user) throw new UnAuthorizedError();
      if (user.role === UserRole.User) throw new UnAuthorizedError();
      if (await this.relatedPhrasesRepository.findOneByPhrase(data.phrase))
        throw new PhraseExistsError();
      if (data.groupId) {
        if (
          !(await this.relatedPhrasesRepository.findOneByGroupId(data.groupId))
        )
          throw new InvalidGroupIdError(data.groupId);
      }
      return this.relatedPhrasesRepository.createAndSave(data);
    } catch (error) {
      if (error instanceof MyError) throw error;

      console.log(error);
      throw new UnknownError();
    }
  }

  public async updateRelatedPhrases(
    user: UserInterface,
    id: string,
    data: UpdateRelatedPhrases
  ): Promise<RelatedPhrases> {
    try {
      if (!user) throw new UnAuthorizedError();
      if (user.role === UserRole.User) throw new UnAuthorizedError();
      if (data.phrase) {
        if (await this.relatedPhrasesRepository.findOneByPhrase(data.phrase))
          throw new PhraseExistsError();
      }
      if (data.groupId) {
        if (
          !(await this.relatedPhrasesRepository.findOneByGroupId(data.groupId))
        )
          throw new InvalidGroupIdError(data.groupId);
      }
      return await this.relatedPhrasesRepository.updateRelatedPhrases(id, data);
    } catch (error) {
      if (error instanceof RelatedPhraseNotRetrieved)
        throw new PhraseNotFoundError(id);
      if (error instanceof MyError) throw error;

      console.log(error);
      throw new UnknownError();
    }
  }

  public async deleteRelatedPhrase(
    user: UserInterface,
    id: string
  ): Promise<BooleanType> {
    try {
      if (!user) throw new UnAuthorizedError();
      if (user.role === UserRole.User) throw new UnAuthorizedError();
      const done = await this.relatedPhrasesRepository.deleteRelatedPhrase(id);
      if (!done) throw new CannotBeDeletedError();
      return Object.assign(new BooleanType(), { done });
    } catch (error) {
      if (error instanceof RelatedPhraseNotRetrieved)
        throw new PhraseNotFoundError(id);
      if (error instanceof MyError) throw error;

      console.log(error);
      throw new UnknownError();
    }
  }
}
