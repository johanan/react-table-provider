import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { createTestData, columns } from './data'
import { ReactTableProvider } from '../src/index'
import { BasicTable, Pagination } from './BasicTable';
import { TableState } from '@tanstack/react-table';

const dataHash = {
    page0: createTestData(10, "page0"),
    page1: createTestData(10, "page1"),
    page2: createTestData(10, "page2"),
    page3: createTestData(10, "page3"),
    page4: createTestData(10, "page4"),
}

const initState = {pagination: { pageSize: 10, pageIndex: 0 }};

const stateChangeCalls = jest.fn();

const Controlled = () => {
    const [data, setData] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(1);

    const providerChange = (state: TableState) => {
        setData(dataHash[`page${state.pagination.pageIndex}`]);
        //data changes as we step through it
        setPageCount(state.pagination.pageIndex > 2 ? 5 : 4);
        stateChangeCalls();
    };

    return (
        <ReactTableProvider 
            data={data} 
            columns={columns}
            //onStateChange={stateChange}
            //state={initState}
            onProviderChange={providerChange}
            initialState={initState}
            manualPagination
            pageCount={pageCount}
            autoResetAll={false}
            debugTable
        >
            <BasicTable />
            <Pagination />
        </ReactTableProvider>
    )
}


describe('React Table Provider Basic', () => {
    it('should only call onStateChange on state change', async() => {
        render(<Controlled />)

        const table : HTMLTableElement = screen.getByRole('table') as HTMLTableElement;
        //extra for the header
        //onStateChange is debounced so we have to await it
        await waitFor(() => expect(table.rows.length).toBe(11));
        expect(screen.queryByText('page0-0')).toBeInTheDocument();
        const next = screen.getByText('Next') as HTMLButtonElement;
        //start clicking
        fireEvent.click(next);
        await waitFor(()=> screen.getByText(/Page 1/));
        expect(screen.queryByText('page1-0')).toBeInTheDocument();

        fireEvent.click(next);
        await waitFor(()=> screen.getByText(/Page 2/));
        expect(screen.queryByText('page2-0')).toBeInTheDocument();

        fireEvent.click(next);
        await waitFor(()=> screen.getByText(/Page 3/));
        expect(screen.queryByText('page3-0')).toBeInTheDocument();

        fireEvent.click(next);
        await waitFor(()=> screen.getByText(/Page 4/));
        expect(screen.queryByText('page4-0')).toBeInTheDocument();
        
        //one init call and 4 page steps
        // sometimes pageIndex 0 is called twice
        expect(stateChangeCalls.mock.calls.length).toBeLessThanOrEqual(6);
    })
})