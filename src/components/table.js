import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";
import "../styles/App.scss";
// id, email, fullName, message, subject, userName
const Table = (props) => {
  const columnHelper = createColumnHelper();
  const [data, setdata] = useState(() => [...props.data]);
  const rerender = useReducer(() => ({}), {})[1];

  useEffect(() => {}, [rerender]);
  const columns = [];
  for (let i = 0; i < props.sql.columns.length; i++) {
    columns.push(
      columnHelper.accessor(props.sql.columns[i], {
        cell: (info) => info.getValue(),
        header: () => props.sql.headers[i],
      })
    );
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div style={{ backgroundColor: "black" }}>
      <h1 style={{ color: "white", margin: "0", textAlign: "center" }}>
        {props.sql.heading}
      </h1>
      <table
        className="sqltable"
        style={{ width: "100%", color: "white", border: "1px solid white" }}
      >
        <thead>
          {table.getHeaderGroups().map((headergroup) => (
            <tr key={headergroup.id}>
              {headergroup.headers.map((header) => (
                <th key={header.id} style={{ border: "1px solid white" }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{ height: "10px", border: "1px solid white" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    maxWidth: "100px",
                    backgroundColor: "black",
                    textAlign: "center",
                    borderBottom: "thin solid",
                    borderColor: "white",
                  }}
                >
                  <div
                    style={{
                      overflow: "scroll",
                      width: "100%",
                      maxHeight: "100px",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};
export default Table;
