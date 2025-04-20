// src/Pages/AboutUs.tsx
import Header from "../Components/Header";
import AliImage from "../assets/Ali.jpg";
import HasnainImage from "../assets/Hasnain.jpg";
import KabirImage from "../assets/Kabir.jpg";
import RamziImage from "../assets/Ramzi.jpg";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Ali",
      quote: "A smooth sea never made a skilled sailor",
      image: AliImage,
    },
    {
      name: "Hasnain",
      quote: "AI is definitely not replacing me",
      image: HasnainImage,
    },
    {
      name: "Ramzi",
      quote: "The only way to do great work is to love what you do.",
      image: RamziImage,
    },
    {
      name: "Kabir",
      quote: "In the midst of chaos, there is also opportunity",
      image: KabirImage,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-paleLavender to-mintWash animate-gradient flex flex-col">
      <Header />

      <main className="px-6 py-16 max-w-6xl mx-auto flex-grow">
        {/* 🟡 Hero Title */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-lg text-gray-600">
            One vision. Endless possibilities.
          </p>
        </section>

        {/* 🟣 Quotes from Us (with headshots) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#d4d8ec] shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-4 object-cover border border-gray-300"
              />
              <p className="italic text-gray-700 mb-4">“{member.quote}”</p>
              <p className="text-sm font-semibold text-gray-500">
                — {member.name}
              </p>
            </div>
          ))}
        </section>

        {/* 🟢 Connect Button */}
        <div className="flex justify-center">
          <a
            href="https://linktr.ee/MIGDevelopment"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Connect with Us
          </a>
        </div>

        {/* 🔵 Inspiration Section */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-semibold mb-4">
            Where We Get Our Inspiration
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We were inspired by the need to simplify complex financial research.
            Alfred.AI cuts through the clutter of dense documents, using AI to
            extract key information and present it in clear summaries and
            intuitive graphs. Our goal is to help users focus on the insights
            that truly matter.
          </p>
        </section>
      </main>

      {/* 🔻 Footer Notes */}
      <footer className="w-full text-center text-sm text-graySlate/70 py-6 bg-cloud">
        <p>&copy; {new Date().getFullYear()} Alfred.AI. All rights reserved.</p>
        <p className="mt-1">
          Questions?{" "}
          <a
            href="mailto:support@alfred.ai"
            className="text-plum hover:underline"
          >
            Contact us
          </a>
        </p>
        <p className="mt-1">
          Connect:{" "}
          <a
            href="https://linkedin.com/in/alfred-ai"
            target="_blank"
            className="text-plum hover:underline"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/alfred-ai"
            target="_blank"
            className="text-plum hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
