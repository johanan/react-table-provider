/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import {
    ColumnInterface,
    TableInstance,
    TableOptions,
    TableState,
    UseColumnOrderState,
    UseExpandedOptions,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersOptions,
    UseFiltersState,
    UseGroupByOptions,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseRowSelectOptions,
    UseRowSelectState,
    UseRowStateInstanceProps,
    UseRowStateOptions,
    UseRowStateState,
    UseSortByColumnOptions,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
    ColumnInstance,
    UseTableHeaderGroupProps
} from "react-table";

declare module 'react-table' {
  export interface TableOptions<D extends object = {}>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      Record<string, any> {}
  
  export interface Hooks<D extends object = {}>
    extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}
  
  export interface TableInstance<D extends object = {}>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends object = {}>
      extends UseColumnOrderState<D>,
        UseExpandedState<D>,
        UseFiltersState<D>,
        UseGlobalFiltersState<D>,
        UseGroupByState<D>,
        UsePaginationState<D>,
        UseResizeColumnsState<D>,
        UseRowSelectState<D>,
        UseRowStateState<D>,
        UseSortByState<D> {}

    export interface ColumnInterface<D extends object = {}>
      extends UseFiltersColumnOptions<D>,
        UseGlobalFiltersColumnOptions<D>,
        UseGroupByColumnOptions<D>,
        UseResizeColumnsColumnOptions<D>,
        UseSortByColumnOptions<D> {}
  
    export interface ColumnInstance<D extends object = {}>
      extends UseFiltersColumnProps<D>,
        UseGroupByColumnProps<D>,
        UseResizeColumnsColumnProps<D>,
        UseSortByColumnProps<D> {}
  
    export interface Cell<D extends object = {}, V = any>
      extends UseGroupByCellProps<D>,
        UseRowStateCellProps<D> {}
  
    export interface Row<D extends object = {}>
      extends UseExpandedRowProps<D>,
        UseGroupByRowProps<D>,
        UseRowSelectRowProps<D>,
          UseRowStateRowProps<D> {}
}