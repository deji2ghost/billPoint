import React, { useState } from 'react'
import FormHeader from '../component/FormHeader'
import FormFooter from '../component/FormFooter'
import InputForm from '../component/ui/InputForm'
import CustomButton from '../component/ui/CustomButton'

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
  return (
    <div className="flex flex-col gap-[64px] p-[32px] md:py-[226px] md:px-[146px] lg:py-[206px] lg:px-[182px] bg-lightGrey">
    <div className="flex flex-col gap-[40px] md:p-[40px] md:bg-White md:rounded-[8px]">
      <FormHeader header="Login" paragraph="Add your details below to get back into the app"/>
      {/* <form onSubmit={handleSignIn} className="flex flex-col gap-[24px]"> */}
      <form className="flex flex-col gap-[24px]">
        <InputForm label='Email address' placeholder='e.g. alex@email.com' value={email} setValue={setEmail} />
        <InputForm label='Password' placeholder='Enter your password' value={password} setValue={setPassword}/>
        <CustomButton>
          Login
        </CustomButton>
        <FormFooter title='Dont have an account?' paragraph="Create an account"/>
      </form>
    </div>
  </div>
  )
}

export default LoginForm
