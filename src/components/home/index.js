import { Container, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import {useMoralis} from 'react-moralis'
import { FaTwitter } from 'react-icons/fa'
import { BsGear } from 'react-icons/bs'
import { IoMdSync } from 'react-icons/io'
import { AiOutlinePlusCircle, AiOutlineReddit, AiFillYoutube, AiOutlineMedium, AiOutlineMail } from 'react-icons/ai'
import { VscSettings } from 'react-icons/vsc'
import { MdExpandMore } from 'react-icons/md'
import { TiMessages } from 'react-icons/ti'
import { RiCalendarCheckLine, RiStackshareLine } from 'react-icons/ri'
import { BiTransfer, BiGasPump } from 'react-icons/bi'
import { FiGithub } from 'react-icons/fi'

import useInchDex from '../../hooks/useInchDex'
import useTokenPrice from '../../hooks/useTokenPrice'
import { c2, tokenValueTxt, tokenValue } from "../../helpers/formatters";
import { getWrappedNative } from "../../helpers/networks";

import Chains from '../Chains';
import AccountDetail from '../AccountDetail'

import logoImg from './../../assets/gas-limit-ic.png'
import accountIconLogo from './../../assets/one-inch@1x.png';
import logoImgWithText from './../../assets/mask-group-4@1x.png';


const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width
  }),
}


const chainIds = {
  "0x1": "eth",
  "0x38": "bsc",
  "0x89": "polygon",
};

const getChainNameByID = (chainID) => {

  let chainName = chainIds[chainID];
  chainName = chainName ? chainName : 'eth' //default eth chain
  return chainName
}

const IsNative = (address) => address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";


function Home() {
  // const { getBalance, data: balance, nativeToken } = useNativeBalance({ chain: "eth" });
  const { fetchTokenPrice } = useTokenPrice()
  const { Moralis, isAuthenticated } = useMoralis();
  const [ quote, setQuote ] = useState(null);
  const [swapAmount, setSwapAmount ] = useState(0);

  const [ selectedFrom, setSelectedForm ] = useState(null);
  const [ fromTokenPrice, setFromTokenprice ] = useState(null);
  const [fromTokenPriceUSD, setFromTokenPriceUSD ] = useState(null);

  const [ selectedTo, setSelectedTo ] = useState(null);
  // const [ toTokenPrice, setToTokenprice ] = useState(null);
  const [toTokenPriceUSD, setToTokenPriceUSD ] = useState(null);

  const { trySwap, tokenList, getQuote } = useInchDex("eth");

 
  useEffect(() => {
    // console.log(`selectedChainFromHome`, getBalance, balance, nativeToken)
    console.log(`tokenList`, tokenList)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionsCurr = tokenList && Object.keys(tokenList).map((tokenIndex) => {
    let token = tokenList[tokenIndex];
    return { 
      value: token.symbol,
      label: <div><img src={token.logoURI} alt="" width={20} /> <span>{token.symbol}</span></div>,
      logoURI: token.logoURI,
      name: token.name,
      address: tokenIndex,
      decimals: token.decimals,
    }
  })

  const fetchUSDPrice = async (selection) => {

    try {
      const getChain = localStorage.getItem("currentChain")
      const tokenAddress = IsNative(selection.address) ? getWrappedNative(getChain) : selection.address;
      const fetchTokenPricePayload = { chain: getChain, address: tokenAddress };
      console.log(`fetchTokenPricePayload`, fetchTokenPricePayload)
      let getUSDPrice = await fetchTokenPrice(fetchTokenPricePayload)
      const { value, decimals, symbol } = getUSDPrice.nativePrice;
      getUSDPrice.nativePrice = tokenValueTxt(value, decimals, symbol);
      setFromTokenprice(getUSDPrice);
      setFromTokenPriceUSD(getUSDPrice.usdPrice)
    } catch (error) {
      console.log(error);
      alert(error.error)
    }
  }

  const tryGetQuote = (paramsGetQuote) => {

    const { selectedF, selectedT, swapAmt } = paramsGetQuote;
    if (!selectedF || !selectedT || swapAmt === 0) return;
    const getChain = getChainNameByID(localStorage.getItem("currentChain"));
    const params = {
      fromToken: selectedF,
      toToken: selectedT,
      fromAmount: swapAmt,
      chain: getChain
    }
    console.log(`requesting for Qoute with these params`, params)
    getQuote(params)
    .then(quoteResponse => {
      console.log(`quoteResponse`, quoteResponse);
      setQuote(quoteResponse);
    })
  }

  const trySwapReq = () => {
    
    const getChain = getChainNameByID(localStorage.getItem("currentChain"));

    const trySwapParams = { 
      fromToken: quote?.fromToken, 
      fromAmount: swapAmount, 
      chain: getChain
    }

    //check if we have require values!
    if (trySwapParams.fromToken && swapAmount && isAuthenticated) trySwap(trySwapParams)
    
  }

  const fetchUSDPriceTo = async (selection) => {

    try {
      const getChain = localStorage.getItem("currentChain")
      const tokenAddress = IsNative(selection.address) ? getWrappedNative(getChain) : selection.address;

      let getUSDPrice = await fetchTokenPrice({ chain: getChain, address: tokenAddress })
      const { value, decimals, symbol } = getUSDPrice.nativePrice;
      getUSDPrice.nativePrice = tokenValueTxt(value, decimals, symbol);
      // setToTokenprice(getUSDPrice);
      setToTokenPriceUSD(getUSDPrice.usdPrice);
    } catch (error) {
      console.log(error);
      alert(error.error)
    }
  }


  const updateSelectedUsdPrice = (event) => {
    const { value } = event.target;
    /* TODO: validate input fields for string */
    // const re = /^[0-9\b]+$/;
    // if (re.test(value) || value === ''){
      
      
    // }

    const inputPrice = Number(value);
    // console.log(`inputPrice`, inputPrice)
    let perTokenPrice = fromTokenPrice?.usdPrice
    const calcPrice = perTokenPrice * inputPrice;
    setSwapAmount(inputPrice)
    setFromTokenPriceUSD(calcPrice);
    tryGetQuote({
      selectedF: selectedFrom,
      selectedT: selectedTo,
      swapAmt: inputPrice
    });
  }

  const PriceSwapCharges = () => {
    const Quote = quote;
    if (!Quote) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    console.log(Quote);
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { value: fromSymbol } = selectedFrom;
    const { value: toSymbol } = selectedTo;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, selectedFrom["decimals"]) / tokenValue(toTokenAmount, selectedTo["decimals"])
    ).toFixed(6);
    const pricePerTokenTo = parseFloat(
      tokenValue(toTokenAmount, selectedFrom["decimals"]) / tokenValue(fromTokenAmount, selectedTo["decimals"])
    ).toFixed(6);
    return (
      <>
        <div className="you-to-select-convert-cost">
          <p>1 {toSymbol} cost</p>
          <b>{pricePerToken} {fromSymbol}</b>
        </div>
        <div className="you-to-select-convert-cost">
          <p>1 {fromSymbol} cost</p>
          <b>{pricePerTokenTo} {toSymbol}</b>
        </div>
      </>
    );
  };

  // console.log(`tokenPrice`, tokenPrice, fromTokenPrice)
  return (
    <Container fluid>
      <Row className="header-area">
        <Col md={4}>
          <div className="header-left-start">
            <img src={logoImg} className="header-img" alt="gas limits header" />
            <p>Buy ETH</p>
          </div>
        </Col>
        <Col md={{ span: 5, offset: 3}} className="header-right-section">
          <div className="select-source-eth">
            <Chains />
            
          </div>
          {/* <div className="select-source-eth">
            <Select options={options} classNamePrefix="eth-src-select" components={{
              IndicatorSeparator: () => null
            }}/>
          </div> */}
          <div className="gas-lmtaccountBalance">
            <img src={accountIconLogo} alt="Account Logo" className="acc-logo-small-gas-limit" />
            <p>0</p>
            {/* <NativeBalance /> */}
          </div>
          <AccountDetail />
          <div className="gas-header-settings">
            <BsGear color="#ddd" size={21} className="header-settings-icon"/>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="hero-text-section-gaslimit">
          <h1>Take Control of Gas Fees</h1>
          <p>Access the most liquidity, lowest slippage and best exchange rates across Ethereum, Binance Smart Chain, Polygon, Optimistic Ethereum (OΞ) and Arbitrum.</p>
        </div>
      </Row>
      <Row>
        <Col className="main-section-gaslimit" md={{ offset: 4, span: 4 }}>
          <div className="section-main-header-gaslimit">
            <div className="main-section-tabs-gaslimit">
              <button className="market-btn-gaslimit">Market</button>
              <button className="limit-btn-gaslimit">Limit</button>
            </div>
            <div className="main-section-other-btns-gaslimit">
              <button className=" main-section-top-right-btn"><IoMdSync size={25} className="syncBtn-main-gaslimit"/></button>
              <button className="main-section-top-right-btn"><AiOutlinePlusCircle size={25} className="addtokenBtn-main-gaslimit" /></button>
              <button className=" main-section-top-right-btn" ><VscSettings size={25} className="settingsBtn-main-gaslimit"/></button>
            </div>
          </div>
          <div className="you-pay-main-section">
            <p className="main-section-help-txt">You Pay</p>
            <div className="you-pay-input-fields">
              <div className="you-pay-select-coin">
                <p className="payl-select-curr-name">{selectedFrom ? selectedFrom.name : ''}</p>
                <Select 
                  options={optionsCurr}
                  classNamePrefix="select-you-pay-curr" 
                  components={{
                    IndicatorSeparator: () => null
                  }}
                  onChange={selection => {
                    console.log(`selectToken`, selection)
                    setSelectedForm(selection);
                    fetchUSDPrice(selection)
                    // TODO: Needs to update the swapAmount I guess
                    tryGetQuote({
                      selectedF: selection,
                      selectedT: selectedTo,
                      swapAmt: swapAmount
                    });
                  
                  }}
                  styles={customStyles}
                />
              </div>
              <div className="you-pay-enter-amnt">
                <p className="pay-enter-curr-usd-amnt">~{fromTokenPriceUSD ? c2.format(fromTokenPriceUSD) : '0'}</p>
                <input type="text" placeholder="0" onChange={updateSelectedUsdPrice} />
              </div>
            </div>
          </div>
          <div className="curr-formto-seperator">
            <BiTransfer  className="form-to-sep-icon" size={40}/>
          </div>
          <div className="you-pay-main-section">
            <p className="main-section-help-txt">You Receive</p>
            <div className="you-pay-input-fields">
              <div className="you-pay-select-coin">
                <p className="payl-select-curr-name">{selectedTo ? selectedTo.name : ''}</p>
                <Select 
                  options={optionsCurr}
                  classNamePrefix="select-you-pay-curr" 
                  components={{
                    IndicatorSeparator: () => null
                  }}
                  styles={customStyles}
                  onChange={selection => {
                    console.log(`selectToken`, selection)
                    setSelectedTo(selection);
                    fetchUSDPriceTo(selection)
                    tryGetQuote({
                      selectedF: selectedFrom,
                      selectedT: selection,
                      swapAmt: swapAmount
                    });

                  }}
                />
              </div>
              <div className="you-pay-enter-amnt">
                <p className="pay-enter-curr-usd-amnt">~{toTokenPriceUSD ? c2.format(toTokenPriceUSD) : '0'}</p>
                <input 
                  type="text" 
                  placeholder="0.00"
                  value={quote ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6) : ""}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="gas-limit-setup-section">
            <div className="gas-limit-handler-section">
              <BiGasPump size={25} className="gas-limit-icon" color="#2ed1c2"/>
              <p>Set Gas Limit</p>
              <MdExpandMore size={25} color="#000"/>
            </div>
            <div className="gas-limit-setup-content">
              <div className="gas-limit-setup-option">
                <p>Only execute, when transaction <span>cost drops below</span>:</p>
                <input type="text" defaultValue="0"/>
              </div>
              <div className="gas-limit-setup-option">
                <p>Select transaction speed for your swap:</p>
                <select name="" id="limit-order-expire-days" placeholder="0%">
                  <option value="1">1 %</option>
                  <option value="2">2 %</option>
                  <option value="3">3 %</option>
                </select>
              </div>
              <div className="gas-limit-setup-option">
                <p>Order will expire in:</p>
                <select name="" id="limit-order-expire-days" placeholder="days">
                  <option value="1">1 day</option>
                </select>
              </div>
            </div>
          </div>
          <div className="transaction-states-market-gaslimit">
            <PriceSwapCharges />
            {quote && (
              <div className="you-to-select-convert-cost">
                <p>Current Market Transaction cost</p>
                <b>{quote?.estimatedGas} Ξ</b>
              </div>
            )}
            
          </div>
          <div className="confirm-order-btn-section" onClick={trySwapReq}>
            <RiCalendarCheckLine size={35} className="confrm-ordr-btn-icon"/>
            <b>Review Swap Order</b>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4}} className="main-sec-bttm-ref-text">
          <RiStackshareLine size={100} color="#2ed1c2"/>
          <div className="main-sec-bttm-ref-right-text">
            <p>Connect wallet to generate referral link</p>
            <p>How it works? <a href="/">Read more</a>.</p>
          </div>
        </Col>
      </Row>
      <Row className="footer-section-gaslimit"> 
        <div className="footer-border-top-sect"></div>
        <div className="footer-content-data-sec">
          <div className="footer-left-section-gaslimit">
            <img src={logoImgWithText} alt="" />
            <ul className="footer-menu-gaslimit">
              <li className="footer-menu-item-gaslimit"><a href="/">Tokens</a></li>
              <li className="footer-menu-item-gaslimit"><a href="/">API</a></li>
              <li className="footer-menu-item-gaslimit"><a href="/">Terms Of Service</a></li>
              <li className="footer-menu-item-gaslimit"><a href="/">Privacy Policy</a></li>
              <li className="footer-menu-item-gaslimit"><a href="/">Press Room</a></li>
            </ul>
          </div>
          <div className="footer-section-nav-icons">
            <AiOutlineMail className="footer-btn-icons-social" size={35} color="#ddd"/>
            <TiMessages className="footer-btn-icons-social" size={35} color="#ddd"/>
            <AiOutlineReddit className="footer-btn-icons-social" size={35} color="#ddd"/>
            <AiOutlineMedium className="footer-btn-icons-social" size={35} color="#ddd"/>
            <FaTwitter className="footer-btn-icons-social" size={35} color="#ddd"/>
            <AiFillYoutube className="footer-btn-icons-social" size={35} color="#ddd"/>
            <FiGithub className="footer-btn-icons-social" size={35} color="#ddd"/>
          </div>
        </div>
        <div className="footer-copyright-text">
          © 2021 Gas Limits, All Rights Reserved.
        </div>
      </Row>
    </Container>
  );
}

export default Home;
