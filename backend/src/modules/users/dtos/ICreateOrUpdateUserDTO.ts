export default interface ICreateOrUpdateUserDTO {
  name: string;
  email: string;
  position: 'usuario' | 'admin';
  password: string;
}
