import { Image, Template } from "@prisma/client";
import SortableList, { SortableItem } from "react-easy-sort";
import { deleteImage, uploadImage } from "./actions";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import Loading from "@/app/components/loading";
import React from "react";
import arrayMove from "array-move";

type Props = {
  images: Image[];
  artifactId: string;
  clipId: string;
  template: Template;
  translation: any;
};

export default function CreateImages({ images, artifactId, clipId }: Props) {
  const fileTypes = ["jpg", "jpeg", "png"];
  const [items, setItems] = React.useState(images);
  const [loading, setLoading] = React.useState(false);

  const updateImages = (fileList: File[]) => {
    setLoading(true);
    let order = images.length + 1;
    Array.from(fileList).forEach(async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("artifactId", artifactId);
      formData.append("clipId", clipId);
      formData.append("order", order.toString());
      await uploadImage(formData);
      order++;
    });
    setLoading(false);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <div>
      <div className="row mx-2">
        <div className="col-11">
          <FileUploader
            multiple={true}
            handleChange={updateImages}
            name="file"
            types={fileTypes}
          />
        </div>
        <div className="col-1">
          {loading && <Loading size={24} />}
        </div>
      </div>
      <SortableList
        onSortEnd={onSortEnd}
        className="d-flex flex-wrap user-select-none"
        draggedItemClassName="opacity-75 shadow-lg"
      >
        {items.map((item, index) => (
          <SortableItem key={index}>
            <div className="flex-shrink-0 display-flex m-2 cursor-move user-select-none position-relative">
              <img
                className="pe-none"
                alt={item.order.toString()}
                src={item.url}
                style={{ width: 150, height: "auto" }}
              />
              <button
                className="btn btn-link position-absolute top-0 end-0 px-1 py-0"
                onClick={() => deleteImage(item.id)}
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div >
  );
}
