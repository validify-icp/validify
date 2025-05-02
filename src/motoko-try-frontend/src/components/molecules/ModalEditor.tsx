import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import {
  setTitle,
  setDescription,
  setLabel,
} from "../../store/certificate/slice";

import {
  Editor,
  EditorProvider,
  ContentEditableEvent,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

import { icons } from "../../constants";

import Button from "../elements/Button";
import BaseModal from "../elements/BaseModal";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

const ModalEditor = ({ title, open, onClose }: ModalProps) => {
  const [editorValue, setEditorValue] = useState("");

  const dispatch = useDispatch();

  const {
    title: titleState,
    description,
    label,
  } = useSelector((state: RootState) => state.certificate);

  useEffect(() => {
    if (!open) return;
    if (title === "Title Certificate") setEditorValue(titleState);
    else if (title === "Description of Certificate")
      setEditorValue(description);
    else if (title === "Label") setEditorValue(label);
  }, [open, title, titleState, description, label]);

  const handleChange = (event: ContentEditableEvent) => {
    setEditorValue(event.target.value);
  };

  const handleSave = () => {
    if (title === "Title Certificate") dispatch(setTitle(editorValue));
    else if (title === "Description of Certificate")
      dispatch(setDescription(editorValue));
    else if (title === "Label") dispatch(setLabel(editorValue));

    onClose();
  };
  return (
    <BaseModal open={open}>
      <EditorProvider>
        <div className="modal-main fixed w-[690px] px-8 py-8 top-[25%] left-[25%] flex flex-col items-center rounded-xl bg-white">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold">Edit Detail Certificate</h1>
            <span
              className="cursor-pointer hover:bg-[#eae9e9] hover:rounded-full p-2"
              onClick={onClose}
            >
              <img src={icons.close} width={28} alt="icon close" />
            </span>
          </div>

          <div className="mt-5 w-full flex flex-col gap-2">
            <label htmlFor="new-certificate" className="text-base font-medium">
              {title}
            </label>
            <Editor value={editorValue} onChange={handleChange}>
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </div>

          <hr className="mt-10 mb-5 w-full border-none bg-[#D8DCDF] h-[2px]" />

          <div className="mt-3 w-full flex items-center justify-end gap-5">
            <p
              className="font-inter font-bold text-[#6240ED] text-sm cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </p>
            <Button className="text-xs" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </EditorProvider>
    </BaseModal>
  );
};

export default ModalEditor;
