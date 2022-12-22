import React from 'react';
import { useReactTableContext } from '../src/index'
import { flexRender } from '@tanstack/react-table';

//copies straight from react-table examples 
export const BasicTable = ()=> {
    const {
        getHeaderGroups,
        getRowModel
      } = useReactTableContext();
    
      return (
        <table>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
          {getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        </table>
      );
};

export const Pagination = () => {
  const {
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getState
  } = useReactTableContext();

  return (
    <div className="pagination">
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage}>
          {'Previous'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!getCanNextPage}>
          {'Next'}
        </button>
        <span>Page {getState().pagination.pageIndex + 1}</span>
    </div>
  )
}
