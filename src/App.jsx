import { useState ,useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [characterAllowed,setcharacterAllowed]=useState(false)
  const [Password,setPassword]=useState()
  const PasswordGenerator = useCallback(()=>{
      let pass='';
      let  str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if(numberAllowed) str+="1234567890";
      if(characterAllowed) str+='!@#$%^&*()';
      for (let i = 0; i < length; i++) { 
       let char =Math.floor(Math.random()*str.length+1);
       pass+=str.charAt(char)
    }
      

   setPassword(pass); 
  },[length,numberAllowed,characterAllowed,setPassword])

// useRef hook 
const passwordRef=useRef(null);


const copyPasswordToclipboard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,101)
  window.navigator.clipboard.writeText(Password) ;     
},[Password])



  useEffect(()=>{
           PasswordGenerator();
  },[length,numberAllowed,characterAllowed,PasswordGenerator]);

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-70% ... h-[100vh] pt-28'>
   <div className="w-full max-w-md px-4 pt-10 pb-10 mx-auto my-8 text-2xl font-extrabold text-black bg-gray-600 rounded-lg shadow-md">

    <h1 className='my-6 text-3xl font-extrabold text-center text-white '>PASSWORD GENERATOR</h1>
   <div className="flex mb-4 overflow-hidden rounded-lg">
    <input
    type='text'
    value={Password}
    className='w-full px-3 py-1 outline-none '
    placeholder='password'
    ref={passwordRef}
    readOnly></input> 
    <button 
    onClick={copyPasswordToclipboard}
    className='px-3 py-1 text-white bg-blue-700 outline-none shrink-0'>Copy</button>
   </div>
   <div className="flex m-2 text-sm gap-x-4">
    <div className="flex items-center gap-x-1 ">
      <input type="range" min={8} max={100}
      value={length}
      onChange={(e)=>{setLength(e.target.value)}}
      className='cursor-pointer' />
      <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1 ">
      <input type="checkbox" 
      defaultChecked={numberAllowed}
      className='rounded-lg cursor-pointer ' 
      onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
      <label>Number</label>
    </div>
    <div className="flex items-center gap-x-1 ">
      <input type="checkbox" 
      defaultChecked={characterAllowed}
      className='rounded-lg cursor-pointer' 
      onChange={()=>{setcharacterAllowed((prev)=>!prev)}} />
      <label>Character</label>
    </div>

   </div>
 
   </div>
     
    </div>
  )
}

export default App
