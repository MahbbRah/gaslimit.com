import { useMoralis } from "react-moralis";

function AccountDetail(props) {
  const { data: balance } = useMoralis(props);
  // console.log(balance, `showBal`)
  const { authenticate, isAuthenticated, user } = useMoralis();
  console.log(`userMoralis`, user, isAuthenticated);
  return <button onClick={() => authenticate()}>Authenticate</button>;
}

export default AccountDetail;
