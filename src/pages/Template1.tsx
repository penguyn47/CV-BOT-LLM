import React, { useState } from "react";

export default function CVTemplate1() {
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
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg">
                {currentPage === 1 ? (
                    <div className="flex flex-col md:flex-row">
                        {/* Left Column - Page 1 */}
                        <div className="md:w-2/3 p-8">
                            <h1 className="text-3xl font-bold text-[#2c5777] mb-4">JAMES STELE</h1>
                            <div className="border-t border-gray-300 mb-6"></div>

                            {/* Summary Statement */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">SUMMARY STATEMENT</h2>
                                <div className="border-t border-gray-300 mb-3"></div>
                                <p className="text-sm leading-relaxed">
                                    Technically sound application engineer effective in analyzing relevant information and guiding the
                                    product cycle from conception to completion. Manages design effort and guides installation process for
                                    on-schedule product launches. Consults with internal and external clientele, and employs additional
                                    system resources to review and enhance configuration for optimal customer satisfaction.
                                </p>
                            </div>

                            {/* Work Experience */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">WORK EXPERIENCE</h2>
                                <div className="border-t border-gray-300 mb-3"></div>

                                <div className="mb-4">
                                    <div className="font-semibold">Application Engineer, 08/2020 - Current</div>
                                    <div className="text-sm mb-2">Deluxe, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Demonstrate proposed design solutions by preparing and presenting CAD layouts for system concepts.
                                        </li>
                                        <li>
                                            Work with the Special Projects team and two external suppliers to prepare design specifications
                                            following project goals.
                                        </li>
                                        <li>
                                            Generate RFQ cost estimates, including peripheral equipment, FL materials, assembly labor and more.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Application Engineer, 03/2020 - 08/2020</div>
                                    <div className="text-sm mb-2">Tech USA, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Analyzed, designed, developed and tested robotics systems according to CAD drawings, written
                                            instructions and other specifications.
                                        </li>
                                        <li>
                                            Created written proposals outlining the precise scope of work and proposed engineering solutions,
                                            specific deliverables and operation descriptions.
                                        </li>
                                        <li>
                                            Consulted with and later supervised a larger 25-member engineering team to ensure I met the
                                            specified design criteria.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Field Application Engineer, 06/2012 - 05/2020</div>
                                    <div className="text-sm mb-2">Aerotek, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Fabricated, assembled and tested mechanical components exclusively for use in outdoor environments;
                                            presented modified CAD specs to mechanical engineers.
                                        </li>
                                        <li>
                                            Answered client and customer questions via phone and email; made in-person service calls providing
                                            further assistance.
                                        </li>
                                        <li>
                                            Reported on-site for final product delivery, and assisted with unboxing, setup and preliminary
                                            troubleshooting.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Research Experience */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">RESEARCH EXPERIENCE</h2>
                                <div className="border-t border-gray-300 mb-3"></div>

                                <div className="mb-4">
                                    <div className="font-semibold">Research Assistant – Application Performance Optimization</div>
                                    <div className="text-sm mb-2">University of California, Berkeley (2020-2021)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Developed algorithms to improve application response time by 20%.</li>
                                        <li>
                                            Published findings in <em>Journal of Software Engineering Research</em>.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Researcher – Cloud-Based Application Development</div>
                                    <div className="text-sm mb-2">Atlanta Tech Lab (2019-2020)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Conducted research on scalable cloud-native applications, resulting in a 30% reduction in deployment
                                            time.
                                        </li>
                                        <li>Presented findings at two international tech conferences.</li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Research Intern – Embedded Systems</div>
                                    <div className="text-sm mb-2">ABC Innovations (2018-2019)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Worked on low-level firmware optimization, improving system efficiency by 15%.</li>
                                        <li>Co-authored a research paper on embedded application performance.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Page 1 */}
                        <div className="md:w-1/3 bg-[#2c5777] text-white p-8">
                            {/* Contact Information */}
                            <div className="mb-8">
                                <div className="flex items-center mb-3">
                                    <MapPin />
                                    <span>Atlanta, GA 30301</span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <Phone />
                                    <span>(555) 555-5555</span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <Mail />
                                    <span>example@example.com</span>
                                </div>
                            </div>

                            {/* Core Qualifications */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">CORE QUALIFICATIONS</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Solutions development</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Virtualization technologies</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Software applications</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Database configuration</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Software platforms</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Solution mock-ups</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Database management</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Collaboration</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Education */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">EDUCATION</h2>
                                <div className="mb-4">
                                    <div className="font-semibold">Master of Science, Computer Science</div>
                                    <div>Georgia State University - Atlanta, GA</div>
                                </div>
                                <div>
                                    <div className="font-semibold">Bachelor of Science, Computer Science</div>
                                    <div>Georgia State University - Atlanta, GA</div>
                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">CERTIFICATIONS</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>AWS Certified Solutions Architect – Associate – Amazon Web Services</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Microsoft Certified: Azure Developer Associate – Microsoft</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Certified Kubernetes Application Developer (CKAD) – Cloud Native Computing Foundation</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Oracle Certified Java Programmer (OCJP) – Oracle</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Certified DevOps Engineer – Red Hat</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Training */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">TRAINING</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Advanced C++ for Software Development – Coursera</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Cloud-Native Application Development – Google Cloud Platform (GCP)</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Microservices Architecture and Design – Udemy</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>DevOps for Application Engineers – LinkedIn Learning</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Full-Stack Application Development – edX (offered by MIT)</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Affiliations */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">AFFILIATIONS</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Association of Information Technology Professionals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Association for Computing Machinery (ACM)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Institute of Electrical and Electronics Engineers (IEEE) – Computer Society</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        {/* Left Column - Page 2 */}
                        <div className="w-full md:w-2/3 p-8">
                            {/* Work Experience Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-700 mb-4">WORK EXPERIENCE</h2>
                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 className="font-bold">Field Application Engineer, 06/2012 - 05/2020</h3>
                                    </div>
                                    <p className="text-gray-600 italic mb-2">Aerotek, Atlanta, GA</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Consulted with and later supervised a larger 25-member engineering team to ensure I met the specified
                                            design criteria.
                                        </li>
                                        <li>
                                            Fabricated, assembled and tested mechanical components exclusively for use in outdoor environments;
                                            presented modified CAD specs to mechanical engineers.
                                        </li>
                                        <li>
                                            Answered client and customer questions via phone and email; made in-person service calls providing
                                            further assistance.
                                        </li>
                                        <li>
                                            Reported on-site for final product delivery, and assisted with unboxing, setup and preliminary
                                            troubleshooting.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Research Experience Section */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-700 mb-4">RESEARCH EXPERIENCE</h2>

                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 className="font-bold">Research Assistant – Application Performance Optimization</h3>
                                    </div>
                                    <p className="text-gray-600 italic mb-2">University of California, Berkeley (2020-2021)</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Developed algorithms to improve application response time by 20%.</li>
                                        <li>
                                            Published findings in <i>Journal of Software Engineering Research</i>.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 className="font-bold">Researcher – Cloud-Based Application Development</h3>
                                    </div>
                                    <p className="text-gray-600 italic mb-2">Atlanta Tech Lab (2019-2020)</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Conducted research on scalable cloud-native applications, resulting in a 30% reduction in deployment
                                            time.
                                        </li>
                                        <li>Presented findings at two international tech conferences.</li>
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 className="font-bold">Research Intern – Embedded Systems</h3>
                                    </div>
                                    <p className="text-gray-600 italic mb-2">ABC Innovations (2018-2019)</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Worked on low-level firmware optimization, improving system efficiency by 15%.</li>
                                        <li>Co-authored a research paper on embedded application performance.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Page 2 */}
                        <div className="w-full md:w-1/3 bg-[#2b5170] text-white p-8">
                            {/* Certifications Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold border-b border-white pb-2 mb-4">CERTIFICATIONS</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <p className="font-semibold">Microsoft Certified: Azure</p>
                                        <p className="text-sm">Solutions Associate – Microsoft</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Certified Kubernetes</p>
                                        <p className="text-sm">Application Developer (CKAD) –</p>
                                        <p className="text-sm">Cloud Native Computing Foundation</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Oracle Certified Java</p>
                                        <p className="text-sm">Programmer (OCJP) – Oracle</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Certified DevOps Engineer – Red Hat</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Training Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold border-b border-white pb-2 mb-4">TRAINING</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <p className="font-semibold">Advanced C++ for Software Development – Coursera</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Cloud-Native Application Development – Google Cloud Platform (GCP)</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Microservices Architecture and Design – Udemy</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">DevOps for Application Engineers – LinkedIn Learning</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Full-Stack Application Development – edX (offered by MIT)</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Affiliations Section */}
                            <div>
                                <h2 className="text-xl font-bold border-b border-white pb-2 mb-4">AFFILIATIONS</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <p className="font-semibold">Association of Information Technology Professionals</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Association for Computing Machinery (ACM)</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">
                                            Institute of Electrical and Electronics Engineers (IEEE) – Computer Society
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <div className="flex justify-center py-4">
                    <button
                        onClick={togglePage}
                        className="bg-[#2c5777] text-white px-6 py-2 rounded-md hover:bg-[#1e3a5f] transition-colors"
                    >
                        {currentPage === 1 ? "Go to Page 2" : "Go to Page 1"}
                    </button>
                </div>
            </div>
        </div>
    );
}