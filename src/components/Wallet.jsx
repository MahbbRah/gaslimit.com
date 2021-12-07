import { useChain } from "react-moralis";

function Chain(props) {
  // const { data: balance } = useChain(props);
  const chain = useChain(props);
  return <p>{"balance.balance"}</p>;
}

export default Chain;
