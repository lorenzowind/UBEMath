export default interface ISubModuleResponseDTO {
  id: string;
  module_id: string;
  name: string;
  order: number;
  content?: {
    id: string;
    order: number;
    image_url: string;
  }[];
}
