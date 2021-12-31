import React from 'react'
import {render, screen} from '@testing-library/react';
import { createTestData, columns} from './data'
import { ReactTableProvider } from '../src/index'
import { BasicTable } from './BasicTable';

const data = createTestData(10);

describe('React Table Provider Basic', () => {
    it('should render', () => {
        render(<ReactTableProvider data={data} columns={columns}>
            <BasicTable />
        </ReactTableProvider>)

        const table : HTMLTableElement = screen.queryByRole('table') as HTMLTableElement;
        console.log(table);
        //extra for the header
        expect(table.rows.length).toBe(11);
    })
})