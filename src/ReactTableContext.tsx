/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
    ActionType,
    useAbsoluteLayout,
    useBlockLayout,
    useColumnOrder,
    useExpanded,
    useFilters,
    useFlexLayout,
    useGlobalFilter,
    useGroupBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useRowState,
    useSortBy,
    useTable,
    TableInstance,
    TableState,
    ColumnInterface,
    TableOptions
} from "react-table";

type RecordUnknown = Record<string, unknown>;
const ReactTableContext = React.createContext<TableInstance<RecordUnknown> | undefined>(undefined);

interface ReactTableProviderProps<D extends Record<string, unknown>> {
  columns: ColumnInterface<D>[];
  data: D[];
  initialState?: Partial<TableState<D>>;
  stateReducer?: (
    newState: TableState<D>,
    action: ActionType,
    prevState: TableState<D>
  ) => TableState<D>;
  useControlledState?: (state: TableState<D>) => TableState<D>;
  options?: Omit<TableOptions<D>, "data" | "columnns">;
  includeResizeColumns?: boolean;
  includeBlockLayout?: boolean;
  includeFlexLayout?: boolean;
  includeAbsoluteLayout?: boolean;
  children: React.ReactNode;
}

export const ReactTableProvider = <D extends Record<string, unknown>>({
    columns,
    data,
    initialState = {},
    options = {},
    stateReducer,
    useControlledState,
    includeResizeColumns = false,
    includeBlockLayout = false,
    includeFlexLayout = false,
    includeAbsoluteLayout = false,
    children
}: ReactTableProviderProps<D>) => {

    const table = useTable<D>(
        {
            // @ts-ignore
            columns,
            data,
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
    );

    return (
    // @ts-ignore
        <ReactTableContext.Provider value={{...table}}>
            {children}
        </ReactTableContext.Provider>
    );

};

export const useReactTableContext = () => {
    const context = React.useContext<TableInstance<RecordUnknown> | undefined>(ReactTableContext);
    if (!context) {
        throw new Error("useReactTableContext must be used under ReactTableContext");
    }
    return context;
};
