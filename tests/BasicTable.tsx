import React from 'react';
import { useReactTableContext } from '../src/index'

//copies straight from react-table examples 
export const BasicTable = ()=> {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
      } = useReactTableContext();
    
      return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column : any) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
};

export const Pagination = () => {
  const {
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    state: { pageIndex }
  } = useReactTableContext();

  return (
    <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Previous'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </button>
        <span>Page {pageIndex}</span>
    </div>
  )
}
