import { useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  // const nativeBal = useNativeBalance(props);
  // {
  //   "data": {
  //     "balance": "0",
  //       "formatted": "0 ROP"
  //   },
  //   "nativeToken": {
  //     "name": "Ropsten Ether",
  //       "symbol": "ROP",
  //         "decimals": 18
  //   },
  //   "error": null,
  //     "isLoading": false,
  //       "isFetching": true
  // }
  //SAVE BALANCE TO STORAGE
  // localStorage.setItem("")
  return <p>{balance.formatted}</p>;
}

export default NativeBalance;
