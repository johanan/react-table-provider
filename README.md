# React Table Provider
A thin wrapper around [React Table](https://react-table.tanstack.com/) for creating a context to compose the table across multiple files.

![React Table Provider](https://github.com/johanan/react-table-provider/actions/workflows/npm-publish.yml/badge.svg)

## React Table
There are two type of people that have tables in their React app. Those that use React Table and those that haven't discovered React Table yet.

React Table isn't only for tables. Any data that can be sorted, filtered, paged, arranged works perfectly in React Table. A list of products with filters in the sidebar? React Table.

Building UIs with components that share state across one page is difficult with React Table. Doing this requires a context that can hold and share the state across components. This packages does all of that and throws some typing to help out.

## Demo - Quickstart
[Code Sandbox Demo](https://codesandbox.io/s/sad-proskuriakova-lhuvx)

Why React Table Provider? Simple composition over shared table state.
```jsx
<ReactTableProvider
    columns={columns}
    data={data}
>
    <Debug />
    <ColumnHiding />
    <Table />
    <Pagination />
</ReactTableProvider>
```

## How to Use 
This library literally passes all the options from React Table through. The Api follows what you can do in React Table.

[Review the React Table docs](https://react-table.tanstack.com/docs/api/overview)

### Which React Table hooks are included? 
All of them! Every hook is included so that you have full functionality. All the high level table options can be passed directly to `ReactTableProvider` component. Check the #options links below to see all the options for each hook. Of course you can look at all the options on the React Table docs.

- useTable [#options](https://react-table.tanstack.com/docs/api/useTable#table-options) [#instance](https://react-table.tanstack.com/docs/api/useTable#instance-properties)
- useFilters [#options](https://react-table.tanstack.com/docs/api/useFilters#table-options) [#instance](https://react-table.tanstack.com/docs/api/useFilters#instance-properties)
- useGlobalFilter [#options](https://react-table.tanstack.com/docs/api/useGlobalFilter#table-options) [#instance](https://react-table.tanstack.com/docs/api/useGlobalFilter#instance-properties)
- useSortBy [#options](https://react-table.tanstack.com/docs/api/useSortBy#table-options) [#instance](https://react-table.tanstack.com/docs/api/useSortBy#instance-properties)
- useGroupBy [#options](https://react-table.tanstack.com/docs/api/useGroupBy#table-options) [#instance](https://react-table.tanstack.com/docs/api/useGroupBy#instance-properties)
- useExpanded [#options](https://react-table.tanstack.com/docs/api/useExpanded#table-options) [#instance](https://react-table.tanstack.com/docs/api/useExpanded#instance-properties)
- usePagination [#options](https://react-table.tanstack.com/docs/api/usePagination#table-options) [#instance](https://react-table.tanstack.com/docs/api/usePagination#instance-properties)
- useRowSelect [#options](https://react-table.tanstack.com/docs/api/useRowSelect#table-options) [#instance](https://react-table.tanstack.com/docs/api/useRowSelect#instance-properties)
- useRowState [#options](https://react-table.tanstack.com/docs/api/useRowState#table-options) [#instance](https://react-table.tanstack.com/docs/api/useRowState#instance-properties)
- useColumnOrder [#options](https://react-table.tanstack.com/docs/api/useColumnOrder#table-options) [#instance](https://react-table.tanstack.com/docs/api/useColumnOrder#instance-properties)

```jsx
<ReactTableProvider
        columns={columns}
        data={data}
        initialState={initState}
        stateReducer={reducer}
        useControlledState={noAgeSort}
        manualPagination={false}
        autoResetExpanded={false}
        autoResetRowState={false}
        autoResetFilters={false}
        autoResetHiddenColumns={false}
        disableSortBy={false}
        disableFilters={true}
      />
```

### The Layout Hooks are also available 
Use these by passing props to include each hook.
- useResizeColumns
- useBlockLayout
- useAbsoluteLayout
- useFlexLayout

Replace `use` with `include` to include the hook.
```jsx
<ReactTableProvider
        columns={columns}
        data={data}
        includeFlexLayout
      >
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

## Types
The props for the component and context are strongly typed using the `@types/react-table`. 

For a couple of reasons I do not use the recommended [example](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table#configuration-using-declaration-merging). First, there are some [problems](https://github.com/tannerlinsley/react-table/issues/3468) as of now. Second, I feel that overwriting the types like that is very heavy handed. I didn't want to completely obliterate types if you do want to use those types. The current version of React Table's types will always be difficult to replicate as they depend on the hooks. In addition to this they can all be extended with any properties. The types used here are used to help highlight what can be used and like React Table will accept any properties and pass them on.

You will most likely have to force types and use `\\@ts-ignore` or just use it as `any`. 