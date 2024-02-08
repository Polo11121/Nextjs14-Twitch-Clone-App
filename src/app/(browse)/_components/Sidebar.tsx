import { getRecommendedService } from "@/lib/recommendedServide";
import {
  Recommended,
  RecommendedSkeleton,
  Toggle,
  ToggleSkeleton,
  Wrapper,
} from "@/app/(browse)/_components";

export const Sidebar = async () => {
  const recommended = await getRecommendedService();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => (
  <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
    <ToggleSkeleton />
    <RecommendedSkeleton />
  </aside>
);
