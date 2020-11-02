export interface Level {
  id: string;
  name: string;
  order: number;
}

export interface Module {
  id: string;
  level_id: string;
  order: number;
  name: string;
  description: string;
  is_exercise: boolean;
  image_url: string;
}

export default function sortArrayByOrder(
  array: Level[] | Module[],
): Level[] | Module[] {
  const auxArray = array;
  for (let i = 0; i < auxArray.length; i += 1) {
    for (let j = 0; j < auxArray.length; j += 1) {
      if (auxArray[i].order < auxArray[j].order) {
        const aux = auxArray[i];
        auxArray[i] = auxArray[j];
        auxArray[j] = aux;
      }
    }
  }

  return auxArray;
}
