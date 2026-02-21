import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // tokenResponse contains an 'access_token'
        // We send this to our backend endpoint we created earlier
        const res = await axios.post("http://localhost:3000/api/auth/google", {
          idToken: tokenResponse.access_token 
        });
        
        console.log("Login Success:", res.data);
        // Save your app's JWT (res.data.token) to localStorage/state
        localStorage.setItem("token", res.data.token);
      } catch (err) {
        console.error("Backend Error:", err);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <>
     <button onClick={() => login()} 
      style={{ padding: '10px 20px', cursor: 'pointer' }}>signup with google</button>
    </>
  )
}

export default App
