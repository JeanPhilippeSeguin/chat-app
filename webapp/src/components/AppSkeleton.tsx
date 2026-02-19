import { ConfigProvider } from "antd";
import SkeletonNode, { type SkeletonNodeProps } from "antd/es/skeleton/Node";

type Props = SkeletonNodeProps;
const AppSkeleton = ({ className, ...props }: Props) => {
  const AppSkeletonDefaultStyles = {
    width: "100%",
    height: "100%",
  };

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
        className={`AppSkeleton ${className}`}
        styles={{
          root: { ...AppSkeletonDefaultStyles },
          content: { ...AppSkeletonDefaultStyles },
        }}
        active={true}
      />
    </ConfigProvider>
  );
};

export default AppSkeleton;
