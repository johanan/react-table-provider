import React from 'react'
import {render, screen} from '@testing-library/react';
import { createTestData, columns, TestData} from './data'
import { ReactTableProvider } from '../src/index'
import { BasicTable } from './BasicTable';

const data = createTestData(20);

describe("React Table Provider Pagination", () => {
    it('should paginate by default', () => {
        render(<ReactTableProvider data={data} columns={columns} initialState={{pagination: { pageSize: 10, pageIndex: 0 }}}>
            <BasicTable />
        </ReactTableProvider>)

        const table : HTMLTableElement = screen.queryByRole('table') as HTMLTableElement;
        //10 rows and a header despite 20 rows of data
        expect(table.rows.length).toBe(11);
    })

    it('should show all rows', () => {
        render(<ReactTableProvider data={data} columns={columns} initialState={{pagination: { pageSize: 20, pageIndex: 0 }}}>
            <BasicTable />
        </ReactTableProvider>)

        const table : HTMLTableElement = screen.queryByRole('table') as HTMLTableElement;
        expect(table.rows.length).toBe(21);
    })
})