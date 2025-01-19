'use client'

import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn 
        appearance={{
          elements: {
            card: 'shadow-lg rounded-lg',
            headerTitle: 'text-2xl font-bold',
            socialButtonsBlockButton: 'w-full mb-4',
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        }} 
      />
    </div>
  )
}
