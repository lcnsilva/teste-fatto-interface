import styled from "styled-components";

export const Table = styled.table`
    border-radius: 5px;
    border: none;
    border-collapse: collapse;
    width: 100%;
    background-color: #FFFFFF;
`

export const TableTitle = styled.th`
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    padding: 8px;
    color: #ffffff;
    background: #18243e;
`

export const TableRow = styled.tr`
    text-align: center;
    padding: 8px;
    border-right: 2px solid #F5F5F5;
    font-size: 12px;
`

export const TableData = styled.td`
    text-align: center;
    padding: 8px;
    border-right: 2px solid #F5F5F5;
    border-bottom: 2px solid #F5F5F5;
    font-size: 16px;
    white-space: nowrap;
`

export const EditButton = styled.button`
    width: 100%;
    padding: 1rem 0.5rem;
    background-color: #457b9d;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
`

export const DeleteButton = styled.button`
    width: 100%;
    padding: 1rem 0.5rem;
    background-color: #f07167;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
`