import { Max, Min } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ArrayArgs {
  @Field(() => Int)
  @Min(1)
  @Max(100)
  limit: number;

  @Field(() => Int)
  @Min(0)
  offset: number;
}
