import React from "react";
import TemplatesTable from "./templatesTable";
import { getTemplates } from "./actions";

export default async function Page() {
  const templates = await getTemplates();

  return (
    <TemplatesTable templates={templates} />
  );
}
