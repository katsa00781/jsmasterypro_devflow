'use client'

import React from 'react'

import AuthForm from '@/components/form/AuthForm'
import { SignUpSchema } from '@/lib/validations'


const SignUp = () => {
  return (
    <AuthForm
    formType="SIGN_UP"
    schema={SignUpSchema}
    defaultValues={{'email': '', 'password': '', name: '', username: ''}}
    onSubmit={(data) => Promise.resolve({succes: true, data})}
    />
  )
}

export default SignUp