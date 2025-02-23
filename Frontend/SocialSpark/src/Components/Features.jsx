import { Sparkles, Target, Zap } from "lucide-react"

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-yellow-300" />,
    title: "Discover Perfect Matches",
    description: "Our AI-powered algorithm connects brands with the ideal influencers for their campaigns.",
  },
  {
    icon: <Target className="h-10 w-10 text-green-300" />,
    title: "Target Your Audience",
    description: "Reach your desired demographic with precision through our extensive network of influencers.",
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-300" />,
    title: "Amplify Your Impact",
    description: "Boost your brand awareness and engagement with our proven influencer marketing strategies.",
  },
]

function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-800 bg-opacity-30 backdrop-blur-md rounded-lg p-6 shadow-lg transition duration-300 hover:transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-100 text-center">{feature.title}</h3>
              <p className="text-blue-200 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

