/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from '@faker-js/faker'

const range = (len) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const newPerson = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>([
        'relationship',
        'complicated',
        'single',
      ])[0]!,
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((_d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
