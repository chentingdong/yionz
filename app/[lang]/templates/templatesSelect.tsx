import React from "react";
import { chooseTemplate } from "../[id]/step1/actions";

type Props = {
  id: string;
  templates: Prisma.template[];
  selected: Prisma.template;
};

export default function TemplatesSelect({ id, templates, selected }: Props) {
  const onChange = (e) => {
    const selected: Prisma.template = templates.find(
      (t) => t.id === e.target.value
    );
    chooseTemplate({ id, selected });
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
