function Hero() {
    return (
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-100 animate-fade-in-up">
            Ignite Your Social Influence with Social-Spark
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200 animate-fade-in-up animation-delay-300">
            Connect brands with influencers. Amplify your reach. Spark conversations.
          </p>
          <a
            href="/signup"
            className="bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-400 transition duration-300 animate-fade-in-up animation-delay-600"
          >
            Get Started
          </a>
        </div>
      </section>
    )
  }
  
  export default Hero
  
  