"use client";

import BootstrapTable from "react-bootstrap-table-next";
import Codes from "@/app/components/codes";
import React from "react";
import { Template } from "@prisma/client";

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
    renderer: (row) => (
      <div className="row">
        <div className="col-6">
          <b>Instructions</b>
          {/* <Codes data={row.instructions} /> */}
        </div>
        <div className="col-6">
          <b>Params</b>
          {/* <Codes data={row.params} /> */}
        </div>
      </div>
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
