import React from "react";
import { Footer, NavBar } from "../components";

function About() {
  document.title = "Jua Legal - About";
  return (
    <div className="bg-gradient-to-b from-slate-500 to-slate-600 h-scree w-screen">
      <NavBar />
      <div className="min-h-screen ">
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            About
          </h1>
          <p className="text-lg text-gray-100 leading-relaxed text-center mb-8">
            Our Legal Assistant Chatbot provides free, easy-to-use legal advice
            and support, especially for underserved communities. The bot is
            designed to make legal assistance accessible to everyone by
            providing instant answers to common legal questions and guidance on
            various legal issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-200 leading-relaxed">
                We aim to bridge the legal knowledge gap by making accurate
                legal information accessible to marginalized communities in
                Africa. Our chatbot empowers users to understand their rights,
                seek justice, and navigate legal issues without barriers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                How It Works
              </h2>
              <p className="text-gray-200 leading-relaxed">
                The Jua Legal uses advanced AI to answer legal
                questions related to employment rights, family law, criminal
                law, and more. It’s available 24/7 on your mobile device,
                offering easy and timely advice on-the-go.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
