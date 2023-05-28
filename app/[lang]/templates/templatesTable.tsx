"use client";

import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import { Template } from "@prisma/client";
import { updateTemplate } from "./actions";

type Props = {
  templates?: Template[];
};

export default function TemplatesTable({ templates }: Props) {
  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "updatedAt",
      text: "Last Updated",
      // formatter: (updatedAt) => format(updatedAt.getTime(), dateFormat.display)
      formatter: (updatedAt) => updatedAt.getTime(),
    },
  ];

  const expandRow = {
    parentClassName: 'expandRow',
    className: 'expandRowContent',
    renderer: (row) => (
      <form className="row">
        <div className="col-7">
          <label>Instructions</label>
          <textarea className="form-control" rows={20} onBlur={(e) => {
            updateTemplate({ ...row, instructions: JSON.parse(e.target.value) });
          }}>
            {JSON.stringify(row.instructions, null, 4)}
          </textarea>
        </div>
        <div className="col-5">
          <b>Params</b>
          <textarea className="form-control" rows={20} onBlur={(e) => {
            updateTemplate({ ...row, params: JSON.parse(e.target.value) });
          }}>
            {JSON.stringify(row.params, null, 4)}
          </textarea>
        </div>
      </form>
    ),
  };

  return (
    <div className="container-fluid">
      <BootstrapTable
        keyField="id"
        data={templates}
        columns={columns}
        expandRow={expandRow}

      />
    </div>
  );
}
