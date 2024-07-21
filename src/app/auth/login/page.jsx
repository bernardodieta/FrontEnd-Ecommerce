import { LoginUsers } from "@/components/login/Login.jsx"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div>
      <LoginUsers />     
    </div>
  )
}

LoginPage.displayName = 'LoginPage'
export default LoginPage