function Header() {
    return (
      <header className="bg-blue-900 bg-opacity-30 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-100">
            Social-Spark
          </a>
          <div>
            <a href="/brands" className="mr-4 text-blue-200 hover:text-white transition duration-300">
              For Brands
            </a>
            <a href="/influencers" className="mr-4 text-blue-200 hover:text-white transition duration-300">
              For Influencers
            </a>
            <a
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition duration-300"
            >
              Login
            </a>
          </div>
        </nav>
      </header>
    )
  }
  
  export default Header
  
  