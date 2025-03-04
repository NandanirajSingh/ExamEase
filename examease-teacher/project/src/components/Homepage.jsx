import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, GraduationCap, BookOpen, ClipboardCheck, Award, 
  Users, Bell, UserCircle, Settings, FileSpreadsheet, MessageSquareWarning, 
  Youtube, Instagram, Check, ChevronDown, X, Send, FileQuestion, BellRing, 
  Calendar, BarChart3, PenTool, ShieldAlert, Video, Users2, FileText 
} from 'lucide-react';

function Homepage() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [question, setQuestion] = useState('');

  const banners = [
    {
      image: "https://www.iitms.co.in/online-examination-system/assets/img/online-examination-system-banner.webp",
      title: "Online Examination System",
      description: "ExamEase offers a secure, feature-rich platform for conducting semester exams, mock tests, entrance exams, and assessments. With advanced proctoring and user-friendly tools, it ensures a seamless experience for students and teachers."
    },
    {
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070",
      title: "Advanced Proctoring Solutions",
      description: "Our AI-powered proctoring system ensures exam integrity with real-time monitoring, suspicious activity detection, and comprehensive reporting tools."
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      title: "Seamless Assessment Experience",
      description: "Create, manage, and evaluate exams with ease. Our platform supports multiple question formats, automated grading, and detailed analytics for better insights."
    }
  ];

  const teacherResponsibilities = [
    {
      title: "Exam Creation & Management",
      icon: <ClipboardCheck size={40} />,
      description: "Design and schedule exams with multiple question formats, set time limits, and manage exam settings.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070"
    },
    {
      title: "Student Assessment",
      icon: <Award size={40} />,
      description: "Grade assignments, provide feedback, and track student progress through comprehensive analytics.",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070"
    },
    {
      title: "Proctoring & Monitoring",
      icon: <Users size={40} />,
      description: "Monitor exams in real-time, detect suspicious behavior, and ensure exam integrity.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
    },
    {
      title: "Result Analytics",
      icon: <FileSpreadsheet size={40} />,
      description: "Generate detailed reports and analyze student performance with comprehensive analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
    },
    {
      title: "Notification System",
      icon: <MessageSquareWarning size={40} />,
      description: "Send automated notifications for exam schedules, results, and important updates",
      image: "https://plus.unsplash.com/premium_photo-1682309567426-5517a398b4dd?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const faqs = [
    {
      question: "How does ExamEase prevent cheating during exams?",
      answer: "ExamEase includes video and microphone monitoring, tab restriction (students cannot switch tabs), and other security measures to maintain exam integrity. Teachers can review recorded proctoring sessions to detect any suspicious activity."
    },
    {
      question: "What types of exams can be conducted on ExamEase?",
      answer: "Teachers can create Unit tests, Semester exams, and Class tests with different question formats, including MCQs, short-answer, and long-answer questions. Objective-type questions are auto-evaluated, while subjective answers are manually reviewed by teachers."
    },
    {
      question: "Can students edit their answers after submitting them?",
      answer: "No, once a student submits their answers, they cannot edit them. This ensures fairness and prevents tampering with responses after submission."
    },
    {
      question: "How are long-answer responses handled?",
      answer: "Students write their responses on the platform, which are automatically converted into PDFs. These PDFs are then made available to teachers for evaluation."
    },
    {
      question: "Will students be notified about their exams and results?",
      answer: "Yes, ExamEase has a notification system that alerts students about exam schedules, reminders, and result publications. Notifications are sent in advance to ensure students stay informed."
    },
    {
      question: "Is ExamEase suitable for all types of educational institutions?",
      answer: "Yes, ExamEase is designed to be scalable and can be used by schools, colleges, universities, and training institutes to conduct online exams efficiently."
    }
  ];

  const handleSubmitQuestion = () => {
    alert('Thank you for your question! We will get back to you soon.');
    setQuestion('');
    setShowAskQuestion(false);
  };

  // Preload images to improve page transitions
  useEffect(() => {
    // Preload banner images
    banners.forEach(banner => {
      const img = new Image();
      img.src = banner.image;
    });
    
    // Preload responsibility images
    teacherResponsibilities.forEach(resp => {
      const img = new Image();
      img.src = resp.image;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Optimized navigation function to improve performance
  const handleNavigation = (path) => {
    // Add a small visual feedback before navigation
    document.body.style.opacity = '0.9';
    setTimeout(() => {
      navigate(path);
      document.body.style.opacity = '1';
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <nav className="bg-[#122064] h-[70px] sticky top-0 z-50">
          <div className="container mx-auto px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo and brand name on the left */}
              <div className="flex items-center gap-3">
                <GraduationCap size={40} className="text-white" />
                <span className="text-white text-2xl font-extrabold tracking-wide">ExamEase</span>
              </div>

              {/* Navigation items on the right */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-8">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Create Exam', path: '/create-exam' },
                    { label: 'Results', path: '/results' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.path)}
                      className="text-white font-bold text-lg hover:text-blue-200 transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleNavigation('/notifications')}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <Bell size={24} />
                  </button>

                  <button 
                    onClick={() => handleNavigation('/settings')}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <Settings size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentBanner === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(37, 37, 37, 0.7), rgba(255, 255, 255, 0.1)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-bold mb-4">{banner.title}</h1>
                <p className="text-xl leading-relaxed">{banner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="py-16">
        <div className="container mx-auto px-24">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#122064] ">
            Features of ExamEase - Online Exam Software
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Customisable Question Formats", icon: <FileQuestion size={40} className="text-[#122064] "  /> },
              { title: "Real-Time Notifications System", icon: <BellRing size={40} className="text-[#122064]" /> },
              { title: "Flexible Exam Scheduling Tools", icon: <Calendar size={40} className="text-[#122064]" /> },
              { title: "Automated Evaluation and Reporting", icon: <BarChart3 size={40} className="text-[#122064]" /> },
              { title: "Intuitive Answer Writing Platform", icon: <PenTool size={40} className="text-[#122064]" /> },
              { title: "Advanced Anti-Cheating Mechanisms", icon: <ShieldAlert size={40} className="text-[#122064]" /> },
              { title: "Live Video and Audio Monitoring", icon: <Video size={40} className="text-[#122064]" /> },
              { title: "Comprehensive User Management", icon: <Users2 size={40} className="text-[#122064]" /> },
              { title: "Automated Answer-to-PDF Conversion", icon: <FileText size={40} className="text-[#122064]" /> },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#ECF9FF] relative overflow-hidden rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:translate-y-2 hover:shadow-2xl hover:rotate-1 shadow-lg flex flex-col items-center gap-4"
              >
                {feature.icon}
                <p className="text-center text-lg font-semibold text-[#122064]">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-24">
          <h2 className="text-3xl font-bold text-center text-[#122064] mb-12">
            What can Teachers Do on ExamEase
          </h2>
          
          <div className="grid grid-cols-3 gap-8">
            {teacherResponsibilities.map((responsibility, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  index === 3 ? "col-span-1 col-start-1 translate-x-1/2" : ""
                } ${
                  index === 4 ? "col-span-1 col-start-2 translate-x-1/2" : ""
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={responsibility.image} 
                    alt={responsibility.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-blue-600">
                      {responsibility.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#122064]">{responsibility.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{responsibility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-24">
          <h2 className="text-3xl font-bold text-center text-[#122064] mb-12">
            How ExamEase Combat Methods of Cheating in Online Exams
          </h2>
          <div className="relative">
            <div className="flex justify-center mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                "Verify student's identity",
                "Use different question types",
                "Create questions that require higher-order thinking",
                "Disable other applications and browsers during exams",
                "Give shuffled questions to every student",
                "Monitor students via video and audio throughout the exam"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  {/* Working Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-28">
          <h2 className="text-3xl font-bold text-center text-[#122064] mb-12">How Online Examination System Works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Pre-Exam',
                image: 'https://www.iitms.co.in/online-examination-system/assets/img/Pre-Exams.webp',
                items: [
                  'Create Exam Schedules and Assign Proctors',
                  'Manage Student Credentials',
                  'Upload Question Papers with Various Question Formats',
                  'Set Up Security Features for Preventing Cheating'
                ]
              },
              {
                title: 'During Exam',
                image: 'https://www.iitms.co.in/online-examination-system/assets/img/During-Exams.webp',
                items: [
                  'Real-Time Proctoring with Video Monitoring',
                  'Secure Answer Sheet Submission',
                  'Monitoring for Cheating Detection',
                  'Continuous Monitoring via Webcam and Microphone'
                ]
              },
              {
                title: 'Post-Exam',
                image: 'https://www.iitms.co.in/online-examination-system/assets/img/Post-Exam.webp',
                items: [
                  'Automated Evaluation and Grading',
                  'Generate Detailed Results and Reports',
                  'Analyze Student Performance',
                  'Notify Students with the Notification Feature'
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={phase.image} alt={phase.title} className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-center text-[#122064] mb-6">{phase.title}</h3>
                <ul className="space-y-4">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Why Choose ExamEase Section */}
      <section id="about-us" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#122064] mb-12">Why Choose ExamEase?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-8 text-center">
                Welcome to ExamEase, your next-generation online exam conducting application designed to make digital assessments seamless, secure, and efficient. We understand the challenges of conducting online exams, from ensuring academic integrity to providing a user-friendly platform for students and teachers alike. ExamEase is built to address these challenges with advanced features that redefine online examinations.
              </p>

              <div className="bg-[#EAF9FF] text-[#122064] p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p>
                  To revolutionise the online examination process by integrating enhanced proctoring, automated answer submission, and real-time monitoring, ensuring a smooth and fair evaluation for every student.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#122064] mb-4">Our Commitment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Academic Integrity",
                      description: "Our system includes video proctoring and tab restriction to maintain exam fairness."
                    },
                    {
                      title: "Seamless User Experience",
                      description: "A well-designed, intuitive interface for both teachers and students."
                    },
                    {
                      title: "Automation & Efficiency",
                      description: "Features like automated PDF conversion and instant MCQ evaluation reduce manual workload."
                    },
                    {
                      title: "Security & Reliability",
                      description: "A robust system that ensures exams are conducted smoothly without disruptions."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-bold text-[#122064] mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#122064] mb-4">Empowering Digital Education</h3>
                <p className="text-gray-700">
                  With education rapidly shifting towards digital platforms, ExamEase empowers institutions with a reliable, scalable, and future-ready solution for conducting exams. Whether for unit tests, semester exams, or class assessments, our platform ensures a hassle-free experience.
                </p>
                <p className="text-[#122064] font-bold mt-4">
                  Join us in shaping the future of online examinations with ExamEase!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#122064] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#EAF9FF] rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-[#122064]">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 py-4 bg-gray-50 transition-all duration-300 ${
                    openFaq === index ? 'block' : 'hidden'
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAskQuestion(true)}
              className="bg-[#122064] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d8a] transition-colors duration-300"
            >
              Ask a Question
            </button>
          </div>
        </div>
      </section>

      {showAskQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAskQuestion(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-[#122064] mb-6">Ask a Question</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#122064] focus:border-transparent resize-none"
            />
            <button
              onClick={handleSubmitQuestion}
              className="mt-4 bg-[#122064] text-white px-6 py-2 rounded-lg hover:bg-[#1a2d8a] transition-colors duration-300 flex items-center gap-2"
            >
              <Send size={20} />
              Send Question
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#122064] text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={40} className="text-[#122064] bg-white p-2 rounded-full" />
                <span className="text-2xl font-bold">ExamEase</span>
              </div>
              <p className="text-gray-300 mb-6">
                Revolutionizing online examination with secure, efficient, and user-friendly solutions.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Dashboard', 'Create Exam', 'Results', 'Profile'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleNavigation(link === 'Home' ? '/' : `/${link.toLowerCase()}`)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#about-us" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Connect With Us</h4>
              <div className="flex gap-6">
                {[
                  { icon: <Mail size={24} />, href: "#" },
                  { icon: <Phone size={24} />, href: "#" },
                  { icon: <Instagram size={24} />, href: "#" },
                  { icon: <Youtube size={24} />, href: "#" },
                ].map((social, index) => (
                  <a key={index} href={social.href} className="text-white bg-[#1E2A5A] p-3 rounded-full hover:bg-white hover:text-[#122064] transition">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} ExamEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;