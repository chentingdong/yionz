import React from "react";
import { Template } from "@prisma/client";
import { chooseTemplate } from "../[id]/(steps)/step1/actions";

type Props = {
  id: string;
  templates: Template[];
  selected?: Template;
};

export default function TemplatesSelect({ id, templates, selected }: Props) {
  if (!selected) selected = templates[0];

  const onChange = (e) => {
    const newTemplate = templates.find(
      (t) => t.id === e.target.value
    );
    if (!!newTemplate)
      chooseTemplate({ id, selected: newTemplate });
  };

  return (
    <select
      className="form-select"
      aria-label="selecte template"
      onChange={onChange}
      defaultValue={selected.id}
    >
      <option>- select a template -</option>
      {templates.map((template, index) => (
        <option
          key={index}
          value={template.id}
        >
          {template.name}
        </option>
      ))}
    </select>
  );
}
