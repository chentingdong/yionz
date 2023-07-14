"user client";

import { Image, Template } from "@prisma/client";
import SortableList, { SortableItem } from "react-easy-sort";
import { deleteImage, updateImage, uploadImage } from "./images.actions";

import ActionButton from "@/app/components/buttons.action";
import { FileUploader } from "react-drag-drop-files";
import { Loading } from "@/app/components/loading";
import React from "react";
import arrayMoveImmuatable from "array-move";
import { useTranslation } from '@/i18n/i18n.server';

export default function CreateImages({ lang, clip, template }: ClipProps) {
  const {images, id: clipId, artifactId} = clip
  const fileTypes = ["jpg", "jpeg", "png"];
  const { t } = useTranslation(lang)

  // const
  const [items, setItems] = React.useState<Image[]>(images);
  // const [loading, setLoading] = React.useState(false);

  const handleUploadImages = async (fileList: File[]) => {
    // setLoading(true);

    // get the maximum order from images list, which is sorted asc.
    let order = items.length;

    for (let file of fileList) {
      order++;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("artifactId", artifactId);
      formData.append("clipId", clipId);
      formData.append("order", order.toString());
      const image = await uploadImage(formData);
      if (image) setItems((items) => [...items, image]);
    }
    // setLoading(false);
  };

  const handleDeleteImage = async (id: string) => {
    await deleteImage(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const onSortEnd = async (oldIndex: number, newIndex: number) => {
    const dragged = await imagesReorder({ images: items.slice(), oldIndex, newIndex });
    setItems(dragged);
  };

  return (
    <div>
      <div className="row mx-2">
        <div className="col-11">
          <FileUploader
            multiple={true}
            handleChange={handleUploadImages}
            name="file"
            types={fileTypes}
            label="Drop images here."
          />
        </div>
        <div className="col-1">
          {false && <Loading size={20} className="text-danger" />}
        </div>
      </div>
      <SortableList
        onSortEnd={onSortEnd}
        className="d-flex flex-wrap user-select-none"
        // This is not working, looks like a ib bug.
        draggedItemClassName="opacity-100"
      >
        {items.map((item, index) => (
          <SortableItem key={index}>
            <div className="m-2 position-relative" style={{ cursor: 'move' }} >
              <img
                className="pe-none"
                alt={item.order.toString()}
                src={item.url}
                style={{ width: 150, height: "auto" }}
              />
              <ActionButton
                onClick={() => handleDeleteImage(item.id)}
                action="delete"
                size="sm"
                className="position-absolute top-0 end-0"
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );
}

const imagesReorder = async ({
  images,
  oldIndex,
  newIndex,
}: {
  images: Image[];
  oldIndex: number;
  newIndex: number;
}): Promise<Images[]> => {
  let dragged = arrayMoveImmuatable(images, oldIndex, newIndex);

  for (let i = 0; i < dragged.length; i++) {
    dragged[i].order = i;
    await updateImage(dragged[i]);
  }

  dragged.sort((a, b) => a.order > b.order ? 1 : -1);
  return dragged;
};
