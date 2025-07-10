// src/components/AboutSection.jsx
import React from 'react';
import malikiImage from '../assets/maliki.jpg'; // Adjust the path as necessary
function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          About <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* About image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute -inset-4 bg-primary-500 rounded-2xl -rotate-6"></div>
              <img
                src={malikiImage}
                alt="Maliki Djandjieme"
                className="relative w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* About content */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              I'm a passionate geotechnical engineer with a focus on creating
              sustainable solutions in infrastructure and urban development. I
              specialize in geotechnical analysis, geo-environmental solutions, and
              urban infrastructure innovations.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              With a background in geotechnical engineering and a PhD in the field, I
              have extensive experience in designing and implementing innovative and
              sustainable infrastructure projects. I believe in using cutting-edge
              technologies and approaches to create resilient, eco-friendly solutions.
            </p>

            {/* Values */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">My Values</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Clean Code
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  User Experience
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Accessibility
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Continuous Learning
                </span>
              </div>
            </div>

            {/* Download CV button */}
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Download CV
              <i className="fas fa-download ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
