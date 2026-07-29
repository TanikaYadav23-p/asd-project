import React from 'react'
import { BsStars, BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";

const footerLinks = {
    Product: ["Features", "Pricing", "Use Cases", "Integrations", "API"],
    Company: ["About us", "Careers", "Blog", "Press", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Compliance"],
    Resources: ["Help Center", "Documentation", "Community", "Webinars", "Partners"],
  };

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16 pt-12 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-2">
              ASD Cargomate<sup className="text-xs">™</sup>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              AI-Powered Trade & Logistics Intelligence Platform
            </p>
            <div className="flex items-center gap-3">
              {[BsTwitterX, BsLinkedin, BsFacebook, BsInstagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={13} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
 
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
 
        <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            2026 ASD Cargomate . A product of ASD Logistics (MSME). All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer