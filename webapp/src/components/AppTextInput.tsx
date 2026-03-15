import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";
import Input, { type InputProps } from "antd/es/input/Input";
import TextArea, { type TextAreaProps } from "antd/es/input/TextArea";

export const AppTextInput = ({ className, ...props }: InputProps) => {
  let classNames = "AppTextInput";

  if (className) {
    classNames = `${classNames} ${className}`;
  }

  return (
    <InputConfigProvider>
      <Input
        {...props}
        className={classNames}
        type="text"
        styles={{
          root: { outline: "none", boxShadow: "none" },
          prefix: { marginRight: 8 },
          suffix: { marginLeft: 8 },
        }}
      />
    </InputConfigProvider>
  );
};

export const AppTextAreaInput = ({ className, ...props }: TextAreaProps) => {
  let classNames = "AppTextAreaInput";

  if (className) {
    classNames = `${classNames} ${className}`;
  }

  return (
    <InputConfigProvider>
      <TextArea
        {...props}
        className={classNames}
        autoSize={{ minRows: 1 }}
        styles={{
          root: { outline: "none", boxShadow: "none" },
        }}
      />
    </InputConfigProvider>
  );
};

const InputConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorTextPlaceholder: "var(--appTextInput--color)",
            activeBg: "var(--appTextInput--active--background-color)",
            hoverBg: "var(--appTextInput--active--background-color)",
            colorBorder: "transparent",
            activeBorderColor: "transparent",
            hoverBorderColor: "transparent",
            fontSize: 14,
            paddingBlock: 6,
            paddingInline: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
