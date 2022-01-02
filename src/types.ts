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
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
    UseGlobalFiltersOptions,
    UseResizeColumnsOptions,
    UseGlobalFiltersState,
    UseResizeColumnsState,
    UseFiltersInstanceProps,
    UseGlobalFiltersInstanceProps,
    UseGroupByInstanceProps,
    UseExpandedInstanceProps,
    UseRowSelectInstanceProps,
    UseColumnOrderInstanceProps,
    ActionType,
    UseFiltersColumnProps,
    UseSortByColumnProps,
    Column,
} from "react-table";

export interface ReactTableInstance<D extends object>
extends TableInstance<D>,
  Omit<ReactTableOptions<D>, 'columns' | 'pageCount'>,
  UseFiltersInstanceProps<D>,
  UseGlobalFiltersInstanceProps<D>,
  UseSortByInstanceProps<D>,
  UseGroupByInstanceProps<D>,
  UseExpandedInstanceProps<D>,
  UsePaginationInstanceProps<D>,
  UseRowSelectInstanceProps<D>,
  UseRowStateInstanceProps<D>,
  UseColumnOrderInstanceProps<D>,
  Record<string, any> {
    state: ReactTableState<D>,
    
  }

export interface ReactTableOptions<D extends object>
extends Omit<TableOptions<D>, "columns" | "stateReducer" | "useControlledState">,
  UseExpandedOptions<D>,
  UseFiltersOptions<D>,
  UseGlobalFiltersOptions<D>,
  UseGroupByOptions<D>,
  UsePaginationOptions<D>,
  UseRowSelectOptions<D>,
  UseRowStateOptions<D>,
  UseSortByOptions<D>,
  //this is included but may not used if the hook is not added
  UseResizeColumnsOptions<D>,
  Record<string, any> {
    columns: Column<D>[] | ReactTableColumnInterface<D>[] | any[];
    stateReducer?: (
      newState: ReactTableState<D>,
      action: ActionType,
      prevState: ReactTableState<D>
    ) => ReactTableState<D>;
    useControlledState?: (state: ReactTableState<D>) => ReactTableState<D>;
  }

export interface ReactTableState<D extends object>
extends TableState<D>,
  UseExpandedState<D>,
  UseFiltersState<D>,
  UseGlobalFiltersState<D>,
  UseGroupByState<D>,
  UsePaginationState<D>,
  UseRowSelectState<D>,
  UseRowStateState<D>,
  UseColumnOrderState<D>,
  UseSortByState<D>,
  //this is included but may not used if the hook is not added
  UseResizeColumnsState<D>,
  //you can add your own items and control in the state object
  Record<string, any> {}

export interface ReactTableColumnInterface<D extends object>
extends ColumnInterface<D>,
  UseFiltersColumnProps<D>,
  UseSortByColumnProps<D>,
  Record<string, any> {}