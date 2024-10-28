import importMessages from "./locale";
import { createWithLocale } from "../Intl";
import "@kne/button-group/dist/index.css";
import {
  ConfirmButton as ConfirmButtonComponent,
  ConfirmLink as ConfirmLinkComponent,
  ConfirmText as ConfirmTextComponent,
  withConfirm as withConfirmComponent,
} from "@kne/button-group";
import compose from "@kne/compose";

export const ConfirmButton = createWithLocale({
  moduleName: "ConfirmButton",
  importMessages,
})(ConfirmButtonComponent);
export const ConfirmLink = createWithLocale({
  moduleName: "ConfirmButton",
  importMessages,
})(ConfirmLinkComponent);
export const ConfirmText = createWithLocale({
  moduleName: "ConfirmButton",
  importMessages,
})(ConfirmTextComponent);
export const withConfirm = compose(
  createWithLocale({
    moduleName: "ConfirmButton",
    importMessages,
  }),
  withConfirmComponent
);
export default ConfirmButton;
