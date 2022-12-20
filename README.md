# TanStack Table Provider (aka React Table Provider)
A thin wrapper around [TanStack Table](https://tanstack.com/table/v8) that creates a context to compose the table across multiple components.

![React Table Provider](https://github.com/johanan/react-table-provider/actions/workflows/npm-publish.yml/badge.svg)

## TanStack Table (aka React Table)
React Table recently underwent a rewrite and has a new name: **TanStack Table**. There are breaking changes from the last version which lead to the updates in here.

There are two type of people that have tables in their React app. Those that use TanStack Table and those that haven't discovered TanStack Table yet.

TanStack Table isn't only for tables. Any data that can be sorted, filtered, paged, arranged works perfectly in TanStack Table. A list of products with filters in the sidebar? **TanStack Table**.

Building UIs with components that share state across one page is difficult with TanStack Table. Doing this requires a context that can hold and share the state across components.

### React Table Rename
This project initially started when TanStack Table was still known by React Table. Because of this the context and hook are available as both TanStack and React Table.
There is no functional difference, in fact it is just a rename of the variable.
```js
export const TanStackTableProvider = ReactTableProvider;
export const useTanStackTableContext = useReactTableContext;
```

## Demo - Quickstart
[Code Sandbox Demo](https://codesandbox.io/s/sad-proskuriakova-lhuvx)

Why React Table Provider? Simple composition over shared table state.
```jsx
<TanStackTableProvider
    columns={columns}
    data={data}
>
    <Debug />
    <ColumnHiding />
    <Table />
    <Pagination />
</TanStackTableProvider>
```

## How to Use 
This library literally passes all the options from TanStack Table through. The Api follows what you can do in TanStack Table.

[Review the React Table docs](https://tanstack.com/table/v8/docs/guide/introduction)

### Which TanStack Table APIs are included? 
All of them! Every feature api is included so that you have full functionality. All the high level table options can be passed directly to `ReactTableProvider` component.

```jsx
<ReactTableProvider
        columns={columns}
        data={data}
        initialState={initState}
        state={state}
        onStateChange={setState}
      />
```

This is quite literally this code:
```jsx
export const ReactTableProvider = <D extends RowData>({
    children,
    ...options
}: ReactTableProviderProps<D>) => {

    const table = useReactTable(options);

    return (
        <ReactTableContext.Provider value={table}>
            {children}
        </ReactTableContext.Provider>
    );

};
```

### What do I get back from the context?
Each component under the provider will have access to the table state through the `useReactTableContext` hook.

Check each React Table #instance link above to see what is available. 

```jsx
export const Table = ()=> {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
      } = useReactTableContext();
      // your table here
      return ( )
}
``` 