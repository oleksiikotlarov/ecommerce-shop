import React from 'react'
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                        <Image
                            src="/empty-cart.jpg"
                            width={300}
                            height={300}
                            className="w-[300px] md:w-[400px]"
                        />
                        <span className="text-xl font-bold">
                            About
                        </span>
                        
                    </div>
  )
}

export default About