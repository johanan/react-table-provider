import React from 'react'
import {render, screen} from '@testing-library/react';
import { createTestData, columns, TestData} from './data'
import { ReactTableProvider } from '../src/index'
import { BasicTable } from './BasicTable';

const data = createTestData(10);

describe('React Table Provider Basic', () => {

    it('should render', async () => {
        render(<ReactTableProvider data={data} columns={columns} includeAbsoluteLayout>
            <BasicTable />
        </ReactTableProvider>)

        const table : HTMLTableElement = screen.queryByRole('table') as HTMLTableElement;
        //extra for the header
        expect(table.rows.length).toBe(11);
        expect(table.rows[2].cells[0].style.position).toBe('absolute');
    })
})