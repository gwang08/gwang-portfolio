import Monkeytype from "./Monkeytype";
import Contributions from "./Contributions";

import Breakline from "@/common/components/elements/Breakline";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";
import { MONKEYTYPE_ACCOUNT } from "@/common/constants/monkeytype";

const Dashboard = () => {
  return (
    <>
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      <Breakline className="my-8" />
      <Monkeytype />
    </>
  );
};

export default Dashboard;
