import { Prisma, Template } from "@prisma/client";
import SortableList, { SortableItem } from "react-easy-sort";

import { FileUploader } from "react-drag-drop-files";
import React from "react";
import arrayMove from "array-move";
import { uploadImage } from "./actions";

type Props = {
  images: Image[];
  artifactId: string;
  clipId: string;
  template: Template;
  translation: any;
};


export default function CreateImages({ images, artifactId, clipId }: Props) {
  const fileTypes = ['jpg', 'jpeg', 'png'];
  const [items, setItems] = React.useState(images);

  const updateImages = (fileList: File[]) => {
    let order = images.length + 1;
    Array.from(fileList).forEach(async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('artifactId', artifactId);
      formData.append('clipId', clipId);
      formData.append('order', order.toString());
      uploadImage(formData);
      order++;
    });
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <div>
      <FileUploader
        multiple={true}
        handleChange={updateImages}
        name="file"
        types={fileTypes}
      />
      <SortableList
        onSortEnd={onSortEnd}
        className="d-flex flex-wrap user-select-none"
        draggedItemClassName="opacity-50 shadow-lg"
      >
        {items.map((item, index) => (
          <SortableItem key={index}>
            <div className="flex-shrink-0 display-flex m-2 cursor-move user-select-none">
              <img
                className="pe-none"
                // alt={item.order.toString()}
                src={item.url}
                style={{ width: 150, height: 'auto' }}
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );
}
