export default function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
        <div className="flex flex-nowrap  justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="/images/logo_wt.png"
              className="mr-3 h-6 sm:h-9 w-16 h-10"
              alt="Thrifter Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 whitespace-nowrap"
            >
              Log in
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
