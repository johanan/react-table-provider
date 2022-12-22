import * as React from 'react'
import ReactDOM from 'react-dom/client'
import * as R from "ramda";
import { ReactTableProvider } from "react-table-provider";
import Table, { Debug } from "./Table";
import makeData from "./makeData";
import Pagination from "./Pagination";
import ColumnHiding from "./ColumnHiding";
import { getCoreRowModel, 
  getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getGroupedRowModel, getExpandedRowModel,
  getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues} from "@tanstack/react-table";

import { useState } from 'react';

const allDefaultRowModels = {
  getPaginationRowModel: getPaginationRowModel<any>(),
  getFilteredRowModel: getFilteredRowModel<any>(),
  getSortedRowModel: getSortedRowModel<any>(),
  getGroupedRowModel: getGroupedRowModel<any>(),
  getExpandedRowModel: getExpandedRowModel<any>(),
  getCoreRowModel: getCoreRowModel<any>(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  autoResetPageIndex: false
}

const columns = [
    {
      header: "Name",
      columns: [
        {
          header: "First Name",
          accessorKey: "firstName"
        },
        {
          header: "Last Name",
          accessorKey: "lastName"
        }
      ]
    },
    {
      header: "Info",
      columns: [
        {
          header: "Age",
          accessorKey: "age"
        },
        {
          header: "Visits",
          accessorKey: "visits"
        },
        {
          header: "Status",
          accessorKey: "status"
        },
        {
          header: "Profile Progress",
          accessorKey: "progress"
        }
      ]
    }
  ];
  

  const sortLens = R.lensProp<any>("sorting");
  const agePred = R.propEq("id", "age")
  //example to show controlled state
  const noAgeSort = R.over(sortLens, R.reject(agePred));
  // cannot hide age column
  const visibleLens = R.lensPath<any>(["columnVisibility", "age"]);
  const noHideAge = R.set(visibleLens, true);
  const log = s => console.log(s)
  
  export default function App() {
    const data = React.useMemo(() => makeData(200), []);
    const [changes, setChanges] = React.useState(0);

    //example to save state across browser loads
    const initStorage = React.useRef(localStorage.getItem("LAST"))
    const initState = React.useRef(initStorage.current ? JSON.parse(initStorage.current) : { pagination: { pageIndex: 0, pageSize: 10}, expanded: {}});
    const [state, setState] = React.useState(initState.current);
    const initFilters = React.useRef(localStorage.getItem("FILTERS"))
    const [columnFilters, setFilters] = useState(initFilters.current ? JSON.parse(initFilters.current) : []);
  
    const change = (key) => (s) => {
      // this only runs once for each state
      window.localStorage.setItem(key, JSON.stringify(s));
      // you can tie other renders to this
      // it won't blow up or cause render problems
      setChanges((s) => s + 1);
    };

    const stateChange = React.useCallback((s) => setState(R.compose(R.tap(log), R.tap(change("LAST")), noHideAge, noAgeSort, s)), []);
    const filterChange = React.useCallback(s => setFilters(R.compose(R.tap(log), R.tap(change("FILTERS")), R.reject(agePred), s)), []);
  
    return (
      <div className="App">
        <h1>React Table Context</h1>
        <ReactTableProvider
          columns={columns}
          data={data}
          initialState={initState.current}
          state={{ ...state, columnFilters }}
          onColumnFiltersChange={filterChange}
          onStateChange={stateChange}
          {...allDefaultRowModels}
          debugTable={true}
        >
          <div>State Changes: {changes}</div>
          
          <h2>Column Selection</h2>
          <ColumnHiding />
          <h2>The Table</h2>
          <Table />
          <Pagination />
          <h2>Debug</h2>
          <Debug />
        </ReactTableProvider>
      </div>
    );
  }

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);