import { InputType, Field } from "type-graphql";
import { CreateUser } from "../../db/inputInterfaces/CreateUser";
import { UserRole } from "../../utilities/UserRoles";
import { CompositionType } from "../../utilities/CompositionType";
import {
  ArrayUnique,
  IsString,
  Length,
  IsEmail,
  IsBoolean,
  IsEnum,
  ValidateIf,
  IsOptional,
  ArrayNotEmpty,
  ArrayMaxSize,
  IsNotEmpty,
  IsDefined,
} from "class-validator";
import { IsUsernameAlreadyExist } from "../validations/Username.validation";
import { IsEmailAlreadyExist } from "../validations/Email.validation";

@InputType()
export class CreateUserInput implements CreateUser {
  @Field(() => String)
  @IsString()
  @Length(5, 30)
  @IsUsernameAlreadyExist({
    message: "Username $value already taken. Choose another username.",
  })
  username: string;

  @Field(() => String)
  @IsEmail()
  @IsString()
  @IsEmailAlreadyExist({
    message: "Email $value already exists",
  })
  email: string;

  @Field(() => String)
  @IsString()
  @Length(8, 30)
  password: string;

  @Field(() => Boolean)
  @IsBoolean()
  isComposer: boolean;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field(() => [CompositionType], { nullable: true })
  @ValidateIf(user => user.isComposer == true)
  @IsDefined()
  @IsEnum(CompositionType, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  typeOfCompositions?: CompositionType[];
}