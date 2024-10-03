import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">Jua Legal</h2>
            <p className="mt-2 text-gray-400">
              Empowering Access to Legal Advice.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="#" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        {/* Contact & Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; 2024 Jua Legal. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300"
            >
              support@legalbot.com
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
