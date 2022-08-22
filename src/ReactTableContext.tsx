/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useReactTable, TableOptions, Table, RowData, InitialTableState, TableState, getCoreRowModel as defaultgetCoreRowModel, 
getPaginationRowModel} from "@tanstack/react-table";
import debounce from 'debounce';

const ReactTableContext = (React.createContext<Table<RowData> | undefined>(undefined));

export interface ReactTableProviderProps<D> extends Omit<TableOptions<D>, "getCoreRowModel">{
  includeResizeColumns?: boolean;
  includeBlockLayout?: boolean;
  includeFlexLayout?: boolean;
  includeAbsoluteLayout?: boolean;
  onProviderChange?: (state: TableState) => void;
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
    stateChangeDebounce = 0,
    onProviderChange,
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

    const providerDebounced = onProviderChange ? debounce(onProviderChange, stateChangeDebounce) : onProviderChange;
    // https://twitter.com/dan_abramov/status/1104432618798493698
    // no sense in pulling in more dependencies when this is a small object
    const stateString = JSON.stringify(table.getState());

    React.useEffect(() => {
        //@ts-ignore
        providerDebounced?.(table.getState());
    }, [stateString])

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
