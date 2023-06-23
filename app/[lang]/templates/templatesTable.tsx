"use client";

import { deleteTemplate, updateTemplate } from "./actions";

import ActionButton from "@/app/components/buttons.action";
import BootstrapTable from "react-bootstrap-table-next";
import { CreateTemplate } from "@/app/components/buttons.client";
import { DebounceInput } from "react-debounce-input";
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
    {
      dataField: "id",
      text: "Actions",
      formatter: (id: string) => (
        <div className="col-1">
          <ActionButton
            action="delete"
            title={`Delete template ${id}`}
            onClick={async (e) => {
              e.stopPropagation();
              await deleteTemplate(id);
            }}
          />
        </div>
      ),
    },
  ];

  const expandRow = {
    parentClassName: "expandRow",
    className: "expandRowContent",
    renderer: (row) => (
      <form>
        <div className="row">
          <div className="col-6">
            <label>name</label>
            <DebounceInput
              element="input"
              id="story"
              className="form-control"
              minLength={5}
              debounceTimeout={300}
              value={row.name}
              onChange={(e) => updateTemplate({ ...row, name: e.target.value })}
            />
          </div>
          <div className="col-3">
            <label>width</label>
            <input
              type="number"
              className="form-control"
              value={row.width}
              onChange={(e) =>
                updateTemplate({ ...row, width: e.target.value })
              }
            />
          </div>
          <div className="col-3">
            <label>height</label>
            <input
              type="number"
              className="form-control"
              value={row.height}
              onChange={(e) =>
                updateTemplate({ ...row, height: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <label>Instructions</label>
            <textarea
              className="form-control"
              rows={20}
              onBlur={(e) => {
                updateTemplate({
                  ...row,
                  instructions: JSON.parse(e.target.value),
                });
              }}
            >
              {JSON.stringify(row.instructions, null, 4)}
            </textarea>
          </div>
          <div className="col-5">
            <b>Params</b>
            <textarea
              className="form-control"
              rows={20}
              onBlur={(e) => {
                updateTemplate({ ...row, params: JSON.parse(e.target.value) });
              }}
            >
              {JSON.stringify(row.params, null, 4)}
            </textarea>
          </div>
        </div>
      </form>
    ),
  };

  return (
    <div className="container">
      <h3 className="d-flex justify-content-between">
        Templates
        <CreateTemplate />
      </h3>
      <BootstrapTable
        keyField="id"
        data={templates}
        columns={columns}
        expandRow={expandRow}
      />
    </div>
  );
}
