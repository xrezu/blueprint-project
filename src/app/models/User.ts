export enum UserRole {
  ADMIN = "admin",
  PROMOTER = "promoter",
  CITIZEN = "citizen"
}

export class User {
  constructor(public username: string, public role: UserRole) {}
}
