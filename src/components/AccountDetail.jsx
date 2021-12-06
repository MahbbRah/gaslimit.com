import { useMoralis } from "react-moralis";
import { FaAngry } from 'react-icons/fa'

import NativeBalance from "./NativeBalance";

function AccountDetail(props) {
  const { authenticate, isAuthenticated, user } = useMoralis(props);
  console.log(isAuthenticated, user)

  let accountID = "";
  if(isAuthenticated){
    let accNo = user.get('accounts')[0];
    let first6 =  accNo.slice(0, 6);
    let last4 =  accNo.slice(-4);
    accountID =  `${first6}...${last4}`;
    console.log(`Acc Conencted!`)
    console.log(`userFromAccountDetail`, user.get('accounts')[0])
  
  }


  return isAuthenticated ? (
    <div className="gas-lmtaccountEtherBal">
      <FaAngry color="#FFD3A2" className="iconOnBalanceico" />
      <NativeBalance />
      <p>{accountID}</p>
    </div>
  ) : ( 
    <div className="gas-lmtaccountEtherBal">
      <button style={{
          background: "none",
          border: "none",
          fontWeight: "bold"
      }} onClick={() => authenticate()}>Authenticate</button>
    </div>
  );
}

export default AccountDetail;
