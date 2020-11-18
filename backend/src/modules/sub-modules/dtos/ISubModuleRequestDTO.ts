export default interface ISubModuleRequestDTO {
  module_id: string;
  name: string;
  order: number;
  content: {
    order: number;
    image_url: string;
  }[];
}
