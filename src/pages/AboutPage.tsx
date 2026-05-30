import { useEffect, useRef, useState } from "react";
import { fetchAbout } from "../services/supabaseClient";

/* Fallback static data if Supabase `about` table is empty */
const STATIC = {
  who_i_am:
    "I'm an aspiring IT professional and web developer with experience in building websites, designing systems, and providing technical support. I enjoy creating clean and functional designs that are easy to use.",
  school: "Asian College, Dumaguete City",
  course: "Diploma in Information Technology",
  year: "3rd Year Diploma Student (2022–2025)",
  career_goal:
    "My goal is to grow in web development and IT support while building real-world projects that help businesses and communities thrive.",
  quick_facts: [
    "Detail-oriented",
    "Fast learner",
    "Strong communication",
    "Team player",
    "Creative problem-solver",
  ],
};

const AboutPage = () => {
  const ref  = useRef<HTMLDivElement>(null);
  const [about, setAbout] = useState<typeof STATIC>(STATIC);

  useEffect(() => {
    fetchAbout().then((data) => {
      if (data) setAbout({ ...STATIC, ...data });
    });
  }, []);

  /* scroll-reveal */
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const cards = [
    {
      icon: "👩‍💻", title: "Who I Am", delay: "reveal-delay-1",
      content: <p>{about.who_i_am}</p>,
    },
    {
      icon: "🎓", title: "Education", delay: "reveal-delay-2",
      content: (
        <>
          <p><strong>{about.course}</strong></p>
          <p>{about.school}</p>
          <p>{about.year}</p>
        </>
      ),
    },
    {
      icon: "🎯", title: "Career Goal", delay: "reveal-delay-3",
      content: <p>{about.career_goal}</p>,
    },
    {
      icon: "⚡", title: "Quick Facts", delay: "reveal-delay-4",
      content: (
        <ul>
          {about.quick_facts.map((f: string) => <li key={f}>{f}</li>)}
        </ul>
      ),
    },
  ];

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow reveal">About</p>
          <h1 className="page-title reveal reveal-delay-1">About Me</h1>
          <p className="page-subtitle reveal reveal-delay-2">
            A quick introduction about who I am and what I do.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid about-grid-2col">
            {cards.map((card) => (
              <div key={card.title} className={`about-card reveal ${card.delay}`}>
                <div className="about-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;