import React, { FC, ReactElement } from 'react'
import { ethers } from "ethers"
// import * as logo from '../zong-logo.png'

type props = {
  contract: ethers.Contract
  contractAddress: string
  signer: ethers.providers.JsonRpcSigner
}

const BuyForm : FC<props> = ({ contract, contractAddress, signer }) : ReactElement => {

  console.log(signer.getAddress(), 'success')

  const [submitData, setSubmitData] = React.useState("")

  const sendMoney = async () => {
    const tx = {
      to: contractAddress,
      value: ethers.utils.parseEther(submitData),
      gasLimit: 210000
    }
    await contract.invest(await signer.sendTransaction(tx))
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    setSubmitData(event.target.value)
  }

  function handleSubmit(event : React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendMoney()
    console.log('sent')
  }

  return (
    <form>
      {/* <img className='Logo' src={logo} /> */}
      <div className='Buy'>
        <br></br>
        <br></br>
        <input
          className='BuyInput'
          placeholder='Enter Amount'
          name='buy'
          onChange={handleChange}
          value={submitData}
        >
        </input>
        <button
          className='BuyButton'
          onClick={handleSubmit}
          value={submitData}
        >
          Submit
        </button>
      </div>
      <h3 className='Instructions'>Enter the amount in Eth</h3>
      <h4 className='Instructions'>One $ZONG = 0.003 ETH</h4>
      <h4 className='Instructions'>Contract Address: {contractAddress}</h4>
    </form>
  )
}

export default BuyForm