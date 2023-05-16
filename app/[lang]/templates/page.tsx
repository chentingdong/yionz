import React from "react";
import Templates from "./templates";
import { getTemplates } from "../action";

export default async function Page() {
  const templates = await getTemplates();

  return (
    <Templates templates={templates} />
  );
}
