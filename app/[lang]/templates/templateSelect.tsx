import React from "react";

type Props = {
  templates: any[];
};

export default function TemplateSelect({ templates }: Props) {
  return (
    <select className="form-select" aria-label="selecte template">
      <option selected>Open this select menu</option>
      {templates.map((template, index) => (
        <option value={template.id}>{template.name}</option>
      ))}
    </select>
  );
}
