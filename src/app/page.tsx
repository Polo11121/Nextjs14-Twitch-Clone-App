import { UserButton } from "@clerk/nextjs";

const HomePage = () => (
  <div className="flex flex-col gap-y-4">
    <UserButton />
  </div>
);

export default HomePage;
