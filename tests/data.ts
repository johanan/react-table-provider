import { Column } from "react-table";

export interface TestData {
    firstName: string,
    lastName: string,
    age: number
}
const createDataObject = (first: string) => (index: number) => ({ firstName: `${first}-${index}`, lastName: `Last-${index}`, age: index })

export const createTestData = (count: number, first = "First") => [...Array(count).keys()].map(createDataObject(first));
export const columns : Column<TestData>[] = [
    {Header: 'First Name', accessor: 'firstName'},
    {Header: 'Last Name', accessor: 'lastName'},
    {Header: 'Age', accessor: 'age'},
]