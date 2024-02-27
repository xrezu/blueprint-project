export interface User {
  id: number;
  username: string;
  password?: string; // Considera marcar la contraseña como opcional o quitarla si no se almacena en el frontend
  name: string;
  role: string;
  email: string;
  token?: string; // Agrega esta línea para incluir el token de autenticación
}
