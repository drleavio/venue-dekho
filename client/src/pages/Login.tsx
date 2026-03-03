import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login=()=>{
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/google", {
          idToken: tokenResponse.access_token 
        });
        console.log("Login Success:", res.data);
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

export default Login
