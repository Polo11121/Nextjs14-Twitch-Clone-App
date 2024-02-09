import { getRecommendedUsers } from "@/lib/recommendedService ";
import {
  Followed,
  FollowedSkeleton,
  Recommended,
  RecommendedSkeleton,
} from "@/app/(browse)/_components";
import {
  SidebarToggle,
  SidebarToggleSkeleton,
  SidebarWrapper,
} from "@/components/ui";
import { getFollowedUsers } from "@/lib/followService";

export const Sidebar = async () => {
  const recommended = await getRecommendedUsers();
  const followed = await getFollowedUsers();

  return (
    <SidebarWrapper
      store="sidebar"
      contentSkeleton={
        <>
          <FollowedSkeleton />
          <RecommendedSkeleton />
        </>
      }
    >
      <SidebarToggle sidebarLabel="For you" store="sidebar" />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Followed data={followed} />
        <Recommended data={recommended} />
      </div>
    </SidebarWrapper>
  );
};

export const SidebarSkeleton = () => (
  <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
    <SidebarToggleSkeleton />
    <FollowedSkeleton />
    <RecommendedSkeleton />
  </aside>
);
