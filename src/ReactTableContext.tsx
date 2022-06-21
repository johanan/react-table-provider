/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
    useAsyncDebounce,
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
    useTable} from "react-table";
import { ReactTableInstance, ReactTableOptions, ReactTableState } from "./types";

const ReactTableContext = React.createContext<ReactTableInstance<object> | undefined>(undefined);

export interface ReactTableProviderProps<D extends object> extends ReactTableOptions<D>{
  initialState?: Partial<ReactTableState<D>>;
  includeResizeColumns?: boolean;
  includeBlockLayout?: boolean;
  includeFlexLayout?: boolean;
  includeAbsoluteLayout?: boolean;
  onStateChange?: (state: ReactTableState<D>) => void
  stateChangeDebounce?: number,
  children: React.ReactNode;
}

export const ReactTableProvider = <D extends object>({
    columns,
    data,
    initialState = {},
    stateReducer,
    useControlledState,
    includeResizeColumns = false,
    includeBlockLayout = false,
    includeFlexLayout = false,
    includeAbsoluteLayout = false,
    onStateChange = () => {},
    stateChangeDebounce = 0,
    children,
    ...options
}: ReactTableProviderProps<D>) => {

    const table = useTable<D>(
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
    );

    const onStateChangeDebounced = useAsyncDebounce(onStateChange, stateChangeDebounce);
    // https://twitter.com/dan_abramov/status/1104432618798493698
    // no sense in pulling in more dependencies when this is a small object
    const stateString = JSON.stringify(table.state);

    React.useEffect(() => {
        //@ts-ignore
        onStateChangeDebounced(table.state);
    }, [stateString, onStateChangeDebounced])

    return (
    // @ts-ignore
        <ReactTableContext.Provider value={table}>
            {children}
        </ReactTableContext.Provider>
    );

};

export const useReactTableContext = () => {
    const context = React.useContext<ReactTableInstance<object> | undefined>(ReactTableContext);
    if (!context) {
        throw new Error("useReactTableContext must be used under ReactTableContext");
    }
    return context;
};
