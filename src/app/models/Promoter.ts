import {User, UserRole} from "./User";

export class Promoter extends User {
  constructor(username: string) {
    super(username, UserRole.PROMOTER);
  }
}
