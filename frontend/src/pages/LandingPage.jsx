import React from "react";
import { Footer, NavBar } from "../components";
import { Link } from "react-router-dom";

function LandingPage() {
  document.title = "Jua Legal";
  return (
    <div className="w-screen  bg-gradient-to-b from-slate-500 to-slate-50">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Legal Assistant at Your Fingertips
          </h1>
          <p className="text-lg text-gray-100 mb-8">
            Empower yourself with free legal advice and guidance anytime,
            anywhere. Let our AI-driven chatbot assist you in resolving your
            legal questions.
          </p>
          <Link
            to="/home"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-200 transition duration-300"
          >
            Start Chatting with the Legal Bot
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Accessible Legal Advice
            </h2>
            <p className="text-gray-600">
              Get quick answers to common legal issues without the need for a
              lawyer, right from your phone.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              24/7 Support
            </h2>
            <p className="text-gray-600">
              Our chatbot is available 24/7 to help you navigate legal issues
              anytime, at your convenience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Easy to Use
            </h2>
            <p className="text-gray-600">
              Simply type your legal question and receive guidance instantly. No
              complicated forms or waiting times.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default LandingPage;
