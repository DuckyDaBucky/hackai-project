// src/Pages/AboutUs.tsx
import Header from '../Components/Header'
import AliImage from '../assets/Ali.jpg'
import HasnainImage from '../assets/Hasnain.jpg'
import KabirImage from '../assets/Kabir.jpg'
import RamziImage from '../assets/Ramzi.jpg'

export default function AboutUs() {
  const founders = [
    {
      name: 'Ali',
      quote: "A smooth sea never made a skilled sailor",
      image: AliImage,
    },
    {
      name: 'Hasnain',
      quote: "AI is definitely not replacing me",
      image: HasnainImage,
    },
    {
      name: 'Ramzi',
      quote: "The only way to do great work is to love what you do.",
      image: RamziImage,
    },
    {
      name: 'Kabir',
      quote: "In the midst of chaos, there is also opportunity",
      image: KabirImage,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="px-6 py-16 max-w-6xl mx-auto">
        {/* 🟡 Hero Title */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-lg text-gray-600">4 founders. 1 vision. Endless possibilities.</p>
        </section>

        {/* 🟣 Quotes from Founders (with headshots) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            {founders.map((founder, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
                >
                    <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-20 h-20 rounded-full mb-4 object-cover border border-gray-300"
                    />
                    <p className="italic text-gray-700 mb-4">“{founder.quote}”</p>
                    <p className="text-sm font-semibold text-gray-500">— {founder.name}</p>
                </div>
            ))}
        </section>

        {/* 🟢 Connect Button */}
        <div className="flex justify-center">
            <a
                href="mailto:team@finflow.com" // ← Replace with your real contact or form link
                className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
            >
                Connect with Us
            </a>
        </div>


        {/* 🔵 Inspiration Section */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-semibold mb-4">Where We Get Our Inspiration</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Inspired by Batman's butler, Alfred, who manages complexity behind the scenes, Alfred.AI simplifies dense financial documents. 
            Our goal is to handle the clutter, allowing users to focus on the key insights that truly matter in financial research.
          </p>
        </section>
      </main>
    </div>
  )
}
