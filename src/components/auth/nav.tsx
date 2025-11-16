import Link from "next/link";

function AuthNav() {
  return (
    <nav className='fixed rounded-4xl mt-4 top-0 w-[300px] left-1/2 -translate-x-1/2 right-0 p-4 dark:bg-[#171717] bg-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='font-bold  text-xl'>
          NewsAI
        </Link>

        <Link href='/signin' className='hover:opacity-80'>
          SignIn
        </Link>
        <Link href='/signup' className='hover:opacity-80'>
          SignUp
        </Link>
      </div>
    </nav>
  );
}

export default AuthNav;
