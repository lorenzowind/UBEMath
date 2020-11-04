import { Level, Module } from '../pages/Modules';

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
