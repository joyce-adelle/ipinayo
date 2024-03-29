import { MyError } from "./MyError";

export class InvalidEmailOrPasswordError extends MyError {
  constructor() {
    const message = "invalid email or password";
    super(message);
  }
}

export class EmailAlreadyExistsError extends MyError {
  constructor() {
    const message = "email already exists";
    super(message);
  }
}

export class UsernameAlreadyExistsError extends MyError {
  constructor() {
    const message = "username already exists";
    super(message);
  }
}

export class CompositionsRequiredError extends MyError {
  constructor() {
    const message = "type of compositions required if user is a composer";
    super(message);
  }
}

export class InvalidInputCompositionError extends MyError {
  constructor() {
    const message = "type of compositions cannot be if user is not a composer";
    super(message);
  }
}

export class UserNotFoundError extends MyError {
  constructor(id: string) {
    const message = `user with id ${id} not found`;
    super(message);
  }
}

export class UnAuthorizedError extends MyError {
  constructor() {
    const message = "user not allowed access, please login or re-login";
    super(message);
  }
}

export class CannotBeDeletedError extends MyError {
  constructor() {
    const message = "phrase cannot be deleted";
    super(message);
  }
}

export class PhraseExistsError extends MyError {
  constructor() {
    const message = "phrase already exists";
    super(message);
  }
}

export class PhraseNotFoundError extends MyError {
  constructor(id: string) {
    const message = `phrase with id ${id} not found`;
    super(message);
  }
}

export class MusicNotFoundError extends MyError {
  constructor(id: string) {
    const message = `music with id ${id} not found`;
    super(message);
  }
}

export class CategoryNotFoundError extends MyError {
  constructor(id: string) {
    const message = `category with id ${id} not found`;
    super(message);
  }
}

export class CategoryExistsError extends MyError {
  constructor() {
    const message = "category name already exists";
    super(message);
  }
}

export class InvalidGroupIdError extends MyError {
  constructor(groupId: string) {
    const message = `invalid group id ${groupId}`;
    super(message);
  }
}

export class UserWithEmailNotFoundError extends MyError {
  constructor(email: string) {
    const message = `user with email ${email} not found`;
    super(message);
  }
}

export class PasswordsDoNotMatchError extends MyError {
  constructor() {
    const message = "password and confirmed password don't match";
    super(message);
  }
}

export class PasswordError extends MyError {
  constructor() {
    const message = "incorrect input password, cannot change password";
    super(message);
  }
}

export class AlreadyConfirmedError extends MyError {
  constructor() {
    const message = "already verified please re-login";
    super(message);
  }
}

export class ExpiredError extends MyError {
  constructor() {
    const message = "session or link expired.";
    super(message);
  }
}

export class InvalidLinkError extends MyError {
  constructor() {
    const message = "invalid link";
    super(message);
  }
}

export class UnknownError extends MyError {
  constructor() {
    const message =
      "Error occurred while processing request, plaese try again.";
    super(message);
  }
}
