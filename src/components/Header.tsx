import React, {FC, ReactElement} from 'react'

type props = {
  connect : () => Promise<void>
  user : string
  balance : string
  zongBalance : string

}

const Header : FC<props> = ({ connect, user, balance, zongBalance }) : ReactElement => {
  
  return(
    
    <header className='Header'>
      <div className= 'User'>
        <text>Current User: {user} </text>
        <br></br>
        <br></br>
        <text>Current Eth Balance: {balance}</text>
        <br></br>
        <br></br>
        <text>Current $ZONG Balance: {zongBalance} </text>
      </div>
      <button
        className= 'Connect'
        onClick= {connect}
         >
        Connect Wallet
      </button>  
      
    </header>
  )
}

export default Header