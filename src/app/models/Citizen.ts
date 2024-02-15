import { User, UserRole } from './User';

export class Citizen extends User {
  constructor(username: string) {
    super(username, UserRole.CITIZEN);
  }

  // Métodos específicos
}
