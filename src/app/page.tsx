'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Zap, Target, Users, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface Star {
  left: string;
  top: string;
  size: number;
  animationDuration: string;
}

const AnimatedSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    amount: 0.5,
    once: false
  })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex items-center ${className}`}
    >
      {children}
    </motion.section>
  )
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([])
  const { scrollY } = useScroll()

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 300; i++) {
        newStars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 0.5,
          animationDuration: `${Math.random() * 3 + 2}s`,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  const y = useTransform(scrollY, [0, 500], [0, 50])  // Adjust these values to control parallax intensity

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ y }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${star.animationDuration} infinite alternate`,
          }}
        />
      ))}
    </motion.div>
  )
}
/*

interface NoiseBlobProps {
  top: number;
  left: number;
  size: number;
  color: string;
}

const NoiseBlob = ({ top, left, size, color }: NoiseBlobProps) => (
  <div
    className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    }}
  />
)
*/

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up")
  const [prevOffset, setPrevOffset] = useState(0)
  const [isHeaderClicked, setIsHeaderClicked] = useState(false)

  const toggleScrollDirection = () => {
    const scrollY = window.pageYOffset
    if (scrollY > prevOffset) {
      setScrollDirection("down")
    } else if (scrollY < prevOffset) {
      setScrollDirection("up")
    }
    setPrevOffset(scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleScrollDirection)
    return () => {
      window.removeEventListener("scroll", toggleScrollDirection)
    }
  }, [prevOffset])

  return { scrollDirection, isHeaderClicked, setIsHeaderClicked }
}

export default function LandingPage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const { scrollDirection, isHeaderClicked, setIsHeaderClicked } = useScrollDirection()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <StarryBackground />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 lg:px-6 transition-all duration-300 ${
          scrollDirection === "up" || isHeaderClicked ? "translate-y-0 backdrop-blur-md bg-gray-900/30" : "-translate-y-full"
        }`}
        onClick={() => setIsHeaderClicked(true)}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <Rocket className="h-8 w-8 text-orange-500 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              Startdom Studios
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {["About", "Services", "Team", "Contact"].map((item) => (
              <Link
                key={item}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <motion.section
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
          >
            Launch Your Success with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              Startdom Studios
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
          >
            Empowering dreams and igniting innovation, one success story at a time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg py-6 px-8">
              Start Your Journey
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-lg py-6 px-8">
              Explore Services
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <AnimatedSection className="relative py-20 text-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                About Us
              </h2>
              <p className="text-lg mb-6">
                At Startdom Studios, we&apos;re not just consultants – we&apos;re your partners in success. With a passion for
                innovation and a commitment to excellence, we help turn your boldest aspirations into remarkable
                achievements.
              </p>
              <p className="text-lg">
                Our unique approach combines cutting-edge strategies with personalized guidance, ensuring that every
                client receives the tailored support they need to thrive in today&apos;s dynamic business landscape.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl transform rotate-3"></div>
              <img
                src="/team.gif"
                alt="Team collaboration"
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="services" className="relative py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Business Strategy", description: "Develop winning strategies to propel your business forward." },
              { icon: Target, title: "Performance Optimization", description: "Streamline operations and maximize efficiency." },
              { icon: Users, title: "Leadership Development", description: "Cultivate strong leaders to drive success at every level." }
            ].map((service, index) => (
              <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-none hover:bg-gray-700/50 transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="team" className="relative py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-12 bg-clip-text text-center text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Kamala Harris", role: "Strategy Expert", image: "/person1.gif" },
              { name: "Donald Trump", role: "Performance Guru", image: "/person2.gif" },
              { name: "Taylor Swift", role: "Leadership Coach", image: "/person3.gif" }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform group-hover:scale-105 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-300">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="relative py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <p className="text-lg">
                We&apos;d love to hear from you! Whether you have a question about our services or want to start your
                journey to success, our team is ready to help.
              </p>
              {[
                { icon: Mail, text: "hello@startdomstudios.com" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: MapPin, text: "123 Success Street, Enterprise City, 12345" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <item.icon className="h-5 w-5 text-orange-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Your Name" className="bg-gray-700/50 border-gray-600 text-white rounded-1g" />
                  <Input type="email" placeholder="Your Email" className="bg-gray-700/50 border-gray-600 text-white rounded-lg" />
                  <Textarea placeholder="Your Message" className="bg-gray-700/50 border-gray-600 text-white rounded-lg" />
                  <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Footer */}
          <footer className="relative py-6 text-white border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <Link href="#" className="flex items-center">
                    <Rocket className="h-6 w-6 text-orange-500 mr-2" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                      Startdom Studios
                    </span>
                  </Link>
                  <p className="mt-2 text-sm text-gray-400">Empowering success, one start at a time.</p>
                </div>
                <div className="flex space-x-4">
                  <Link className="text-sm hover:text-orange-500 transition-colors" href="#">
                    Terms of Service
                  </Link>
                  <Link className="text-sm hover:text-orange-500 transition-colors" href="#">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-400">
                © 2024 Startdom Studios. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </AnimatedSection>
    </div>
  )
}