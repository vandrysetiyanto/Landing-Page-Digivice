document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Animations (Existing Logic) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Special handling for workflow steps and arrows to animate sequentially
                if (entry.target.classList.contains('step') || entry.target.classList.contains('step-arrow')) {
                    // No unobserve here, as we want to manage delay via CSS transition-delay
                } else {
                     // Testimonial slider container is handled by its own JS, so don't unobserve immediately
                     if (!entry.target.classList.contains('testimonial-slider-container')) {
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                }
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .btn-primary.scale-in, ' +
        '#stats .stat-item, #stats .customer-logos, ' +
        '#services h2, .service-item, ' + // .service-item now has delay classes
        '#about h2, #about p, ' +
        '#vision-mission h2, .vision-box, .mission-box, ' +
        '#workflow h2, .workflow-infographic .step, .workflow-infographic .step-arrow, ' + // Specific workflow elements
        '#faq h2, .faq-accordion, ' +
        '#testimonials h2, .testimonial-slider-container, ' + // Observe the container for fade-in
        '#demo-form h2, #demo-form p, .contact-form'
    );

    elementsToAnimate.forEach(el => observer.observe(el));

    // FAQ Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            // Close all other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                    otherHeader.querySelector('.icon').textContent = '+';
                    otherHeader.querySelector('.icon').classList.remove('active');
                }
            });

            // Toggle current accordion
            header.classList.toggle('active');
            icon.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = 'x'; // Change to 'x' when open
            }
        });
    });

        // --- Testimonial Slider Functionality ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.querySelector('.testimonial-slider-container .prev');
    const nextButton = document.querySelector('.testimonial-slider-container .next');
    const scrollAmount = 380; // Adjust based on testimonial-item width + gap (350px + 30px)

    if (testimonialSlider && prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Hide/show arrows if at start/end
        testimonialSlider.addEventListener('scroll', () => {
            // Give a small tolerance for floating point numbers
            const isAtStart = testimonialSlider.scrollLeft < 10;
            const isAtEnd = (testimonialSlider.scrollLeft + testimonialSlider.clientWidth) >= (testimonialSlider.scrollWidth - 10);

            prevButton.style.display = isAtStart ? 'none' : 'block';
            nextButton.style.display = isAtEnd ? 'none' : 'block';
        });

        // Initial check on load
        testimonialSlider.dispatchEvent(new Event('scroll'));
    }

    // --- Multi-language Functionality ---
    const translations = {
        id: {
            pageTitle: "PT Digi Vice Indonesia - Konsultan IT Bisnis ERP",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Beranda",
            navServices: "Layanan",
            navAbout: "Tentang Kami",
            navVisionMission: "Visi & Misi",
            navWorkflow: "Alur Kerja",
            navFaq: "FAQ",
            navTestimonials: "Testimoni",
            navContact: "Kontak",
            heroTitle: "Optimalkan Bisnis Anda dengan Solusi ERP Terkemuka",
            heroSubtitle: "PT Digi Vice Indonesia adalah konsultan IT terpercaya yang membantu perusahaan Anda mencapai efisiensi maksimal melalui implementasi sistem ERP yang tepat.",
            heroButton: "Coba Demo Sekarang",
            statCustomers: "Pelanggan Puas",
            statProjects: "Proyek IT Selesai",
            statExperience: "Tahun Pengalaman",
            trustedBy: "Dipercaya oleh Perusahaan Terkemuka:",
            servicesTitle: "Layanan Unggulan Kami",
            serviceSalesPartnerTitle: "Sales Partner",
            serviceSalesPartnerDesc: "Bertindak sebagai mitra penjualan untuk produk atau solusi teknologi tertentu dari pengembang lain.",
            serviceConsultantTitle: "Konsultan/Solusi Integrasi",
            serviceConsultantDesc: "Menganalisis kebutuhan bisnis dan merekomendasikan solusi teknologi yang terintegrasi secara mulus.",
            serviceImplementationTitle: "Jasa Implementasi & Kustomisasi",
            serviceImplementationDesc: "Pemasangan, konfigurasi, dan penyesuaian sistem atau perangkat lunak sesuai kebutuhan spesifik perusahaan Anda.",
            serviceSupportTrainingTitle: "Support Training ERP",
            serviceSupportTrainingDesc: "Pelatihan komprehensif dan dukungan purna jual untuk memastikan tim Anda mahir menggunakan sistem ERP.",
            serviceLandingPageTitle: "Pembuatan Landing Page Company Profile",
            serviceLandingPageDesc: "Membantu Anda membuat halaman arahan (landing page) profesional dan menarik untuk profil perusahaan Anda.",
            serviceInfrastructureTitle: "Jasa Infrastruktur (Hosting, Cloud, Domain, dll)",
            serviceInfrastructureDesc: "Menyediakan berbagai layanan terkait infrastruktur teknologi untuk fondasi bisnis yang kuat dan handal.",
            aboutTitle: "Tentang Kami",
            aboutDesc: "PT Digi Vice Indonesia berdedikasi untuk memberdayakan bisnis dengan teknologi mutakhir. Dengan tim ahli yang berpengalaman, kami berkomitmen untuk memberikan solusi IT yang inovatif dan transformatif, memungkinkan klien kami untuk berkembang di era digital.",
            visionMissionTitle: "Visi & Misi",
            visionTitle: "Visi",
            visionDesc: "Menjadi konsultan independen ERP terpercaya yang mendampingi pemilik bisnis dalam merancang solusi dan alur kerja digital yang efektif, efisien, dan berkelanjutan.",
            missionTitle: "Misi",
            mission1: "Memberikan layanan konsultasi ERP yang objektif dan independen, tanpa terikat vendor, agar pemilik bisnis mendapatkan solusi terbaik sesuai kebutuhan.",
            mission2: "Menganalisis proses bisnis secara menyeluruh, untuk merancang alur kerja yang tepat sebelum memilih dan mengimplementasikan sistem digital.",
            mission3: "Mendampingi proses transformasi digital mulai dari perencanaan, pemilihan sistem, implementasi, hingga optimalisasi.",
            mission4: "Meningkatkan pemahaman bisnis owner dan timnya terhadap pentingnya efisiensi operasional dan pengambilan keputusan berbasis data.",
            mission5: "Menjaga integritas, profesionalisme, dan keberpihakan pada kepentingan klien, dengan pendekatan yang transparan, strategis, dan berdampak jangka panjang.",
            mission6: "Memberikan edukasi dan pelatihan digital bagi SDM perusahaan agar siap menghadapi perubahan era industri 4.0",
            workflowTitle: "Alur Kerja Kami Sebelum Memilih Sistem ERP",
            workflowStep1Title: "Analisis Kebutuhan Bisnis",
            workflowStep1Desc: "Identifikasi masalah, tujuan, dan proses bisnis inti yang akan didukung ERP.",
            workflowStep2Title: "Pemetaan Proses (As-Is & To-Be)",
            workflowStep2Desc: "Dokumentasi alur kerja saat ini dan perancangan alur kerja yang lebih optimal dengan ERP.",
            workflowStep3Title: "Penyusunan Kebutuhan Teknis & Fungsional",
            workflowStep3Desc: "Spesifikasi fitur, integrasi, dan persyaratan teknis yang diperlukan dari sistem ERP.",
            workflowStep4Title: "Seleksi Vendor & Solusi",
            workflowStep4Desc: "Evaluasi berbagai opsi ERP dan vendor berdasarkan kebutuhan dan anggaran yang telah ditetapkan.",
            workflowStep5Title: "Implementasi & Optimalisasi",
            workflowStep5Desc: "Proses instalasi, konfigurasi, migrasi data, pelatihan, hingga go-live dan dukungan berkelanjutan.",
            faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
            faqQ1: "Apa itu konsultan ERP independen?",
            faqA1: "Konsultan ERP independen adalah ahli yang memberikan saran dan panduan terkait sistem ERP tanpa terikat pada vendor atau produk ERP tertentu. Ini memastikan bahwa rekomendasi yang diberikan objektif dan sepenuhnya berpihak pada kebutuhan terbaik bisnis Anda.",
            faqQ2: "Mengapa PT Digi Vice Indonesia menjadi pilihan yang tepat?",
            faqA2: "Kami menawarkan pengalaman mendalam, pendekatan yang berorientasi pada proses bisnis, dan komitmen untuk memberikan solusi yang paling sesuai dengan tujuan strategis perusahaan Anda, bukan sekadar menjual produk tertentu. Integritas dan transparansi adalah prioritas kami.",
            faqQ3: "Berapa lama proses konsultasi dan implementasi ERP?",
            faqA3: "Durasi proyek sangat bervariasi tergantung kompleksitas bisnis, ruang lingkup proyek, dan jenis sistem ERP yang dipilih. Setelah analisis awal, kami akan memberikan estimasi waktu yang lebih akurat.",
            faqQ4: "Apakah Digi Vice Indonesia juga menyediakan dukungan purna jual?",
            faqA4: "Ya, kami menyediakan dukungan komprehensif setelah implementasi, termasuk pelatihan lanjutan, pemecahan masalah, dan bantuan optimalisasi untuk memastikan sistem berjalan lancar dan memberikan nilai maksimal bagi bisnis Anda.",
            testimonialsTitle: "Apa Kata Klien Kami?",
            testimonial1Quote: "\"Kerja sama dengan PT Digi Vice Indonesia adalah keputusan terbaik kami. Mereka membantu kami merancang ulang proses bisnis dan memilih ERP yang benar-benar sesuai, bukan yang mahal tapi tidak efektif.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Pendekatan mereka yang independen dan fokus pada kebutuhan kami sangat kami hargai. Transformasi digital perusahaan kami berjalan mulus berkat panduan ahli Digi Vice.\"",
            testimonial2Author: "- Siti Aminah, Direktur Keuangan PT Cahaya Abadi",
            testimonial3Quote: "\"Dari analisis hingga pelatihan, tim Digi Vice sangat profesional dan responsif. Sistem ERP kami kini berjalan jauh lebih efisien dan terintegrasi.\"",
            testimonial3Author: "- David Lee, Manajer Operasional PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Mulai Transformasi Digital Anda",
            demoFormSubtitle: "Dapatkan demo gratis dan rasakan langsung bagaimana solusi ERP kami dapat membantu bisnis Anda.",
            formName: "Nama Lengkap",
            formEmail: "Email",
            formPhone: "Nomor Handphone",
            formSubmit: "Kirim Permintaan Demo",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Konsultan IT Bisnis ERP Terpercaya",
            contactTitle: "Hubungi Kami",
            contactEmail: "Email",
            contactPhone: "Telepon",
            contactAddress: "Alamat",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. Hak Cipta Dilindungi."
        },
        en: {
            pageTitle: "PT Digi Vice Indonesia - ERP Business IT Consultant",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Home",
            navServices: "Services",
            navAbout: "About Us",
            navVisionMission: "Vision & Mission",
            navWorkflow: "Workflow",
            navFaq: "FAQ",
            navTestimonials: "Testimonials",
            navContact: "Contact",
            heroTitle: "Optimize Your Business with Leading ERP Solutions",
            heroSubtitle: "PT Digi Vice Indonesia is a trusted IT consultant that helps your company achieve maximum efficiency through the right ERP system implementation.",
            heroButton: "Try Demo Now",
            statCustomers: "Satisfied Customers",
            statProjects: "IT Projects Completed",
            statExperience: "Years of Experience",
            trustedBy: "Trusted by Leading Companies:",
            servicesTitle: "Our Excellent Services",
            serviceSalesPartnerTitle: "Sales Partner",
            serviceSalesPartnerDesc: "Acting as a sales partner for specific technology products or solutions from other developers.",
            serviceConsultantTitle: "Consultant/Integration Solutions",
            serviceConsultantDesc: "Analyzing your business needs and recommending seamlessly integrated technology solutions.",
            serviceImplementationTitle: "Implementation & Customization Services",
            serviceImplementationDesc: "Installation, configuration, and adjustment of systems or software according to your company's specific needs.",
            serviceSupportTrainingTitle: "ERP Training Support",
            serviceSupportTrainingDesc: "Comprehensive training and after-sales support for Enterprise Resource Planning (ERP) systems to ensure your team can use them effectively and efficiently.",
            serviceLandingPageTitle: "Company Profile Landing Page Creation",
            serviceLandingPageDesc: "Helping you create a professional and engaging landing page that serves as a concise and attractive online representation of your company profile.",
            serviceInfrastructureTitle: "Infrastructure Services (Hosting, Cloud, Domain, etc.)",
            serviceInfrastructureDesc: "Providing various technology infrastructure-related services, including web hosting, cloud services, and domain registration, to ensure your business has a strong and reliable technological foundation.",
            aboutTitle: "About Us",
            aboutDesc: "PT Digi Vice Indonesia is dedicated to empowering businesses with cutting-edge technology. With a team of experienced experts, we are committed to providing innovative and transformative IT solutions, enabling our clients to thrive in the digital age.",
            visionMissionTitle: "Vision & Mission",
            visionTitle: "Vision",
            visionDesc: "To be a trusted independent ERP consultant accompanying business owners in designing effective, efficient, and sustainable digital solutions and workflows.",
            missionTitle: "Mission",
            mission1: "Provide objective and independent ERP consulting services, unbound by vendors, so business owners get the best solution according to their needs.",
            mission2: "Analyze business processes thoroughly, to design the right workflow before selecting and implementing digital systems.",
            mission3: "Accompany the digital transformation process from planning, system selection, implementation, to optimization.",
            mission4: "Increase business owners' and their teams' understanding of the importance of operational efficiency and data-driven decision making.",
            mission5: "Maintain integrity, professionalism, and commitment to client interests, with a transparent, strategic, and long-term impact approach.",
            mission6: "Provide digital education and training for company human resources to be ready to face the changes of Industry 4.0 era.",
            workflowTitle: "Our Workflow Before Choosing an ERP System",
            workflowStep1Title: "Business Needs Analysis",
            workflowStep1Desc: "Identify problems, goals, and core business processes to be supported by ERP.",
            workflowStep2Title: "Process Mapping (As-Is & To-Be)",
            workflowStep2Desc: "Documentation of current workflows and design of more optimal workflows with ERP.",
            workflowStep3Title: "Technical & Functional Requirements Definition",
            workflowStep3Desc: "Specification of features, integrations, and technical requirements needed from the ERP system.",
            workflowStep4Title: "Vendor & Solution Selection",
            workflowStep4Desc: "Evaluation of various ERP options and vendors based on established needs and budget.",
            workflowStep5Title: "Implementation & Optimization",
            workflowStep5Desc: "Installation, configuration, data migration, training, go-live, and ongoing support.",
            faqTitle: "Frequently Asked Questions (FAQ)",
            faqQ1: "What is an independent ERP consultant?",
            faqA1: "An independent ERP consultant is an expert who provides advice and guidance related to ERP systems without being tied to a specific vendor or ERP product. This ensures that the recommendations given are objective and solely in the best interest of your business.",
            faqQ2: "Why is PT Digi Vice Indonesia the right choice?",
            faqA2: "We offer in-depth experience, a business process-oriented approach, and a commitment to providing solutions that best suit your company's strategic goals, rather than just selling a particular product. Integrity and transparency are our priorities.",
            faqQ3: "How long is the ERP consultation and implementation process?",
            faqA3: "Project duration varies greatly depending on business complexity, project scope, and the type of ERP system chosen. After initial analysis, we will provide a more accurate time estimate.",
            faqQ4: "Does Digi Vice Indonesia also provide after-sales support?",
            faqA4: "Yes, we provide comprehensive support after implementation, including advanced training, troubleshooting, and optimization assistance to ensure the system runs smoothly and delivers maximum value for your business.",
            testimonialsTitle: "What Our Clients Say?",
            testimonial1Quote: "\"Collaborating with PT Digi Vice Indonesia was our best decision. They helped us redesign business processes and choose an ERP that was truly suitable, not just expensive but ineffective.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Their independent and client-focused approach is highly valued. Our company's digital transformation went smoothly thanks to Digi Vice's expert guidance.\"",
            testimonial2Author: "- Siti Aminah, Finance Director PT Cahaya Abadi",
            testimonial3Quote: "\"From analysis to training, the Digi Vice team was highly professional and responsive. Our ERP system now runs much more efficiently and integrated.\"",
            testimonial3Author: "- David Lee, Operations Manager PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Start Your Digital Transformation",
            demoFormSubtitle: "Get a free demo and experience firsthand how our ERP solutions can help your business.",
            formName: "Full Name",
            formEmail: "Email",
            formPhone: "Phone Number",
            formSubmit: "Send Demo Request",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Trusted ERP Business IT Consultant",
            contactTitle: "Contact Us",
            contactEmail: "Email",
            contactPhone: "Phone",
            contactAddress: "Address",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. All rights reserved."
        },
        es: {
            pageTitle: "PT Digi Vice Indonesia - Consultor de TI Empresarial ERP",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Inicio",
            navServices: "Servicios",
            navAbout: "Nosotros",
            navVisionMission: "Visión y Misión",
            navWorkflow: "Flujo de Trabajo",
            navFaq: "Preguntas Frecuentes",
            navTestimonials: "Testimonios",
            navContact: "Contacto",
            heroTitle: "Optimice Su Negocio con Soluciones ERP Líderes",
            heroSubtitle: "PT Digi Vice Indonesia es un consultor de TI de confianza que ayuda a su empresa a lograr la máxima eficiencia mediante la implementación correcta del sistema ERP.",
            heroButton: "Probar Demostración Ahora",
            statCustomers: "Clientes Satisfechos",
            statProjects: "Proyectos de TI Completados",
            statExperience: "Años de Experiencia",
            trustedBy: "Con la Confianza de Empresas Líderes:",
            servicesTitle: "Nuestros Excelentes Servicios",
            serviceSalesPartnerTitle: "Socio de Ventas",
            serviceSalesPartnerDesc: "Actuar como socio de ventas para productos o soluciones tecnológicas específicas de otros desarrolladores.",
            serviceConsultantTitle: "Consultor/Soluciones de Integración",
            serviceConsultantDesc: "Análisis de las necesidades de su negocio y recomendación de soluciones tecnológicas integradas sin problemas.",
            serviceImplementationTitle: "Servicios de Implementación y Personalización",
            serviceImplementationDesc: "Instalación, configuración y ajuste de sistemas o software según las necesidades específicas de su empresa.",
            serviceSupportTrainingTitle: "Soporte de Capacitación ERP",
            serviceSupportTrainingDesc: "Capacitación integral y soporte posventa para sistemas de Planificación de Recursos Empresariales (ERP) para garantizar que su equipo pueda utilizarlos de manera efectiva y eficiente.",
            serviceLandingPageTitle: "Creación de Página de Aterrizaje de Perfil de Empresa",
            serviceLandingPageDesc: "Le ayudamos a crear una página de aterrizaje profesional y atractiva que sirva como una representación en línea concisa y atractiva del perfil de su empresa.",
            serviceInfrastructureTitle: "Servicios de Infraestructura (Hosting, Nube, Dominio, etc.)",
            serviceInfrastructureDesc: "Proporcionar varios servicios relacionados con la infraestructura tecnológica, incluyendo alojamiento web, servicios en la nube y registro de dominios, para garantizar que su negocio tenga una base tecnológica sólida y confiable.",
            aboutTitle: "Sobre Nosotros",
            aboutDesc: "PT Digi Vice Indonesia se dedica a empoderar a las empresas con tecnología de vanguardia. Con un equipo de expertos experimentados, nos comprometemos a proporcionar soluciones de TI innovadoras y transformadoras, lo que permite a nuestros clientes prosperar en la era digital.",
            visionMissionTitle: "Visión y Misión",
            visionTitle: "Visión",
            visionDesc: "Ser un consultor ERP independiente de confianza que acompañe a los dueños de negocios en el diseño de soluciones y flujos de trabajo digitales efectivos, eficientes y sostenibles.",
            missionTitle: "Misión",
            mission1: "Brindar servicios de consultoría ERP objetivos e independientes, sin estar atados a proveedores, para que los dueños de negocios obtengan la mejor solución según sus necesidades.",
            mission2: "Analizar los procesos de negocio de manera integral, para diseñar el flujo de trabajo correcto antes de seleccionar e implementar sistemas digitales.",
            mission3: "Acompañar el proceso de transformación digital desde la planificación, selección del sistema, implementación, hasta la optimización.",
            mission4: "Aumentar la comprensión de los dueños de negocios y sus equipos sobre la importancia de la eficiencia operativa y la toma de decisiones basada en datos.",
            mission5: "Mantener la integridad, el profesionalismo y el compromiso con los intereses del cliente, con un enfoque transparente, estratégico y de impacto a largo plazo.",
            mission6: "Proporcionar educación y capacitación digital para los recursos humanos de la empresa para que estén listos para enfrentar los cambios de la era de la Industria 4.0.",
            workflowTitle: "Nuestro Flujo de Trabajo Antes de Elegir un Sistema ERP",
            workflowStep1Title: "Análisis de Necesidades del Negocio",
            workflowStep1Desc: "Identificar problemas, objetivos y procesos comerciales centrales que serán compatibles con ERP.",
            workflowStep2Title: "Mapeo de Procesos (As-Is & To-Be)",
            workflowStep2Desc: "Documentación de los flujos de trabajo actuales y diseño de flujos de trabajo más óptimos con ERP.",
            workflowStep3Title: "Definición de Requisitos Técnicos y Funcionales",
            workflowStep3Desc: "Especificación de las características, integraciones y requisitos técnicos necesarios del sistema ERP.",
            workflowStep4Title: "Selección de Proveedores y Soluciones",
            workflowStep4Desc: "Evaluación de varias opciones de ERP y proveedores en función de las necesidades y el presupuesto establecidos.",
            workflowStep5Title: "Implementación y Optimización",
            workflowStep5Desc: "Instalación, configuración, migración de datos, capacitación, puesta en marcha y soporte continuo.",
            faqTitle: "Preguntas Frecuentes (FAQ)",
            faqQ1: "¿Qué es un consultor ERP independiente?",
            faqA1: "Un consultor ERP independiente es un experto que brinda asesoramiento y orientación relacionados con los sistemas ERP sin estar vinculado a un proveedor o producto ERP específico. Esto asegura que las recomendaciones dadas sean objetivas y únicamente en el mejor interés de su negocio.",
            faqQ2: "¿Por qué PT Digi Vice Indonesia es la elección correcta?",
            faqA2: "Ofrecemos una profunda experiencia, un enfoque orientado a los procesos de negocio y un compromiso de proporcionar soluciones que mejor se adapten a los objetivos estratégicos de su empresa, en lugar de solo vender un producto en particular. La integridad y la transparencia son nuestras prioridades.",
            faqQ3: "¿Cuánto dura el proceso de consulta e implementación de ERP?",
            faqA3: "La duración del proyecto varía mucho según la complejidad del negocio, el alcance del proyecto y el tipo de sistema ERP elegido. Después del análisis inicial, le proporcionaremos una estimación de tiempo más precisa.",
            faqQ4: "¿Digi Vice Indonesia también ofrece soporte postventa?",
            faqA4: "Sí, brindamos soporte integral después de la implementación, incluida capacitación avanzada, resolución de problemas y asistencia de optimización para garantizar que el sistema funcione sin problemas y ofrezca el máximo valor para su negocio.",
            testimonialsTitle: "¿Qué Dicen Nuestros Clientes?",
            testimonial1Quote: "\"Colaborar con PT Digi Vice Indonesia fue nuestra mejor decisión. Nos ayudaron a rediseñar los procesos comerciales y elegir un ERP que realmente era adecuado, no solo caro sino ineficaz.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Su enfoque independiente y centrado en el cliente es muy valorado. La transformación digital de nuestra empresa transcurrió sin problemas gracias a la orientación experta de Digi Vice.\"",
            testimonial2Author: "- Siti Aminah, Directora Financiera de PT Cahaya Abadi",
            testimonial3Quote: "\"Desde el análisis hasta la capacitación, el equipo de Digi Vice fue muy profesional y receptivo. Nuestro sistema ERP ahora funciona de manera mucho más eficiente e integrada.\"",
            testimonial3Author: "- David Lee, Gerente de Operaciones de PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Inicie Su Transformación Digital",
            demoFormSubtitle: "Obtenga una demostración gratuita y experimente de primera mano cómo nuestras soluciones ERP pueden ayudar a su negocio.",
            formName: "Nombre Completo",
            formEmail: "Correo Electrónico",
            formPhone: "Número de Teléfono",
            formSubmit: "Enviar Solicitud de Demostración",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Consultor de TI Empresarial ERP de Confianza",
            contactTitle: "Contáctenos",
            contactEmail: "Correo Electrónico",
            contactPhone: "Teléfono",
            contactAddress: "Dirección",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. Todos los derechos reservados."
        }
    };

    let currentLang = localStorage.getItem('lang') || 'id';
    const languageSelect = document.getElementById('language-select');

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang; // Set HTML lang attribute

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

         // Update active button state
        document.querySelectorAll('.language-switcher button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.language-switcher button[data-lang="${lang}"]`).classList.add('active');
    };

    // Event listener for dropdown change
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // Initialize language on page load
    setLanguage(currentLang);
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Animations ---
    const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-bottom, .scale-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // --- FAQ Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            // Close all other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                    otherHeader.nextElementSibling.style.paddingBottom = '0';
                    otherHeader.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current accordion
            header.classList.toggle('active');
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
                accordionContent.style.paddingBottom = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingBottom = '20px';
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // --- Testimonial Slider Functionality ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.querySelector('.testimonial-slider-container .prev');
    const nextButton = document.querySelector('.testimonial-slider-container .next');
    const scrollAmount = 380; // Adjust based on testimonial-item width + gap (350px + 30px)

    if (testimonialSlider && prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Hide/show arrows if at start/end
        testimonialSlider.addEventListener('scroll', () => {
            // Give a small tolerance for floating point numbers
            const isAtStart = testimonialSlider.scrollLeft < 10;
            const isAtEnd = (testimonialSlider.scrollLeft + testimonialSlider.clientWidth) >= (testimonialSlider.scrollWidth - 10);

            prevButton.style.display = isAtStart ? 'none' : 'block';
            nextButton.style.display = isAtEnd ? 'none' : 'block';
        });

        // Initial check on load
        testimonialSlider.dispatchEvent(new Event('scroll'));
    }

    // --- Multi-language Functionality ---
    const translations = {
        id: {
            pageTitle: "PT Digi Vice Indonesia - Konsultan IT Bisnis ERP",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Beranda",
            navServices: "Layanan",
            navAbout: "Tentang Kami",
            navVisionMission: "Visi & Misi",
            navWorkflow: "Alur Kerja", // Nav item text changed to "Alur Kerja" not "Cara Kerja Kami"
            navFaq: "FAQ",
            navTestimonials: "Testimoni",
            navContact: "Kontak",
            heroTitle: "Optimalkan Bisnis Anda dengan Solusi ERP Terkemuka",
            heroSubtitle: "PT Digi Vice Indonesia adalah konsultan IT terpercaya yang membantu perusahaan Anda mencapai efisiensi maksimal melalui implementasi sistem ERP yang tepat.",
            heroButton: "Coba Demo Sekarang",
            statCustomers: "Pelanggan Puas",
            statProjects: "Proyek IT Selesai",
            statExperience: "Tahun Pengalaman",
            trustedBy: "Dipercaya oleh Perusahaan Terkemuka:",
            servicesTitle: "Layanan Unggulan Kami",
            serviceSalesPartnerTitle: "Sales Partner",
            serviceSalesPartnerDesc: "Bertindak sebagai mitra penjualan untuk produk atau solusi teknologi tertentu dari pengembang lain.",
            serviceConsultantTitle: "Konsultan/Solusi Integrasi",
            serviceConsultantDesc: "Menganalisis kebutuhan bisnis dan merekomendasikan solusi teknologi yang terintegrasi secara mulus.",
            serviceImplementationTitle: "Jasa Implementasi & Kustomisasi",
            serviceImplementationDesc: "Pemasangan, konfigurasi, dan penyesuaian sistem atau perangkat lunak sesuai kebutuhan spesifik perusahaan Anda.",
            serviceSupportTrainingTitle: "Support Training ERP",
            serviceSupportTrainingDesc: "Pelatihan komprehensif dan dukungan purna jual untuk memastikan tim Anda mahir menggunakan sistem ERP.",
            serviceLandingPageTitle: "Pembuatan Landing Page Company Profile",
            serviceLandingPageDesc: "Membantu Anda membuat halaman arahan (landing page) profesional dan menarik untuk profil perusahaan Anda.",
            serviceInfrastructureTitle: "Jasa Infrastruktur (Hosting, Cloud, Domain, dll)",
            serviceInfrastructureDesc: "Menyediakan berbagai layanan terkait infrastruktur teknologi untuk fondasi bisnis yang kuat dan handal.",
            aboutTitle: "Tentang Kami",
            aboutDesc: "PT Digi Vice Indonesia berdedikasi untuk memberdayakan bisnis dengan teknologi mutakhir. Dengan tim ahli yang berpengalaman, kami berkomitmen untuk memberikan solusi IT yang inovatif dan transformatif, memungkinkan klien kami untuk berkembang di era digital.",
            visionMissionTitle: "Visi & Misi",
            visionTitle: "Visi",
            visionDesc: "Menjadi konsultan independen ERP terpercaya yang mendampingi pemilik bisnis dalam merancang solusi dan alur kerja digital yang efektif, efisien, dan berkelanjutan.",
            missionTitle: "Misi",
            mission1: "Memberikan layanan konsultasi ERP yang objektif dan independen, tanpa terikat vendor, agar pemilik bisnis mendapatkan solusi terbaik sesuai kebutuhan.",
            mission2: "Menganalisis proses bisnis secara menyeluruh, untuk merancang alur kerja yang tepat sebelum memilih dan mengimplementasikan sistem digital.",
            mission3: "Mendampingi proses transformasi digital mulai dari perencanaan, pemilihan sistem, implementasi, hingga optimalisasi.",
            mission4: "Meningkatkan pemahaman bisnis owner dan timnya terhadap pentingnya efisiensi operasional dan pengambilan keputusan berbasis data.",
            mission5: "Menjaga integritas, profesionalisme, dan keberpihakan pada kepentingan klien, dengan pendekatan yang transparan, strategis, dan berdampak jangka panjang.",
            mission6: "Memberikan edukasi dan pelatihan digital bagi SDM perusahaan agar siap menghadapi perubahan era industri 4.0",
            workflowTitle: "Cara Kerja Kami", // Section title
            workflowMainDesc: "Proses implementasi ERP yang terstruktur dan efisien untuk bisnis Anda.",
            workflowStep1Title: "1. Konsultasi",
            workflowStep1Desc: "Diskusi kebutuhan bisnis Anda.",
            workflowStep2Title: "2. Proposal",
            workflowStep2Desc: "Penyusunan solusi yang tepat.",
            workflowStep3Title: "3. Perjanjian Bisnis",
            workflowStep3Desc: "Finalisasi kesepakatan kerja.",
            workflowStep4Title: "4. Administrasi",
            workflowStep4Desc: "Penyelesaian dokumen awal.",
            workflowStep5Title: "5. Implementasi & Migrasi Data",
            workflowStep5Desc: "Pemasangan dan transfer data.",
            workflowStep6Title: "6. Pelatihan Tim",
            workflowStep6Desc: "Edukasi penggunaan sistem.",
            workflowStep7Title: "7. Dukungan Berkelanjutan",
            workflowStep7Desc: "Bantuan teknis jangka panjang.",
            faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
            faqQ1: "Apa itu konsultan ERP independen?",
            faqA1: "Konsultan ERP independen adalah ahli yang memberikan saran dan panduan terkait sistem ERP tanpa terikat pada vendor atau produk ERP tertentu. Ini memastikan bahwa rekomendasi yang diberikan objektif dan sepenuhnya berpihak pada kebutuhan terbaik bisnis Anda.",
            faqQ2: "Mengapa PT Digi Vice Indonesia menjadi pilihan yang tepat?",
            faqA2: "Kami menawarkan pengalaman mendalam, pendekatan yang berorientasi pada proses bisnis, dan komitmen untuk memberikan solusi yang paling sesuai dengan tujuan strategis perusahaan Anda, bukan sekadar menjual produk tertentu. Integritas dan transparansi adalah prioritas kami.",
            faqQ3: "Berapa lama proses konsultasi dan implementasi ERP?",
            faqA3: "Durasi proyek sangat bervariasi tergantung kompleksitas bisnis, ruang lingkup proyek, dan jenis sistem ERP yang dipilih. Setelah analisis awal, kami akan memberikan estimasi waktu yang lebih akurat.",
            faqQ4: "Apakah Digi Vice Indonesia juga menyediakan dukungan purna jual?",
            faqA4: "Ya, kami menyediakan dukungan komprehensif setelah implementasi, termasuk pelatihan lanjutan, pemecahan masalah, dan bantuan optimalisasi untuk memastikan sistem berjalan lancar dan memberikan nilai maksimal bagi bisnis Anda.",
            testimonialsTitle: "Apa Kata Klien Kami?",
            testimonial1Quote: "\"Kerja sama dengan PT Digi Vice Indonesia adalah keputusan terbaik kami. Mereka membantu kami merancang ulang proses bisnis dan memilih ERP yang benar-benar sesuai, bukan yang mahal tapi tidak efektif.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Pendekatan mereka yang independen dan fokus pada kebutuhan kami sangat kami hargai. Transformasi digital perusahaan kami berjalan mulus berkat panduan ahli Digi Vice.\"",
            testimonial2Author: "- Siti Aminah, Direktur Keuangan PT Cahaya Abadi",
            testimonial3Quote: "\"Dari analisis hingga pelatihan, tim Digi Vice sangat profesional dan responsif. Sistem ERP kami kini berjalan jauh lebih efisien dan terintegrasi.\"",
            testimonial3Author: "- David Lee, Manajer Operasional PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Mulai Transformasi Digital Anda",
            demoFormSubtitle: "Dapatkan demo gratis dan rasakan langsung bagaimana solusi ERP kami dapat membantu bisnis Anda.",
            formName: "Nama Lengkap",
            formEmail: "Email",
            formPhone: "Nomor Handphone",
            formSubmit: "Kirim Permintaan Demo",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Konsultan IT Bisnis ERP Terpercaya",
            contactTitle: "Hubungi Kami",
            contactEmail: "Email",
            contactPhone: "Telepon",
            contactAddress: "Alamat",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. Hak Cipta Dilindungi."
        },
        en: {
            pageTitle: "PT Digi Vice Indonesia - ERP Business IT Consultant",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Home",
            navServices: "Services",
            navAbout: "About Us",
            navVisionMission: "Vision & Mission",
            navWorkflow: "Workflow", // Nav item text
            navFaq: "FAQ",
            navTestimonials: "Testimonials",
            navContact: "Contact",
            heroTitle: "Optimize Your Business with Leading ERP Solutions",
            heroSubtitle: "PT Digi Vice Indonesia is a trusted IT consultant that helps your company achieve maximum efficiency through the right ERP system implementation.",
            heroButton: "Try Demo Now",
            statCustomers: "Satisfied Customers",
            statProjects: "IT Projects Completed",
            statExperience: "Years of Experience",
            trustedBy: "Trusted by Leading Companies:",
            servicesTitle: "Our Excellent Services",
            serviceSalesPartnerTitle: "Sales Partner",
            serviceSalesPartnerDesc: "Acting as a sales partner for specific technology products or solutions from other developers.",
            serviceConsultantTitle: "Consultant/Integration Solutions",
            serviceConsultantDesc: "Analyzing your business needs and recommending seamlessly integrated technology solutions.",
            serviceImplementationTitle: "Implementation & Customization Services",
            serviceImplementationDesc: "Installation, configuration, and adjustment of systems or software according to your company's specific needs.",
            serviceSupportTrainingTitle: "ERP Training Support",
            serviceSupportTrainingDesc: "Comprehensive training and after-sales support for Enterprise Resource Planning (ERP) systems to ensure your team can use them effectively and efficiently.",
            serviceLandingPageTitle: "Company Profile Landing Page Creation",
            serviceLandingPageDesc: "Helping you create a professional and engaging landing page that serves as a concise and attractive online representation of your company profile.",
            serviceInfrastructureTitle: "Infrastructure Services (Hosting, Cloud, Domain, etc.)",
            serviceInfrastructureDesc: "Providing various technology infrastructure-related services, including web hosting, cloud services, and domain registration, to ensure your business has a strong and reliable technological foundation.",
            aboutTitle: "About Us",
            aboutDesc: "PT Digi Vice Indonesia is dedicated to empowering businesses with cutting-edge technology. With a team of experienced experts, we are committed to providing innovative and transformative IT solutions, enabling our clients to thrive in the digital age.",
            visionMissionTitle: "Vision & Mission",
            visionTitle: "Vision",
            visionDesc: "To be a trusted independent ERP consultant accompanying business owners in designing effective, efficient, and sustainable digital solutions and workflows.",
            missionTitle: "Mission",
            mission1: "Provide objective and independent ERP consulting services, unbound by vendors, so business owners get the best solution according to their needs.",
            mission2: "Analyze business processes thoroughly, to design the right workflow before selecting and implementing digital systems.",
            mission3: "Accompany the digital transformation process from planning, system selection, implementation, to optimization.",
            mission4: "Increase business owners' and their teams' understanding of the importance of operational efficiency and data-driven decision making.",
            mission5: "Maintain integrity, professionalism, and commitment to client interests, with a transparent, strategic, and long-term impact approach.",
            mission6: "Provide digital education and training for company human resources to be ready to face the changes of Industry 4.0 era.",
            workflowTitle: "Our Workflow", // Section title
            workflowMainDesc: "A structured and efficient ERP implementation process for your business.",
            workflowStep1Title: "1. Consultation",
            workflowStep1Desc: "Discussion of your business needs.",
            workflowStep2Title: "2. Proposal",
            workflowStep2Desc: "Preparation of the right solution.",
            workflowStep3Title: "3. Business Agreement",
            workflowStep3Desc: "Finalization of the work agreement.",
            workflowStep4Title: "4. Administration",
            workflowStep4Desc: "Completion of initial documents.",
            workflowStep5Title: "5. Implementation & Data Migration",
            workflowStep5Desc: "System installation and data transfer.",
            workflowStep6Title: "6. Team Training",
            workflowStep6Desc: "System usage education.",
            workflowStep7Title: "7. Ongoing Support",
            workflowStep7Desc: "Long-term technical assistance.",
            faqTitle: "Frequently Asked Questions (FAQ)",
            faqQ1: "What is an independent ERP consultant?",
            faqA1: "An independent ERP consultant is an expert who provides advice and guidance related to ERP systems without being tied to a specific vendor or ERP product. This ensures that the recommendations given are objective and solely in the best interest of your business.",
            faqQ2: "Why is PT Digi Vice Indonesia the right choice?",
            faqA2: "We offer in-depth experience, a business process-oriented approach, and a commitment to providing solutions that best suit your company's strategic goals, rather than just selling a particular product. Integrity and transparency are our priorities.",
            faqQ3: "How long is the ERP consultation and implementation process?",
            faqA3: "Project duration varies greatly depending on business complexity, project scope, and the type of ERP system chosen. After initial analysis, we will provide a more accurate time estimate.",
            faqQ4: "Does Digi Vice Indonesia also provide after-sales support?",
            faqA4: "Yes, we provide comprehensive support after implementation, including advanced training, troubleshooting, and optimization assistance to ensure the system runs smoothly and delivers maximum value for your business.",
            testimonialsTitle: "What Our Clients Say?",
            testimonial1Quote: "\"Collaborating with PT Digi Vice Indonesia was our best decision. They helped us redesign business processes and choose an ERP that was truly suitable, not just expensive but ineffective.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Their independent and client-focused approach is highly valued. Our company's digital transformation went smoothly thanks to Digi Vice's expert guidance.\"",
            testimonial2Author: "- Siti Aminah, Finance Director PT Cahaya Abadi",
            testimonial3Quote: "\"From analysis to training, the Digi Vice team was highly professional and responsive. Our ERP system now runs much more efficiently and integrated.\"",
            testimonial3Author: "- David Lee, Operations Manager PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Start Your Digital Transformation",
            demoFormSubtitle: "Get a free demo and experience firsthand how our ERP solutions can help your business.",
            formName: "Full Name",
            formEmail: "Email",
            formPhone: "Phone Number",
            formSubmit: "Send Demo Request",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Trusted ERP Business IT Consultant",
            contactTitle: "Contact Us",
            contactEmail: "Email",
            contactPhone: "Phone",
            contactAddress: "Address",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. All rights reserved."
        },
        es: {
            pageTitle: "PT Digi Vice Indonesia - Consultor de TI Empresarial ERP",
            companyName: "PT Digi Vice Indonesia",
            navHome: "Inicio",
            navServices: "Servicios",
            navAbout: "Nosotros",
            navVisionMission: "Visión y Misión",
            navWorkflow: "Flujo de Trabajo", // Nav item text
            navFaq: "Preguntas Frecuentes",
            navTestimonials: "Testimonios",
            navContact: "Contacto",
            heroTitle: "Optimice Su Negocio con Soluciones ERP Líderes",
            heroSubtitle: "PT Digi Vice Indonesia es un consultor de TI de confianza que ayuda a su empresa a lograr la máxima eficiencia mediante la implementación correcta del sistema ERP.",
            heroButton: "Probar Demostración Ahora",
            statCustomers: "Clientes Satisfechos",
            statProjects: "Proyectos de TI Completados",
            statExperience: "Años de Experiencia",
            trustedBy: "Con la Confianza de Empresas Líderes:",
            servicesTitle: "Nuestros Excelentes Servicios",
            serviceSalesPartnerTitle: "Socio de Ventas",
            serviceSalesPartnerDesc: "Actuar como socio de ventas para productos o soluciones tecnológicas específicas de otros desarrolladores.",
            serviceConsultantTitle: "Consultor/Soluciones de Integración",
            serviceConsultantDesc: "Análisis de las necesidades de su negocio y recomendación de soluciones tecnológicas integradas sin problemas.",
            serviceImplementationTitle: "Servicios de Implementación y Personalización",
            serviceImplementationDesc: "Instalación, configuración y ajuste de sistemas o software según las necesidades específicas de su empresa.",
            serviceSupportTrainingTitle: "Soporte de Capacitación ERP",
            serviceSupportTrainingDesc: "Capacitación integral y soporte posventa para sistemas de Planificación de Recursos Empresariales (ERP) para garantizar que su equipo pueda utilizarlos de manera efectiva y eficiente.",
            serviceLandingPageTitle: "Creación de Página de Aterrizaje de Perfil de Empresa",
            serviceLandingPageDesc: "Le ayudamos a crear una página de aterrizaje profesional y atractiva que sirva como una representación en línea concisa y atractiva del perfil de su empresa.",
            serviceInfrastructureTitle: "Servicios de Infraestructura (Hosting, Nube, Dominio, etc.)",
            serviceInfrastructureDesc: "Proporcionar varios servicios relacionados con la infraestructura tecnológica, incluyendo alojamiento web, servicios en la nube y registro de dominios, para garantizar que su negocio tenga una base tecnológica sólida y confiable.",
            aboutTitle: "Sobre Nosotros",
            aboutDesc: "PT Digi Vice Indonesia se dedica a empoderar a las empresas con tecnología de vanguardia. Con un equipo de expertos experimentados, nos comprometemos a proporcionar soluciones de TI innovadoras y transformadoras, lo que permite a nuestros clientes prosperar en la era digital.",
            visionMissionTitle: "Visión y Misión",
            visionTitle: "Visión",
            visionDesc: "Ser un consultor ERP independiente de confianza que acompañe a los dueños de negocios en el diseño de soluciones y flujos de trabajo digitales efectivos, eficientes y sostenibles.",
            missionTitle: "Misión",
            mission1: "Brindar servicios de consultoría ERP objetivos e independientes, sin estar atados a proveedores, para que los dueños de negocios obtengan la mejor solución según sus necesidades.",
            mission2: "Analizar los procesos de negocio de manera integral, para diseñar el flujo de trabajo correcto antes de seleccionar e implementar sistemas digitales.",
            mission3: "Acompañar el proceso de transformación digital desde la planificación, selección del sistema, implementación, hasta la optimización.",
            mission4: "Aumentar la comprensión de los dueños de negocios y sus equipos sobre la importancia de la eficiencia operativa y la toma de decisiones basada en datos.",
            mission5: "Mantener la integridad, el profesionalismo y el compromiso con los intereses del cliente, con un enfoque transparente, estratégico, y de impacto a largo plazo.",
            mission6: "Proporcionar educación y capacitación digital para los recursos humanos de la empresa para que estén listos para enfrentar los cambios de la era de la Industria 4.0.",
            workflowTitle: "Nuestro Flujo de Trabajo", // Section title
            workflowMainDesc: "Un proceso de implementación de ERP estructurado y eficiente para su negocio.",
            workflowStep1Title: "1. Consulta",
            workflowStep1Desc: "Discusión de las necesidades de su negocio.",
            workflowStep2Title: "2. Propuesta",
            workflowStep2Desc: "Elaboración de la solución adecuada.",
            workflowStep3Title: "3. Acuerdo Comercial",
            workflowStep3Desc: "Finalización del acuerdo de trabajo.",
            workflowStep4Title: "4. Administración",
            workflowStep4Desc: "Finalización de documentos iniciales.",
            workflowStep5Title: "5. Implementación y Migración de Datos",
            workflowStep5Desc: "Instalación del sistema y transferencia de datos.",
            workflowStep6Title: "6. Capacitación del Equipo",
            workflowStep6Desc: "Educación sobre el uso del sistema.",
            workflowStep7Title: "7. Soporte Continuo",
            workflowStep7Desc: "Asistencia técnica a largo plazo.",
            faqTitle: "Preguntas Frecuentes (FAQ)",
            faqQ1: "¿Qué es un consultor ERP independiente?",
            faqA1: "Un consultor ERP independiente es un experto que brinda asesoramiento y orientación relacionados con los sistemas ERP sin estar vinculado a un proveedor o producto ERP específico. Esto asegura que las recomendaciones dadas sean objetivas y únicamente en el mejor interés de su negocio.",
            faqQ2: "¿Por qué PT Digi Vice Indonesia es la elección correcta?",
            faqA2: "Ofrecemos una profunda experiencia, un enfoque orientado a los procesos de negocio y un compromiso de proporcionar soluciones que mejor se adapten a los objetivos estratégicos de su empresa, en lugar de solo vender un producto en particular. La integridad y la transparencia son nuestras prioridades.",
            faqQ3: "¿Cuánto dura el proceso de consulta e implementación de ERP?",
            faqA3: "La duración del proyecto varía mucho según la complejidad del negocio, el alcance del proyecto y el tipo de sistema ERP elegido. Después del análisis inicial, le proporcionaremos una estimación de tiempo más precisa.",
            faqQ4: "¿Digi Vice Indonesia también ofrece soporte postventa?",
            faqA4: "Sí, brindamos soporte integral después de la implementación, incluida capacitación avanzada, resolución de problemas y asistencia de optimización para garantizar que el sistema funcione sin problemas y ofrezca el máximo valor para su negocio.",
            testimonialsTitle: "¿Qué Dicen Nuestros Clientes?",
            testimonial1Quote: "\"Colaborar con PT Digi Vice Indonesia fue nuestra mejor decisión. Nos ayudaron a rediseñar los procesos comerciales y elegir un ERP que realmente era adecuado, no solo caro sino ineficaz.\"",
            testimonial1Author: "- Budi Santoso, CEO PT Makmur Jaya",
            testimonial2Quote: "\"Su enfoque independiente y centrado en el cliente es muy valorado. La transformación digital de nuestra empresa transcurrió sin problemas gracias a la orientación experta de Digi Vice.\"",
            testimonial2Author: "- Siti Aminah, Directora Financiera de PT Cahaya Abadi",
            testimonial3Quote: "\"Desde el análisis hasta la capacitación, el equipo de Digi Vice fue muy profesional y receptivo. Nuestro sistema ERP ahora funciona de manera mucho más eficiente e integrada.\"",
            testimonial3Author: "- David Lee, Gerente de Operaciones de PT Global Sukses",
            prevButton: "&#10094;", // Left arrow
            nextButton: "&#10095;", // Right arrow
            demoFormTitle: "Inicie Su Transformación Digital",
            demoFormSubtitle: "Obtenga una demostración gratuita y experimente de primera mano cómo nuestras soluciones ERP pueden ayudar a su negocio.",
            formName: "Nombre Completo",
            formEmail: "Correo Electrónico",
            formPhone: "Número de Teléfono",
            formSubmit: "Enviar Solicitud de Demostración",
            footerCompanyName: "PT Digi Vice Indonesia",
            footerTagline: "Consultor de TI Empresarial ERP de Confianza",
            contactTitle: "Contáctenos",
            contactEmail: "Correo Electrónico",
            contactPhone: "Teléfono",
            contactAddress: "Dirección",
            copyrightText: "&copy; 2025 PT Digi Vice Indonesia. Todos los derechos reservados."
        }
    };

    let currentLang = localStorage.getItem('lang') || 'id';
    const languageSelect = document.getElementById('language-select');

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang; // Set HTML lang attribute

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Set the correct option in the dropdown
        if (languageSelect) {
            languageSelect.value = lang;
        }
    };

    // Event listener for dropdown change
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // Initialize language on page load
    setLanguage(currentLang);
    // Ensure the dropdown shows the correct current language on load
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
});