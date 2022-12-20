import { ColumnDef, getCoreRowModel, 
    getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getGroupedRowModel, getExpandedRowModel,
    getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues} from "@tanstack/react-table";

export type TestData = {
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

export const allDefaultRowModels = {
    getPaginationRowModel: getPaginationRowModel<TestData>(),
    getFilteredRowModel: getFilteredRowModel<TestData>(),
    getSortedRowModel: getSortedRowModel<TestData>(),
    getGroupedRowModel: getGroupedRowModel<TestData>(),
    getExpandedRowModel: getExpandedRowModel<TestData>(),
    getCoreRowModel: getCoreRowModel<TestData>(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    autoResetPageIndex: false
  }