"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, getSession, getProviders, useSession } from 'next-auth/react'

type Provider = { // we will get these properties from the provider
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null; // this is a type that represents an object with string keys and string values.
};

type Providers = Record<string, Provider>

const Navbar = () => {
  const { data: session } = useSession();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false)
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response)
    }
    fetchProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image
          src='/assets/images/logo.svg'
          width={30}
          height={30}
          alt="romptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                //@ts-ignore
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="flex sm:hidden relative">

        {session?.user ? (
          <div className="flex">
            <Image
              //@ts-ignore
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleMenu((prev) => !prev)}
            // it is not correct to update states based on the previous state
            // instead the above method is correct
            />

            {toggleMenu && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleMenu(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar