'use client'

import Image from 'next/image'
import Link from 'next/link'
import { images, imageDimensions } from './ImageConfig'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="bg-black text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and School Name */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={images.schoolLogo}
              alt="LUBNA G.B.S.S Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h1 className="text-lg font-bold">LUBNA G.B.S.S</h1>
              <p className="text-xs text-gray-300">CAMPUS 2/C LANDHI</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/admissions" className="hover:text-gray-300 transition-colors">Admissions</Link>
            <Link href="/results" className="hover:text-gray-300 transition-colors">Results</Link>
            <Link href="/news" className="hover:text-gray-300 transition-colors">News & Events</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ml-4">
                  Log In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  )
}