import { ConfigProvider } from "antd";
import SkeletonNode, { type SkeletonNodeProps } from "antd/es/skeleton/Node";

type Props = SkeletonNodeProps;
const AppSkeleton = ({ className, ...props }: Props) => {
  let classNames = "AppSkeleton";

  if (className) {
    classNames = `${classNames} ${className}`;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Skeleton: {
            gradientFromColor: "var(--appSkeleton--gradient--from--color)",
            gradientToColor: "var(--appSkeleton--gradient--to--color)",
          },
        },
      }}
    >
      <SkeletonNode
        {...props}
        className={classNames}
        styles={{
          content: { width: "100%", height: "100%" },
          root: { width: "100%", height: "100%" },
        }}
        active={true}
      />
    </ConfigProvider>
  );
};

export default AppSkeleton;
