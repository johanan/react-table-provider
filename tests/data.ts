const createDataObject = (index: number) => ({ firstName: `First-${index}`, lastName: `Last-${index}`, age: index })

export const createTestData = (count: number) => [...Array(count).keys()].map(createDataObject);
export const columns = [
    {Header: 'First Name', accessor: 'firstName'},
    {Header: 'Last Name', accessor: 'lastName'},
    {Header: 'Age', accessor: 'age'},
]