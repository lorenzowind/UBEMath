export default interface ICreateAlternativesRequestDTO {
  question_id: string;
  alternatives: {
    letter: string;
    description: string;
  }[];
}
