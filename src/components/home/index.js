import { Container, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Moralis from 'moralis'
// import { useMoralis } from "react-moralis";
import { FaAngry, FaTwitter } from 'react-icons/fa'
import { BsGear } from 'react-icons/bs'
import { IoMdSync } from 'react-icons/io'
import { AiOutlinePlusCircle, AiOutlineReddit, AiFillYoutube, AiOutlineMedium, AiOutlineMail } from 'react-icons/ai'
import { VscSettings } from 'react-icons/vsc'
import { MdExpandMore } from 'react-icons/md'
import { TiMessages } from 'react-icons/ti'
import { RiCalendarCheckLine, RiStackshareLine } from 'react-icons/ri'
import { BiTransfer, BiGasPump } from 'react-icons/bi'
import { FiGithub } from 'react-icons/fi'

import Chains from '../Chains';
import NativeBalance from '../NativeBalance'
import AccountDetail from '../AccountDetail'
// import ProgressBar from "@ramonak/react-progress-bar";
// import axios from 'axios';
// import { io } from "socket.io-client";
import { serverUrl, appId } from '../../config/config';

import logoImg from './../../assets/gas-limit-ic.png'
import accountIconLogo from './../../assets/one-inch@1x.png';
import logoImgWithText from './../../assets/mask-group-4@1x.png';



// const menuItems = [
//   {
//     key: "0x1",
//     value: "0x1",
//     label: <div><ETHLogo /> <span>Ethereum</span></div>
//   },
//   {
//     value: "0x539",
//     label: <div><img src={accountIconLogo} alt="" width={20} /> <span>Local Chain</span></div>
//   },
//   {
//     value: "0x3",
//     label: <div><ETHLogo /> <span>Ropsten Testnet</span></div>
//   },
//   {
//     value: "0x4",
//     label: <div><ETHLogo /> <span>Rinkeby Testnet</span></div>
//   },
//   {
//     value: "0x2a",
//     label: <div><ETHLogo /><span>Kovan Testnet</span></div>
//   },
//   {
//     value: "0x5",
//     label: <div><ETHLogo /> <span>Goerli Testnet</span></div>
//   },
//   {
//     value: "0x38",
//     label: <div><BSCLogo /> <span>Binance</span></div>
//   },
//   {
//     value: "0x61",
//     label: <div><BSCLogo /><span>Smart Chain Testnet</span></div>
//   },
//   {
//     value: "0x89",
//     label: <div><PolygonLogo /> <span>Polygon</span></div>
//   },
//   {
//     value: "0x13881",
//     label: <div><PolygonLogo /> <span>Mumbai</span></div>
//   },
//   {
//     value: "0xa86a",
//     label: <div><AvaxLogo /> <span>Avalanche</span></div>
//   },
// ];



function Home() {
  // const { getBalance, data: balance, nativeToken } = useNativeBalance({ chain: "eth" });

  const [ tokens, setTokens ] = useState("");
  const [ currentUser, setCurrentUser ] = useState(null);
 
  useEffect(() => {

    init();
    // console.log(`selectedChainFromHome`, getBalance, balance, nativeToken)


  }, []);


  async function init() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();
    await listAvailableTokens();
    const User = Moralis.User.current();
    // Moralis.Web3.cha
    console.log(`selectUser`, User)

    setCurrentUser(User)
    if (User) {
      document.getElementById("swap_button").disabled = false;
    }
  }

  async function listAvailableTokens() {
    const result = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
    });
    setTokens(result.tokens);
    // for (const address in tokens) {
    //   let token = tokens[address];
    //   // let html = `
    //   //   <img class="token_list_img" src="${token.logoURI}">
    //   //   <span class="token_list_text">${token.symbol}</span>
    //   //   `;
    // }
  }

  

  // const options = [
  //   { value: 'Etherum', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>Etherum</span></div> },
  //   { value: 'strawberry', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>Strawberry</span></div> },
  //   { value: 'bitcoin', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>Bitcoin</span></div> }
  // ]

  const optionsCurr = [
    { value: 'Etherum', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>ETH</span></div> },
    { value: 'strawberry', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>BTC</span></div> },
    { value: 'bitcoin', label: <div><img src={accountIconLogo} alt="" width={20} /> <span>FIY</span></div> }
  ]

  

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
            <img src={accountIconLogo} alt="Account Logo" srcset="" className="acc-logo-small-gas-limit" />
            <NativeBalance />
          </div>
          <AccountDetail />

          <div className="gas-lmtaccountEtherBal">
            <FaAngry color="#FFD3A2" className="iconOnBalanceico"/>
            <p>0.0862 ETH</p>
            <p>0xe001...5020</p>
          </div>
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
                <p className="payl-select-curr-name">Wrapped Ether</p>
                <Select 
                  options={optionsCurr}
                  classNamePrefix="select-you-pay-curr" 
                  components={{
                    IndicatorSeparator: () => null
                  }} 
                />
              </div>
              <div className="you-pay-enter-amnt">
                <p className="pay-enter-curr-usd-amnt">~$4,336</p>
                <input type="text" value="0" />
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
                <p className="payl-select-curr-name">Dai Stablecoin</p>
                <Select 
                  options={optionsCurr}
                  classNamePrefix="select-you-pay-curr" 
                  components={{
                    IndicatorSeparator: () => null
                  }} 
                />
              </div>
              <div className="you-pay-enter-amnt">
                <p className="pay-enter-curr-usd-amnt">~$4,336</p>
                <input type="text" value="0" />
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
            <div className="you-to-select-convert-cost">
              <p>1 ETH cost</p>
              <b>43,23234 DAI</b>
            </div>
            <div className="you-to-select-convert-cost">
              <p>1 ETH cost</p>
              <b>43,23234 DAI</b>
            </div>
            <div className="you-to-select-convert-cost">
              <p>Current Market Transaction cost</p>
              <b>$68.16 0.0157 Ξ</b>
            </div>
          </div>
          <div className="confirm-order-btn-section">
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
            <img src={logoImgWithText} alt="" srcset="" />
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
