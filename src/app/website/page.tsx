"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Sparkles,
  Box,
  Shield,
  BarChart3,
  Settings,
  Gauge,
  Truck,
  Network,
  Award,
  Users,
} from "lucide-react";
import Footer from "@/components/footer/footer";
import { TeamProfile } from "@/components/ui/teamProfile";
import { AlumniProfile } from "@/components/ui/alumniProfile";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with animated background */}
      <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F1F1C] via-[#1a2f2a] to-[#0F1F1C]">
        {/* Animated dots background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-2 h-2 bg-white rounded-full animate-float" style={{ top: "10%", left: "20%" }} />
          <div className="absolute w-2 h-2 bg-white rounded-full animate-float-delay" style={{ top: "30%", left: "70%" }} />
          <div className="absolute w-2 h-2 bg-white rounded-full animate-float" style={{ top: "70%", left: "30%" }} />
          <div className="absolute w-2 h-2 bg-white rounded-full animate-float-delay" style={{ top: "50%", left: "80%" }} />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm mb-8">
              <Network className="w-4 h-4" />
              <span>Critical Infrastructure Engineering</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Compact Network Flows for{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                Critical Infrastructure
              </span>
            </h1>

            {/* <p className="max-w-4xl text-lg md:text-xl text-gray-300 mb-12"> */}
            <p className="mx-auto text-gray-200 sm:text-md md:text-lg text-left mb-12">
                Networks are ubiquitous. Every day our society relies on
                networks for energy, transportation, and communication. The
                design and operation of networks is a major concern that cuts
                across many engineering disciplines. The Compact Network Flows
                for Critical Infrastructure Engineering project leverages a new
                paradigm for the mathematical modeling of network flow to enable
                (1) the development of faster and more scalable algorithms for
                solving large, complex routing problems in transportation and
                (2) the design of resilient telecommunication networks that have
                the ability to continue to provide a high level of service even
                when critical components are damaged. If successful, this
                project will significantly improve our ability to design and
                operate critical infrastructure networks for logistics and
                communications. The new paradigm significantly reduces the
                number of variables and constraints in integer programming
                models for network optimization problems compared to the
                standard node-arc representation. This in turn can lead to
                faster solution algorithms. The goals of the project are to use
                the paradigm to develop (1) exact algorithms for inherently
                difficult network optimization problems that find provably
                optimal solutions in less time than existing methods, and (2)
                heuristics that quickly find solutions that are high-quality,
                but not necessarily optimal. <br />
                <br />
                This site is supported by the National Science Foundation CMMI
                division under&nbsp;
                <a
                  href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2227548&HistoricalAwards=false"
                  className="underline text-white pointer font-semibold"
                >
                  Award No. 2227548
                </a>
                .
              </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              
              <a
                href="#team"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Meet Our Team
                <Users className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="w-full py-24 bg-white relative overflow-hidden" id="about">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>About the Project</span>
            </div>
            
            <div className="max-w-4xl space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Networks are ubiquitous. Every day our society relies on networks for energy, 
                transportation, and communication. The design and operation of networks is a major 
                concern that cuts across many engineering disciplines.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                The Compact Network Flows for Critical Infrastructure Engineering project leverages 
                a new paradigm for the mathematical modeling of network flow to enable:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Transportation Optimization</h3>
                  <p className="text-gray-600">
                    Development of faster and more scalable algorithms for solving large, 
                    complex routing problems in transportation.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Network Resilience</h3>
                  <p className="text-gray-600">
                    Design of resilient telecommunication networks that maintain high service 
                    levels even when critical components are damaged.
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                The new paradigm significantly reduces the number of variables and constraints 
                in integer programming models for network optimization problems compared to the 
                standard node-arc representation. This in turn can lead to faster solution algorithms.
              </p>

              <div className="bg-emerald-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-emerald-700">NSF Support</h3>
                </div>
                <p className="text-gray-600">
                  This site is supported by the National Science Foundation CMMI division under{" "}
                  <a
                    href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2227548&HistoricalAwards=false"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Award No. 2227548
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="w-full py-24 bg-gray-50" id="team">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700 mb-4">
              <Users className="w-4 h-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1F1C] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate researchers behind this innovative project
            </p>
          </div>

          <TeamProfile />
          {/* <div className="flex justify-center mt-12">
            <Link
              href="/website/team"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors duration-300"
            >
              View Full Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div> */}

          <br></br>
          <br></br>
          <br></br>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1F1C] mb-4">
              Alumni
            </h2>
          </div>
          
          <AlumniProfile />

        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>

      <Footer />
    </div>
  );
}
