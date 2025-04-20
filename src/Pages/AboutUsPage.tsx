// src/Pages/AboutUs.tsx
import Header from '../Components/Header'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-paleLavender to-mintWash animate-gradient flex flex-col">
      <Header />

      <main className="px-6 py-16 max-w-6xl mx-auto flex-grow">
        {/* 🟡 Hero Title */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-lg text-gray-600">4 founders. 1 vision. Endless possibilities.</p>
        </section>

        {/* 🟣 Quotes from Founders (with headshots) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {[
            {
              name: 'Founder 1',
              quote: "Tech isn't just tools. It's the bridge between vision and impact.",
              image: '/founders/john-doe.jpg',
            },
            {
              name: 'Founder 2',
              quote: "I build not just for users — but for the future of work.",
              image: '/founders/john-doe.jpg',
            },
            {
              name: 'Founder 3',
              quote: "Turning dense data into human decisions — that's the mission.",
              image: '/founders/john-doe.jpg',
            },
            {
              name: 'Founder 4',
              quote: "Every line of code is a step toward change.",
              image: '/founders/john-doe.jpg',
            },
          ].map((founder, index) => (
            <div
              key={index}
              className="bg-[#d4d8ec] shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
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
            href="mailto:team@finflow.com"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Connect with Us
          </a>
        </div>

        {/* 🔵 Inspiration Section */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-semibold mb-4">Where We Get Our Inspiration</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            This project is inspired by the rise of Generative AI and the need to make complex business documents human-readable.
            From the elegance of tools like ChatGPT and Notion AI to the power of enterprise data, we’re blending creativity with precision.
            Our goal? Making finance feel frictionless.
          </p>
        </section>
      </main>

      {/* 🔻 Footer Notes */}
      <footer className="w-full text-center text-sm text-graySlate/70 py-6 bg-cloud">
        <p>&copy; {new Date().getFullYear()} Alfred.AI. All rights reserved.</p>
        <p className="mt-1">
          Questions? <a href="mailto:support@alfred.ai" className="text-plum hover:underline">Contact us</a>
        </p>
        <p className="mt-1">
          Connect: <a href="https://linkedin.com/in/alfred-ai" target="_blank" className="text-plum hover:underline">LinkedIn</a> | <a href="https://github.com/alfred-ai" target="_blank" className="text-plum hover:underline">GitHub</a>
        </p>
      </footer>
    </div>
  )
}
