import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Args,
  Authorized,
} from "type-graphql";
import { CreateRelatedPhrasesInput } from "../inputs/CreateRelatedPhrases.input";
import { UpdateRelatedPhrasesInput } from "../inputs/UpdateRelatedPhrases.input";
import { Inject } from "typedi";
import { RelatedPhrasesService } from "../../services/RelatedPhrasesService";
import { Context } from "../../context/context.interface";
import { MyError } from "../../services/serviceUtils/MyError";
import { UserError } from "../../utilities/genericTypes";
import {
  BooleanPayload,
  RelatedPhrasePayload,
  RelatedPhrasesPayload,
} from "../../services/serviceUtils/Payloads";
import { IdArgs } from "../arguments/id.args";
import { UserRole } from "../../utilities/UserRoles";
import { ArrayArgs } from "../arguments/array.args";

@Resolver()
export class RelatedPhrasesResolver {
  @Inject()
  private readonly relatedPhrasesService: RelatedPhrasesService;

  @Query(() => RelatedPhrasesPayload, {
    complexity: ({ childComplexity, args }) => args.limit * childComplexity,
  })
  async relatedPhrases(@Args() { limit, offset }: ArrayArgs) {
    try {
      return await this.relatedPhrasesService.getAllRelatedPhrases(
        limit,
        offset
      );
    } catch (e) {
      if (e instanceof MyError) {
        return new UserError(e.message);
      }
    }
  }

  @Query(() => RelatedPhrasePayload, { complexity: 2 })
  async relatedPhrase(@Args() { id }: IdArgs) {
    try {
      return await this.relatedPhrasesService.getRelatedPhrase(id);
    } catch (e) {
      if (e instanceof MyError) {
        return new UserError(e.message);
      }
    }
  }

  @Authorized<UserRole>(UserRole.Admin, UserRole.Superadmin)
  @Mutation(() => RelatedPhrasePayload, { complexity: 3 })
  async createRelatedPhrases(
    @Ctx() { user }: Context,
    @Arg("data") data: CreateRelatedPhrasesInput
  ) {
    try {
      let relatedPhrase = await this.relatedPhrasesService.createRelatedPhrase(
        user,
        data
      );
      return relatedPhrase;
    } catch (e) {
      if (e instanceof MyError) {
        return new UserError(e.message);
      }
    }
  }

  @Authorized<UserRole>(UserRole.Admin, UserRole.Superadmin)
  @Mutation(() => RelatedPhrasePayload, { complexity: 3 })
  async updateRelatedPhrases(
    @Ctx() { user }: Context,
    @Args() { id }: IdArgs,
    @Arg("data") data: UpdateRelatedPhrasesInput
  ) {
    try {
      let relatedPhrases = await this.relatedPhrasesService.updateRelatedPhrases(
        user,
        id,
        data
      );
      return relatedPhrases;
    } catch (e) {
      if (e instanceof MyError) {
        return new UserError(e.message);
      }
    }
  }

  @Authorized<UserRole>(UserRole.Admin, UserRole.Superadmin)
  @Mutation(() => BooleanPayload, { complexity: 3 })
  async deleteRelatedPhrase(@Ctx() { user }: Context, @Args() { id }: IdArgs) {
    try {
      return await this.relatedPhrasesService.deleteRelatedPhrase(user, id);
    } catch (e) {
      if (e instanceof MyError) {
        return new UserError(e.message);
      }
    }
  }
}
