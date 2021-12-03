import { useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  // console.log(balance, `showBal`)
  return <p>{balance.balance}</p>;
}

export default NativeBalance;
