/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useReactTable, TableOptions, Table, RowData, getCoreRowModel as defaultgetCoreRowModel, 
getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getGroupedRowModel, getExpandedRowModel} from "@tanstack/react-table";

const ReactTableContext = (React.createContext<Table<RowData> | undefined>(undefined));

export const allDefaultRowModels = {
    getPaginationRowModel: getPaginationRowModel<any>(),
    getFilteredRowModel: getFilteredRowModel<any>(),
    getSortedRowModel: getSortedRowModel<any>(),
    getGroupedRowModel: getGroupedRowModel<any>(),
    getExpandedRowModel: getExpandedRowModel<any>()
}

export interface ReactTableProviderProps<D> extends Omit<TableOptions<D>, "getCoreRowModel">{
  children: React.ReactNode;
  getCoreRowModel?: typeof defaultgetCoreRowModel
}

export const ReactTableProvider = <D extends RowData>({
    columns,
    data,
    initialState,
    getCoreRowModel = defaultgetCoreRowModel,
    children,
    ...options
}: ReactTableProviderProps<D>) => {

    const table = useReactTable({
        columns,
        data,
        initialState,
        getCoreRowModel: getCoreRowModel(),
        ...options
    });

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
