import { Github, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="bg-[#1e1f24] px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/">
            <h2 className="font-extrabold text-3xl whitespace-nowrap text-[#8b5cf6] hover:text-[#7c3aed] transition-colors">
              Crowd<span className="text-5xl text-white">X</span>
            </h2>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-zinc-300 mb-6">
          <Link
            href="/"
            className="transition-colors"
          >
            Home
          </Link>
          <a
            href="https://github.com/Smitbhuva15/CrowdX"
            target="_blank"
            rel="noopener noreferrer"
            className=" transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/info"
            className="transition-colors"
          >
            About 
          </Link>
        </div>

        {/* Bottom Row */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center  pt-4 gap-4 sm:w-[90%] sm:mx-auto" >
            <p className="text-sm text-zinc-400 text-center sm:text-left">
              Designed & Developed by <span className="font-semibold">Smit Bhuva</span>
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Smitbhuva15"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/smit-bhuva-1007ba314/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Link
                href={'/'}
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
