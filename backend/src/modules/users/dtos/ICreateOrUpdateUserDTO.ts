export default interface ICreateOrUpdateUserDTO {
  name: string;
  email: string;
  position: 'user' | 'admin';
  password: string;
}
