import React from "react";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Skills from "../Components/Skills";
import Experience from '../Components/Experience';
import Projects from "../Components/project";

export default function Home(){
    return (
        <div >
        
    
        <main className="container mx-auto px-6 py-12">
           <div>
            <Hero />

           </div>
            <div >
                  <About />
            </div>
            <div>
                <Skills />
            </div>
            <div>
                <Experience />
            </div>
            <div>
                <Projects />
            </div>
        </main>
    
     
        </div>
    );
}