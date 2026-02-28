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
            colorTextPlaceholder: "var(--dashboardHeader--search--color)",
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
        variant="borderless"
        styles={{ prefix: { marginRight: 8 }, suffix: { marginLeft: 8 } }}
      />
    </ConfigProvider>
  );
};
export default AppTextInput;
