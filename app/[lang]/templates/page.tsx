import React from "react";
import TemplatesTable from "./templatesTable";
import { getTemplates } from "./actions";
import { PageProps } from '../[id]/page';

export default async function Page({params}: PageProps) {
  const templates = await getTemplates();

  return (
    <TemplatesTable templates={templates} lang={params.lang}/>
  );
}
