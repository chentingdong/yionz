import React from "react";
import { Template } from "@prisma/client";
import { chooseTemplate } from "../[id]/step1/actions";

type Props = {
  id: string;
  templates: Template[];
  selected?: Template;
};

export default function TemplatesSelect({ id, templates, selected }: Props) {
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
    >
      <option selected={!selected}>- select a template -</option>
      {templates.map((template, index) => (
        <option
          key={index}
          value={template.id}
          selected={!!selected && selected.id === template.id}
        >
          {template.name}
        </option>
      ))}
    </select>
  );
}
