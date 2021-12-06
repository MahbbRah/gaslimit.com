import { useChain } from "react-moralis";

function Chain(props) {
  // const { data: balance } = useChain(props);
  const chain = useChain(props);
  console.log(chain, `showBal`)
  return <p>{"balance.balance"}</p>;
}

export default Chain;
