/* eslint-disable no-undef */
import 'regenerator-runtime/runtime'

jest.mock("react-table", () => {
    const version = process.env.REACTTABLE_ALIAS || "react-table";
    const module = jest.requireActual(version);
    
    return {
        __esModule: true,
        ...module
    }
})