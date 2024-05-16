import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const [clicked, setClicked] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "@!#$%^&*(){}:";

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setClicked(true);
    setTimeout(() => {
      setClicked(false)
    }, 1000);
  }, [password] )

  return (
    <>
    <div className=' w-full h-screen bg-zinc-900 overflow-hidden flex justify-center items-center'>
          <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-4 font-semibold text-red-500 bg-slate-300 py-2'>
              <div className='shadow rounded-md overflow-hidden mb-4 justify-center px-5'>
                  <h1 className='text-4xl text-black py-2 justify-center'>Password Generator</h1>
                  <div className='flex flex-row gap-2'> 
                    <input type="text" name="password" id="password" className='outline-none w-full py-2 rounded-md' placeholder=' Password' ref={passwordRef} value={password} readOnly />
                    <button className={` px-3 rounded-md text-xl text-black shadow-md py-3 ${clicked ? 'bg-green-600' : 'bg-blue-600'} `} onClick={copyToClip}>{clicked ? 'Copied' : 'Copy'}</button>
                  </div>
                  <div className='flex text-sm mt-2 gap-x-2'>
                      <div className='flex items-center gap-x-2'>
                        <input type='range' min={6} max={100} value={length} onChange={(e) => {setLength(e.target.value)}}></input>
                        <label> Length: {length}</label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {setnumberAllowed((prev) => !prev)}} />
                        <label>Numbers</label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input type='checkbox' defaultChecked = {characterAllowed} onChange={() => {setCharacterAllowed((prev) => !prev)}}/>
                        <label>Characters</label>
                      </div>
                  </div>
              </div>
          </div>
    </div>

    </>
  )
}

export default App
