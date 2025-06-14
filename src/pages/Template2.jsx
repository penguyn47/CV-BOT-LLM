import React, { useState } from "react";

export default function CVTemplate() {
    const [currentPage, setCurrentPage] = useState(1);

    const togglePage = () => {
        setCurrentPage(currentPage === 1 ? 2 : 1);
    };

    // SVG icons as inline components to replace Lucide React imports
    const MapPin = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );

    const Phone = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
        >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
    );

    const Mail = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );

    return (
        <>
            {/* Import Poppins font via Google Fonts */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
            <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white shadow-lg print:shadow-none">
                    {currentPage === 1 ? (
                        <div className="flex flex-col md:flex-row w-full">
                            {/* Left Column - Page 1 */}
                            <div className="w-full md:w-1/3 bg-slate-400 p-6 text-slate-800">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-bold uppercase">Jackie</h1>
                                    <h1 className="text-4xl font-bold uppercase">Duran</h1>
                                    <div className="border-t-2 border-slate-600 w-12 mt-2"></div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <div className="flex items-center gap-2">
                                        <Mail />
                                        <span>example@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone />
                                        <span>555-555-5555</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin />
                                        <span>Phoenix, Arizona 85018</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Education</h2>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Arizona State University</h3>
                                        <p>Tempe, AZ</p>
                                        <p className="italic">Master of Science: Industrial Engineering</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Arizona State University</h3>
                                        <p>Tempe, AZ</p>
                                        <p className="italic">Bachelor of Science: Manufacturing Engineering</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Licenses</h2>
                                    <ul className="list-disc pl-5">
                                        <li>Professional Engineer (PE) Licensure - (2023)</li>
                                        <li>GeoSpatial and BIM</li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Teaching Experience</h2>
                                    <div>
                                        <h3 className="font-semibold">Graduate Teaching Assistant, Industrial Engineering</h3>
                                        <p>Arizona State University, Tempe, AZ, 2020-2021</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Research Experience</h2>
                                    <div>
                                        <h3 className="font-semibold">"Optimizing CAD Processes for Industrial Applications"</h3>
                                        <p>Research conducted in collaboration with Arizona State University's Engineering Department, 2021</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold uppercase mb-2">Work Experience</h2>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Quest Global - Design Engineer</h3>
                                        <p>Phoenix, AZ - 12/2021 - Current</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">ASM International - Manufacturing Engineer Assistant</h3>
                                        <p>Phoenix, AZ - 06/2021 - 11/2021</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Page 1 */}
                            <div className="w-full md:w-2/3 bg-gray-50 p-6">
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Summary Statement</h2>
                                    <p>
                                        Design engineer experienced in CAD modeling and product development. Collaborative team player with a proven
                                        track record of delivering multiple, concurrent projects in fast-paced environments. Drives production
                                        efficiency through qualitative analysis and process redesign.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Core Qualifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                        <ul className="list-disc pl-5">
                                            <li>Quality control</li>
                                            <li>3D Modeling</li>
                                            <li>Rapid prototyping</li>
                                            <li>Process engineering</li>
                                        </ul>
                                        <ul className="list-disc pl-5">
                                            <li>Creative thinking</li>
                                            <li>Reading and interpreting blueprints</li>
                                            <li>Stress analysis</li>
                                            <li>Quality control management</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Summary of Qualifications</h2>
                                    <ul className="list-disc pl-5">
                                        <li>
                                            Ability to successfully address design challenges and evaluate alternative design models to meet project
                                            requirements.
                                        </li>
                                        <li>Adept at collaborating with cross-functional teams to conceptualize and fine-tune product concepts.</li>
                                        <li>Resourceful and well-organized with excellent leadership and team building skills.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold uppercase mb-2">Professional Skills</h2>

                                    <div className="mb-4">
                                        <h3 className="font-semibold">Design</h3>
                                        <ul className="list-disc pl-5">
                                            <li>
                                                Translated concepts into user flows, wireframes, mock ups and prototypes to promote positive
                                                interactions, site maps, interactions and user experiences.
                                            </li>
                                            <li>
                                                Participated in design and manufacturing engineering and other functions to reduce 20% of the time
                                                required to bring five products to market.
                                            </li>
                                            <li>
                                                Participated in pre-project analysis and technical assessments to develop correct functionality to meet
                                                business objectives.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="font-semibold">Project Management</h3>
                                        <ul className="list-disc pl-5">
                                            <li>
                                                Defined and conducted design processes at all stages, including research, conceptualization, testing and
                                                implementation of five projects.
                                            </li>
                                            <li>
                                                Determined job priorities for multiple projects and communicated sequencing, priorities and timelines to
                                                a team of 15.
                                            </li>
                                            <li>Directed documentation detailing design requirements and technical specifications.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">Manufacturing Process</h3>
                                        <ul className="list-disc pl-5">
                                            <li>Worked closely with three engineers and assisted them with product testing.</li>
                                            <li>Supported the design of documents and proposal.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row w-full">
                            {/* Left Column - Page 2 */}
                            <div className="w-full md:w-1/3 bg-slate-400 p-6 print:p-4">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-lg">CyberCoders · Design Intern</h2>
                                        <p className="text-slate-600">Phoenix, AZ · 09/2017 - 06/2018</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Page 2 */}
                            <div className="w-full md:w-2/3 p-6 print:p-4">
                                <div className="space-y-6">
                                    {/* Work Experience Details */}
                                    <div>
                                        <ul className="list-disc ml-5 space-y-2 text-slate-700">
                                            <li>
                                                Collaborated with engineering teams on design statements, lead times, technical costs, budgets and
                                                work statements to manage supplier development efforts.
                                            </li>
                                            <li>Reviewed products for compliance with Design for Manufacturing (DFM) requirements.</li>
                                        </ul>
                                    </div>

                                    {/* Publications */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Publications</h2>
                                        <p className="text-slate-700">
                                            Duran, Jackie. "Innovative Approaches to Streamlining Design-to-Production Pipelines."{" "}
                                            <span className="italic">Journal of Manufacturing Engineering</span>, vol. 28, no. 3, 2022, pp. 87-99.
                                        </p>
                                    </div>

                                    {/* Conference Presentations */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Conference Presentations
                                        </h2>
                                        <p className="text-slate-700">
                                            "Advancing Rapid Prototyping Techniques," presented at the 2022 International Conference on
                                            Manufacturing Innovation, San Diego, CA.
                                        </p>
                                    </div>

                                    {/* Conference Attendance */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Conference Attendance
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>International Conference on Manufacturing Innovation, 2022</li>
                                            <li>CAD and Prototyping Expo, 2021</li>
                                        </ul>
                                    </div>

                                    {/* Grants or Funding */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Grants or Funding
                                        </h2>
                                        <p className="text-slate-700">
                                            Awarded $15K for research on stress analysis in rapid prototyping, Arizona State University, 2021
                                        </p>
                                    </div>

                                    {/* Honors and Awards */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Honors and Awards
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Engineer of the Year, Quest Global, 2023</li>
                                            <li>Excellence in Manufacturing Processes, ASM International, 2020</li>
                                        </ul>
                                    </div>

                                    {/* Professional Affiliations */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Professional Affiliations and Memberships
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Member, American Society of Mechanical Engineers (ASME)</li>
                                            <li>Member, Society of Manufacturing Engineers (SME)</li>
                                        </ul>
                                    </div>

                                    {/* Training */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Training</h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Advanced CAD Modeling Workshop, Quest Global, 2022</li>
                                            <li>Leadership in Engineering Program, ASM International, 2021</li>
                                        </ul>
                                    </div>

                                    {/* Community Outreach */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Community Outreach
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Volunteer mentor for aspiring engineers, Arizona STEM Outreach Program, 2019-Present</li>
                                            <li>Organizer of workshops for high school students on CAD modeling and prototyping</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Toggle Button */}
                    <div className="flex justify-center py-4">
                        <button
                            onClick={togglePage}
                            className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
                        >
                            {currentPage === 1 ? "Go to Page 2" : "Go to Page 1"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}