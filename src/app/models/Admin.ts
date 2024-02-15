import { User, UserRole } from './User';

export class Admin extends User {
  constructor(username: string) {
    super(username, UserRole.ADMIN);
  }

  // Métodos específicos para administradores de fondos, si es necesario
}
