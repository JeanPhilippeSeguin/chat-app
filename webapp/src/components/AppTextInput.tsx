import { ConfigProvider } from "antd";
import Input, { type InputProps } from "antd/es/input/Input";

type Props = InputProps;

const AppTextInput = ({ className, ...props }: Props) => {
  let classNames = "AppTextInput";

  if (className) {
    classNames = `${classNames} ${className}`;
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorTextPlaceholder: "var(--appTextInput--color)",
            activeBg: "var(--appTextInput--active--background-color)",
            hoverBg: "var(--appTextInput--active--background-color)",
            fontSize: 14,
            paddingBlock: 6,
            paddingInline: 12,
          },
        },
      }}
    >
      <Input
        {...props}
        className={classNames}
        type="text"
        styles={{
          root: { border: "none", outline: "none", boxShadow: "none" },
          prefix: { marginRight: 8 },
          suffix: { marginLeft: 8 },
        }}
      />
    </ConfigProvider>
  );
};
export default AppTextInput;
