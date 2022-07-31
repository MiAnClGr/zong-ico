import React from 'react';
import './App.css';
import Header from './components/Header.js'
import BuyForm from './components/BuyForm.js'
import { BigNumber, ethers } from "ethers"
import abi from './zongICO.json'

declare var window: any

const contractABI = abi.output.abi
    
const contractAddress : string = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'

const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)

const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

const ICOContract : ethers.Contract = new ethers.Contract(contractAddress, contractABI, signer);

const App = () => {

  const [currentAccount, setCurrentAccount] = React.useState('Ox')
  const [userBalance, setUserBalance] = React.useState('')
  const [zongBalance, setZongBalance] = React.useState('')
 

  const connectWallet = async () =>  {

    await provider.send("eth_requestAccounts", [])
    
    if(window.ethereum) {
    
    await console.log('Wallet')
    }

    const currentAddress : string = await signer.getAddress()
      
    setCurrentAccount(currentAddress)
     
    const balance : BigNumber = await provider.getBalance(currentAddress)
     
    setUserBalance(ethers.utils.formatEther(balance))

    const zongTokenBalance : BigNumber = await ICOContract.balanceOf(currentAddress) 

    const zongTokenBalanceConverted : string = '' + zongTokenBalance.toNumber()
    
    setZongBalance(zongTokenBalanceConverted)
  }
  
  return (
      <div>
        <Header
          connect= {connectWallet}
          user= {currentAccount}
          balance= {userBalance}
          zongBalance= {zongBalance}
          />
        <BuyForm 
          contract= {ICOContract}
          contractAddress= {contractAddress}
          signer= {signer}
          />
        
      </div>
  )
}

export default App;