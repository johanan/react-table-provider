/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useReactTable, TableOptions, Table, RowData, InitialTableState, TableState, getCoreRowModel as defaultgetCoreRowModel, 
getPaginationRowModel} from "@tanstack/react-table";

const ReactTableContext = (React.createContext<Table<RowData> | undefined>(undefined));

export interface ReactTableProviderProps<D> extends Omit<TableOptions<D>, "getCoreRowModel">{
  includeResizeColumns?: boolean;
  includeBlockLayout?: boolean;
  includeFlexLayout?: boolean;
  includeAbsoluteLayout?: boolean;
  //onStateChange?: (state: TableState) => void
  stateChangeDebounce?: number,
  children: React.ReactNode;
  getCoreRowModel?: typeof defaultgetCoreRowModel
}

export const ReactTableProvider = <D extends RowData>({
    columns,
    data,
    initialState = {},
    //stateReducer,
    //useControlledState,
    includeResizeColumns = false,
    includeBlockLayout = false,
    includeFlexLayout = false,
    includeAbsoluteLayout = false,
    stateChangeDebounce = 0,
    onStateChange,
    getCoreRowModel = defaultgetCoreRowModel,
    children,
    ...options
}: ReactTableProviderProps<D>) => {

    const table = useReactTable({
        columns,
        data,
        initialState,
        onStateChange,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        ...options
    });
    /*const table = useTable<D>(
        {
            // @ts-ignore
            columns,
            data,
            //@ts-ignore
            initialState,
            // @ts-ignore
            stateReducer,
            // @ts-ignore
            useControlledState,
            ...options
        },
        useColumnOrder,
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useRowState,
        //@ts-ignore
        includeBlockLayout && useBlockLayout,
        includeAbsoluteLayout && useAbsoluteLayout,
        includeFlexLayout && useFlexLayout,
        includeResizeColumns && useResizeColumns
    );*/

    //const onStateChangeDebounced = useAsyncDebounce(onStateChange, stateChangeDebounce);
    // https://twitter.com/dan_abramov/status/1104432618798493698
    // no sense in pulling in more dependencies when this is a small object
    //const stateString = JSON.stringify(table.state);

    /*React.useEffect(() => {
        //@ts-ignore
        onStateChangeDebounced(table.state);
    }, [stateString, onStateChangeDebounced])*/

    return (
    // @ts-ignore
        <ReactTableContext.Provider value={table}>
            {children}
        </ReactTableContext.Provider>
    );

};

export const useReactTableContext = () => {
    const context = React.useContext<Table<RowData> | undefined>(ReactTableContext);
    if (!context) {
        throw new Error("useReactTableContext must be used under ReactTableContext");
    }
    return context;
};
