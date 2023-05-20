"use client";

import BootstrapTable from 'react-bootstrap-table-next';
import JSONInput from 'react-json-editor-ajrm';
import React from "react";
import { dateFormat } from "@/app/components/helpers";
import { format } from "date-fns";
import locale from 'react-json-editor-ajrm/locale/en';
import { updateTemplate } from "./actions";

type Props = {
  templates: any[];
};

export default function TemplatesTable({ templates }: Props) {
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'updatedAt',
      text: 'Last Updated',
      // formatter: (updatedAt) => format(updatedAt.getTime(), dateFormat.display)
      formatter: (updatedAt) => updatedAt.getTime()
    }
  ];

  const expandRow = {
    renderer: (row) => (
      <div className="row" >
        <div className="col">
          <b>Instructions</b>
          <JSONInput
            id='instructions'
            placeholder={row.instructions}
            locale={locale}
            height={300}
            theme='light_mitsuketa_tribute'
            confirmGood={false}
            onChange={(json) => {
              console.log(json);
              // updateTemplate({
              //   id: row.id,
              //   data: {
              //     ...row,
              //     instructions: e.target.value,
              //   }
              // });
            }}
          />
        </div>
        <div className="col">
          <b>Params</b>
          <JSONInput
            id='params'
            placeholder={row.params}
            height={300}
            locale={locale}
            theme='light_mitsuketa_tribute'
            confirmGood={false}
          />
        </div>
      </div>
    )
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

