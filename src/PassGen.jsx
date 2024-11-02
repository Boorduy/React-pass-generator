import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
export default PassGenerator
function PassGenerator() {
    
  const [length,setLength] = useState(14);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [camelAllowed, setCamelAllowed] = useState(true);

  const [password, setPassword] = useState('')

    const passwordRef = useRef(null)
  // the blue () is our callback
  useEffect(() =>  {generatePassword()}, [camelAllowed,charAllowed, numberAllowed, length])

  const generatePassword = useCallback(() => {
    let pass = ''
    let string = 'abcdefghijklmnopqrstuvwxyz'
    //let char = '-_+2`?%&*#@$'
    if (camelAllowed) string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAllowed) string += '1234567890'
    if (charAllowed) string += '!-_+2`?%&*#@$'
    
    //we need a loop that runs as many times as the length is being set in our range input
    //inserting into pass


    //ok so basically before this it was:
    //for (let i = 1; i < length; i++) {
    //    const index = Math.floor( Math.random() * string.length + 1 )
    //    pass += string.charAt(index)
    //but now i fixed it into null and fixed it in a way that it keeps passing us the correct
    //amount of generated password length and not 1 smaller or 1 bigger.

    for (let i = null; i < length; i++) {
      const index = Math.floor( Math.random() * string.length )
      pass += string.charAt(index)
    
    //pass adds equals to string. method called charAt which gives us that we can find that
      //character at a position index is acting as index here.
      
      // we add 1 to it because it might generate a random number between 1 and 0
      // and because we dont want a weird  decimal number we floor it.
      //Mathfloor is a classic technique of generating numbers between range x and y such as
      //dice roller gambling app etc
    } //now once we get out of the loop we can use method setPassword to pass it from loop to that.
    setPassword(pass)

    
    
  }, [camelAllowed,length,numberAllowed,charAllowed])
  //we should'nt use password at the end cause not only it isnt needed but also because its
  //changing too frequently our code will burst and go on for itself.
  
// these are the dependencies of our useCallback and if they don't change too frequently we're
//good to go

  //as soon as page renders we want another hook to execute our method to generate password.

    // useCallback is a react hook that lets u cache a function definition in between re-renders.
    //example: cachedFn = useCallback(function, dependancies)
    //memoization technique search it and learn it
    //logic is 
  
    const copyToClipboard = () => {
        window.navigator.clipboard.writeText(password)
        //console.log(passwordRef.current.value)
        passwordRef.current.select()
       
        //this also does the job like select passwordRef.current.setSelectionRange(null,length)
        //passwordRef.current.setSelectionRange(0,10)
        //seSelectionRange selects from start(or amount you give to where) u want it to select
        //now we need feedback to user to let them know it worked.
        //we will use ref to reference back to it
        //multiple uses, how many times page was loaded reloaded, alot, etc.

    }
    //this is how to create copy text into ur keyboard. this methods 
    //writeText(const u want) into ur clipboard
        //window.navigator.clipboard.readText() gives access to admin when the button is clicked
        //to be able to see the things on the clipboard of the person that clicked on it
  return (
    <>
      <div className='w-full max-w-screen-sm shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-800'>
        <h1 className='text-white text-center my-3'> Password Generator</h1>
        <div className='flex-shadow rounded-lg overflow-hidden mb-4'>

          <input type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='PassWBord'
          readOnly
          // ref={}
          ref = {passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0' 
          onClick={copyToClipboard}>
            copy Password
          </button>


        </div>
        <div
        className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'min={6} max={28} value={length} className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}/>
          
            <label htmlFor='length'>Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={numberAllowed}
            onChange={() => {setNumberAllowed((prev) => !prev )}}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => {setCharAllowed((prev) => !prev )}}
            />
            <label htmlFor='charInput'>Special-Characters</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={camelAllowed}
            onChange={() => {setCamelAllowed((prev) => !prev )}}
            />
            <label htmlFor='camelInput'>Camel-Case</label>
          </div>
        </div>
      </div>
    </>
  )
}