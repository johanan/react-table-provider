import { ColumnDef } from "@tanstack/react-table";

export interface TestData {
    firstName: string,
    lastName: string,
    age: number
}
const createDataObject = (first: string) => (index: number) => ({ firstName: `${first}-${index}`, lastName: `Last-${index}`, age: index })

export const createTestData = (count: number, first = "First") => [...Array(count).keys()].map(createDataObject(first));
export const columns : ColumnDef<TestData>[] = [
    {header: 'First Name', accessorKey: 'firstName'},
    {header: 'Last Name', accessorKey: 'lastName'},
    {header: 'Age', accessorKey: 'age'},
]