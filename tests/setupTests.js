/* eslint-disable no-undef */
import 'regenerator-runtime/runtime'

jest.mock("@tanstack/react-table", () => {
    const version = process.env.REACTTABLE_ALIAS || "@tanstack/react-table";
    const module = jest.requireActual(version);
    
    return {
        __esModule: true,
        ...module
    }
})