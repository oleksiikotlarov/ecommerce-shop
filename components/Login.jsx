import {useState} from 'react'
import Wrapper from "@/components/Wrapper";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../config/fire';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = () => {
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            console.log(user);
            
        })
        .catch((err) => {
            if (err.code === "auth/user-not-found") {
              return alert("Invalid Email or Password");
            }
            if (err.code === "auth/invalid-email") {
              return alert("Please enter valid email");
            }
          });
    }

  return (
    <Wrapper>
    <div className="flex-[1] max-w-l max-h-full mt-24 mb-24 pb-[50px]">

      <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
        <div className="flex justify-between  pt-5">
          <div className="uppercase text-md md:text-lg font-medium text-black">
            Admin panel login
          </div>
        </div>
      

      <div className="text-sm md:text-md py-5 border-t mt-5">
        <form onSubmit={handleLogin}>
          <div className="relative z-0 mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 mb-6 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          
          
        </form>
      </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
        onClick={() => {
            handleLogin()
        }}>
        Login
        {/* {loading && <img src="/spinner.svg" />} */}
      </button>
      
    </div>
    </Wrapper>
  )
}

export default Login