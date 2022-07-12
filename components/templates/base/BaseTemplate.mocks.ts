import { IBaseTemplate } from "./BaseTemplate";

const base: IBaseTemplate = {
  sampleTextProp: "Hello world!",
};

const alt: IBaseTemplate = {
  sampleTextProp: "Hello DIFFERENT WORLD!",
};

export const mockBaseTemplateProps = {
  base,
  alt,
};
