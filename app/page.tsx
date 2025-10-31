"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const navLinks = [
	{ label: "Product", href: "#product" },
	{ label: "Approach", href: "#approach" },
	{ label: "Feedback", href: "#feedback" },
	{ label: "About", href: "#about" },
	{ label: "Contact", href: "#contact" },
];

const marqueeItems = [
	"Mentor matchmaking",
	"On-demand mock interviews",
	"Real company projects",
	"Skill tracking dashboards",
	"Anytime access",
];

const mentorInterests = ["Product strategy", "Marketing launch", "Data storytelling", "Design research"];

const mentorProfiles = [
	{
		id: "mentor-chen",
		initials: "JC",
		name: "Jasmine Chen",
		title: "Product Lead · Asana",
		summary: "Helps students turn discovery research into launch-ready narratives and prioritization stories.",
		focusAreas: ["Product strategy", "Design research"],
		meetingStyle: "Weekly 30-minute sprints",
		studentsHelped: 42,
		highlights: ["Map job stories that resonate with hiring managers.", "Use roadmap trade-offs to tell impact-focused stories."],
		availability: ["Tue · 10:00 AM PT", "Thu · 3:30 PM PT"],
	},
	{
		id: "mentor-ortiz",
		initials: "LO",
		name: "Luis Ortiz",
		title: "Growth Marketing Manager · Stripe",
		summary: "Pairs channel experimentation with analytics dashboards students can speak to in interviews.",
		focusAreas: ["Marketing launch", "Data storytelling"],
		meetingStyle: "Bi-weekly strategy reviews",
		studentsHelped: 35,
		highlights: ["Build launch scorecards recruiters can validate.", "Translate campaign metrics into clear impact narratives."],
		availability: ["Wed · 1:00 PM PT", "Fri · 9:00 AM PT"],
	},
	{
		id: "mentor-kim",
		initials: "SK",
		name: "Soojin Kim",
		title: "Senior Data Scientist · Spotify",
		summary: "Guides students through data storytelling, SQL challenges, and experiment readouts.",
		focusAreas: ["Data storytelling", "Product strategy"],
		meetingStyle: "Project-based checkpoints",
		studentsHelped: 28,
		highlights: ["Practice whiteboard analyses with constructive critique.", "Ship artefacts that reflect measurable product impact."],
		availability: ["Mon · 4:30 PM PT", "Thu · 8:30 AM PT"],
	},
	{
		id: "mentor-singh",
		initials: "RS",
		name: "Rhea Singh",
		title: "Design Research Lead · Airbnb",
		summary: "Coaches students on qualitative research plans and storytelling for portfolios.",
		focusAreas: ["Design research", "Product strategy"],
		meetingStyle: "Immersive research studios",
		studentsHelped: 31,
		highlights: ["Draft interview guides and synthesize insights live.", "Connect research outcomes to product and growth metrics."],
		availability: ["Tue · 2:00 PM PT", "Fri · 11:30 AM PT"],
	},
];

const interviewTracks = [
	{
		id: "product",
		label: "Product management",
		description: "Practice strategy and execution rounds with mentors who have hired APMs and PMs.",
		slots: [
			{ id: "product-slot-1", label: "Tue · 9:00 AM PT", interviewer: "Caleb Morgan", format: "Product sense", notes: "Case + roadmap critique" },
			{ id: "product-slot-2", label: "Thu · 6:00 PM PT", interviewer: "Maya Desai", format: "Execution", notes: "Metric deep-dive" },
		],
		focus: ["Prioritization frameworks", "Product storytelling", "Stakeholder alignment"],
	},
	{
		id: "analytics",
		label: "Data & analytics",
		description: "Simulate SQL, experiment design, and readout presentations with hiring managers.",
		slots: [
			{ id: "analytics-slot-1", label: "Wed · 3:00 PM PT", interviewer: "Nikhil Rao", format: "SQL + case", notes: "Live querying" },
			{ id: "analytics-slot-2", label: "Sat · 10:00 AM PT", interviewer: "Priya Shah", format: "Experiment review", notes: "A/B interpretation" },
		],
		focus: ["Experiment frameworks", "Insight presentation", "Cross-functional storytelling"],
	},
	{
		id: "marketing",
		label: "Marketing & GTM",
		description: "Work through positioning, channel planning, and campaign retros with seasoned marketers.",
		slots: [
			{ id: "marketing-slot-1", label: "Mon · 5:30 PM PT", interviewer: "Alex Rivera", format: "Positioning", notes: "Narrative critique" },
			{ id: "marketing-slot-2", label: "Thu · 8:00 AM PT", interviewer: "Fatima Noor", format: "Channel mix", notes: "Media plan review" },
		],
		focus: ["Audience definition", "Launch measurement", "Messaging iteration"],
	},
];

const projectBriefs = [
	{
		id: "brief-onboarding",
		title: "Reimagine campus onboarding",
		sponsor: "Atlas Labs",
		summary: "Design a first-week onboarding journey that helps new students find mentorship, schedule mock interviews, and track progress.",
		milestones: ["Kickoff & goals", "Student interviews", "Prototype testing", "Launch playbook"],
		deliverables: ["Journey blueprint", "Interview scripts", "Launch checklist"],
		duration: "3 weeks",
		teamSize: "4 students",
	},
	{
		id: "brief-dashboard",
		title: "Mentor dashboard insights",
		sponsor: "Northwind Analytics",
		summary: "Ship a dashboard that surfaces mentor engagement, student momentum, and flagging risk cohorts.",
		milestones: ["Data audit", "KPI alignment", "Prototype build", "Executive readout"],
		deliverables: ["SQL queries", "Dashboard prototype", "Insights deck"],
		duration: "4 weeks",
		teamSize: "3 students",
	},
	{
		id: "brief-launch",
		title: "Launch the mentor loop beta",
		sponsor: "Career Prep Platform",
		summary: "Plan and execute a pilot launch for 50 students, including communications, support flows, and KPI tracking.",
		milestones: ["Segment selection", "Messaging + assets", "Pilot launch", "Retro + scale plan"],
		deliverables: ["Launch calendar", "Comms kit", "Pilot report"],
		duration: "5 weeks",
		teamSize: "5 students",
	},
];

const values = [
	{
		icon: "🕒",
		title: "Always-on access",
		description: "Students tap into mentors, mock interviews, and project briefs anytime they need a boost.",
	},
	{
		icon: "🎓",
		title: "Cross-discipline community",
		description: "Every major contributes — from design and analytics to communications and business.",
	},
	{
		icon: "📈",
		title: "Feedback that compounds",
		description: "Structured reflections and mentor notes build a living portfolio story.",
	},
];

const heroHighlights = [
	{
		title: "Mentor introductions",
		description: "Personalized matches connect students with industry mentors for recurring conversations.",
	},
	{
		title: "Mock interview practice",
		description: "Structured sessions with question banks, recordings, and mentor feedback.",
	},
	{
		title: "Real project briefs",
		description: "Hands-on work drawn from employer partnerships to build confidence before graduation.",
	},
];

const aboutHighlights = [
	{
		label: "Problem",
		body: "Students graduate with theory but lack the project stories and confidence required in interviews. Career centers provide advice but limited hands-on practice.",
	},
	{
		label: "Solution",
		body: "A digital platform that blends mentor access, interview reps, and employer-backed projects so students can practice and reflect in one place.",
	},
	{
		label: "Pitch",
		body: "Career Prep Platform becomes the operating system for student readiness — mentors, projects, and signals recruiters act on, all in one workflow.",
	},
];

const aboutDifferentiators = [
	"We center practice over pamphlets — students produce artefacts, not just resumes.",
	"Mentors work on structured loops with clear milestones and shared notes.",
	"Employers gain a live view of student momentum instead of static career-fair meetings.",
];

const feedbackPrompts = [
	{
		title: "Pilot with your team",
		description: "Run a two-week mentor or mock interview sprint and tell us what needs to improve before launch.",
	},
	{
		title: "Share student pain points",
		description: "Send us the gaps you see at your campus or org so we can bake them into our roadmap.",
	},
	{
		title: "Co-design dashboards",
		description: "Help us shape mentor and recruiter views so everyone sees progress in real time.",
	},
];

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const heroRef = useRef<HTMLDivElement | null>(null);
	const resetTimerRef = useRef<number | null>(null);
	const [selectedInterest, setSelectedInterest] = useState<string>(mentorInterests[0]);
	const filteredMentors = useMemo(
		() => mentorProfiles.filter((mentor) => mentor.focusAreas.includes(selectedInterest)),
		[selectedInterest]
	);
	const [selectedMentorId, setSelectedMentorId] = useState<string>(() => {
		const defaultMentor = mentorProfiles.find((mentor) => mentor.focusAreas.includes(mentorInterests[0]));
		return defaultMentor?.id ?? mentorProfiles[0].id;
	});
	const activeMentor = useMemo(() => {
		const match = mentorProfiles.find((mentor) => mentor.id === selectedMentorId);
		if (match) {
			return match;
		}
		return filteredMentors[0] ?? mentorProfiles[0];
	}, [filteredMentors, selectedMentorId]);
	const [selectedTrack, setSelectedTrack] = useState<string>(interviewTracks[0].id);
	const activeTrack = useMemo(
		() => interviewTracks.find((track) => track.id === selectedTrack) ?? interviewTracks[0],
		[selectedTrack]
	);
	const [selectedSlot, setSelectedSlot] = useState<string | null>(interviewTracks[0].slots[0]?.id ?? null);
	const [selectedBriefId, setSelectedBriefId] = useState<string>(projectBriefs[0].id);
	const activeBrief = useMemo(
		() => projectBriefs.find((brief) => brief.id === selectedBriefId) ?? projectBriefs[0],
		[selectedBriefId]
	);
	const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", segment: "student", message: "" });
	const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "sent">("idle");

	const handleJoinClick = () => {
		setShowModal(true);
		setMobileOpen(false);
	};

	useEffect(() => {
		if (filteredMentors.length === 0) {
			if (!mentorProfiles.some((mentor) => mentor.id === selectedMentorId)) {
				setSelectedMentorId(mentorProfiles[0].id);
			}
			return;
		}

		if (!filteredMentors.some((mentor) => mentor.id === selectedMentorId)) {
			setSelectedMentorId(filteredMentors[0].id);
		}
	}, [filteredMentors, selectedMentorId]);

	useEffect(() => {
		setSelectedSlot(activeTrack.slots[0]?.id ?? null);
	}, [activeTrack]);

	useEffect(() => {
		if (typeof document === "undefined") {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal-visible");
					}
				});
			},
			{ threshold: 0.12 }
		);

		const nodes = document.querySelectorAll(".reveal");
		nodes.forEach((node) => observer.observe(node));

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const panel = heroRef.current;
		if (!panel) {
			return undefined;
		}

		const handleMove = (event: MouseEvent) => {
			const rect = panel.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = (event.clientX - cx) / rect.width;
			const dy = (event.clientY - cy) / rect.height;
			const rotateX = dy * -8;
			const rotateY = dx * 12;

			panel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		};

		const resetTilt = () => {
			panel.style.transform = "rotateX(0deg) rotateY(0deg)";
		};

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseleave", resetTilt);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseleave", resetTilt);
		};
	}, []);

	useEffect(() => {
		return () => {
			if (resetTimerRef.current) {
				window.clearTimeout(resetTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (typeof document === "undefined") {
			return undefined;
		}

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = mobileOpen ? "hidden" : originalOverflow;

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [mobileOpen]);

	useEffect(() => {
		if (!mobileOpen) {
			return undefined;
		}

		const handleKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileOpen(false);
			}
		};

		window.addEventListener("keydown", handleKey);

		return () => window.removeEventListener("keydown", handleKey);
	}, [mobileOpen]);

	const handleFeedbackChange = (
		field: "name" | "email" | "segment" | "message"
	) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setFeedbackForm((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!feedbackForm.name.trim() || !feedbackForm.email.trim() || !feedbackForm.message.trim()) {
			return;
		}

		setFeedbackStatus("sending");

		window.setTimeout(() => {
			setFeedbackStatus("sent");
		}, 600);
	};

	useEffect(() => {
		if (feedbackStatus !== "sent") {
			return undefined;
		}

		const timer = window.setTimeout(() => {
			setFeedbackStatus("idle");
			setFeedbackForm({ name: "", email: "", segment: "student", message: "" });
		}, 2200);

		return () => window.clearTimeout(timer);
	}, [feedbackStatus]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email) {
			return;
		}

		setSubmitted(true);
		setEmail("");

		if (resetTimerRef.current) {
			window.clearTimeout(resetTimerRef.current);
		}

		resetTimerRef.current = window.setTimeout(() => {
			setSubmitted(false);
			resetTimerRef.current = null;
		}, 1700);
	};

	return (
		<div className="page-wrapper">
			<header className="top-nav-wrapper">
				<div className="page-shell">
					<div className="top-nav">
						<a href="/" className="brand">
							<span className="brand-mark">Career Prep Platform</span>
							<span className="brand-sub">Career Launch Studio</span>
						</a>
						<nav className="nav-links hidden md:flex">
							{navLinks.map((link) => (
								<a key={link.label} href={link.href} className="nav-link">
									{link.label}
								</a>
							))}
							<button type="button" onClick={handleJoinClick} className="primary-link">
								Join waitlist
							</button>
						</nav>
						<button
							type="button"
							className={`hamburger md:hidden ${mobileOpen ? "open" : ""}`}
							aria-label="Toggle navigation"
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((prev) => !prev)}
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
				{mobileOpen && (
					<div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Main navigation">
						<div className="mobile-drawer__backdrop" onClick={() => setMobileOpen(false)} />
						<div className="mobile-drawer__panel">
							<div className="mobile-drawer__header">
								<span className="brand-mark">Career Prep Platform</span>
								<button
									type="button"
									className="hamburger open"
									aria-label="Close navigation"
									onClick={() => setMobileOpen(false)}
								>
									<span />
									<span />
									<span />
								</button>
							</div>
							<nav className="mobile-drawer__nav">
								{navLinks.map((link) => (
									<a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
										{link.label}
									</a>
								))}
							</nav>
							<button type="button" onClick={handleJoinClick} className="primary-link">
								Join waitlist
							</button>
						</div>
					</div>
				)}
			</header>

			<div className="coming-soon-banner">
				<div className="page-shell coming-soon-banner__inner">
					<span>Coming soon — Career Prep Platform is in private beta and not yet accepting purchases. Join the waitlist to be the first to know when we launch.</span>
				</div>
			</div>

			<main>
				<section className="hero-block">
					<div className="page-shell hero-inner">
						<div className="hero-content">
							<span className="eyebrow reveal">All-in-one platform</span>
							<h1 className="hero-title reveal" style={{ transitionDelay: "90ms" }}>
								Mentorship, mock interviews, and real projects in one platform.
							</h1>
							<p className="hero-lead reveal" style={{ transitionDelay: "160ms" }}>
								Career Prep Platform helps university students build confidence before graduation by pairing them with mentors, interview
								practice, and project-based learning that fits their schedule — all beyond the limits of traditional campus career centers.
							</p>
							<div className="hero-cta reveal" style={{ transitionDelay: "210ms" }}>
								<button className="cta primary" type="button" onClick={handleJoinClick}>
									Join the waitlist
								</button>
								<a className="cta secondary" href="#product">
									Explore the product
								</a>
								<a className="cta ghost" href="#feedback">
									Share feedback
								</a>
							</div>
							<div className="highlight-list reveal" style={{ transitionDelay: "280ms" }}>
								{heroHighlights.map((item) => (
									<div key={item.title} className="highlight-item">
										<strong>{item.title}</strong>
										<p>{item.description}</p>
									</div>
								))}
							</div>
						</div>

						<div className="hero-visual tilt" ref={heroRef}>
							<div className="hero-panel">
								<div className="hero-panel__header">
									<span>Launchboard</span>
									<span>Platform dashboard</span>
								</div>
								<div className="hero-panel__body">
									<div className="hero-screen">
										<div className="hero-screen__title">Milestone timeline</div>
										<ul>
											<li>
												<span>Today</span>
												<span>Mentor match confirmed</span>
											</li>
											<li>
												<span>Tomorrow</span>
												<span>Mock interview scheduled</span>
											</li>
											<li>
												<span>Next week</span>
												<span>Project brief submitted</span>
											</li>
										</ul>
									</div>
									<div className="floating-card floating-card__one">
										<span className="floating-label">Mentor feedback</span>
										<p>“Highlight how you translated research into the marketing launch plan.”</p>
									</div>
									<div className="floating-card floating-card__two">
										<span className="floating-label">Confidence tracker</span>
										<strong>In progress</strong>
										<small>See how coaching and projects build momentum.</small>
									</div>
								</div>
								<div className="glow-ring" aria-hidden />
							</div>
						</div>
					</div>
				</section>

				<section className="ticker" aria-label="In-program experiences">
					<div className="ticker-track">
						{marqueeItems.concat(marqueeItems).map((item, index) => (
							<span key={`${item}-${index}`} className="ticker-item">
								{item}
							</span>
						))}
					</div>
				</section>

				<section id="product" className="page-shell section-spacing">
					<div className="section-heading">
						<span className="section-tag">Product</span>
						<h2 className="section-title">Explore the Career Prep Platform journey today.</h2>
						<p className="section-lead">
							Match with mentors, schedule mock interviews, and browse real project briefs — the core loops students will use once we go live.
						</p>
					</div>
					<div className="functional-grid">
						<article className="module-card reveal" style={{ transitionDelay: "110ms" }}>
							<div className="module-card__header">
								<span className="tag-pill">Mentor loop</span>
								<h3>Match with a mentor who fits your goals</h3>
								<p>Choose a focus area to see the mentors ready to coach you through that next milestone.</p>
							</div>
							<div className="module-card__body mentor-module">
								<div className="mentor-filters">
									{mentorInterests.map((interest) => (
										<button
											type="button"
											key={interest}
											className={`filter-chip ${selectedInterest === interest ? "active" : ""}`}
											onClick={() => setSelectedInterest(interest)}
										>
											{interest}
										</button>
									))}
								</div>
								<div className="mentor-module__grid">
									<div className="mentor-list">
										{filteredMentors.map((mentor) => (
											<button
												type="button"
												key={mentor.id}
												className={`mentor-card ${mentor.id === selectedMentorId ? "active" : ""}`}
												onClick={() => setSelectedMentorId(mentor.id)}
											>
												<span className="mentor-initials" aria-hidden>
													{mentor.initials}
												</span>
												<div>
													<strong>{mentor.name}</strong>
													<span>{mentor.title}</span>
													<small>{mentor.meetingStyle}</small>
												</div>
											</button>
										))}
										{filteredMentors.length === 0 && <p className="empty-state">We’re onboarding mentors in this area — leave your request below.</p>}
									</div>
									{activeMentor && (
										<div className="mentor-detail">
											<h4>{activeMentor.name}</h4>
											<p className="mentor-title">{activeMentor.title}</p>
											<p>{activeMentor.summary}</p>
											<ul className="mentor-meta">
												<li>
													<strong>Meeting style</strong>
													<span>{activeMentor.meetingStyle}</span>
												</li>
												<li>
													<strong>Students coached</strong>
													<span>{activeMentor.studentsHelped}</span>
												</li>
												<li>
													<strong>Availability</strong>
													<span>{activeMentor.availability.join(" · ")}</span>
												</li>
											</ul>
											<ul className="mentor-highlights">
												{activeMentor.highlights.map((highlight) => (
													<li key={highlight}>{highlight}</li>
												))}
											</ul>
											<button type="button" className="cta secondary" onClick={handleJoinClick}>
												Request this mentor
											</button>
										</div>
									)}
								</div>
							</div>
						</article>
						<article className="module-card reveal" style={{ transitionDelay: "180ms" }}>
							<div className="module-card__header">
								<span className="tag-pill">Mock interviews</span>
								<h3>Hold a slot for your next interview rep</h3>
								<p>Select a track, grab a slot, and we’ll pair you with mentors who run that interview loop.</p>
							</div>
							<div className="module-card__body interview-module">
								<div className="interview-tracks">
									{interviewTracks.map((track) => (
										<button
											type="button"
											key={track.id}
											className={`filter-chip ${selectedTrack === track.id ? "active" : ""}`}
											onClick={() => setSelectedTrack(track.id)}
										>
											{track.label}
										</button>
									))}
								</div>
								<p className="module-description">{activeTrack.description}</p>
								<div className="slot-grid">
									{activeTrack.slots.map((slot) => (
										<button
											type="button"
											key={slot.id}
											className={`slot-button ${selectedSlot === slot.id ? "selected" : ""}`}
											onClick={() => setSelectedSlot(slot.id)}
										>
											<strong>{slot.label}</strong>
											<span>{slot.interviewer}</span>
											<small>
												{slot.format} · {slot.notes}
											</small>
										</button>
									))}
								</div>
								<div className="slot-meta">
									<div className="slot-focus">
										<strong>Focus areas</strong>
										<ul>
											{activeTrack.focus.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									</div>
									<button
										type="button"
										className="cta primary"
										onClick={handleJoinClick}
										disabled={!selectedSlot}
									>
										{selectedSlot ? "Hold this interview slot" : "Select a slot"}
									</button>
								</div>
							</div>
						</article>
						<article className="module-card reveal" style={{ transitionDelay: "250ms" }}>
							<div className="module-card__header">
								<span className="tag-pill">Project labs</span>
								<h3>Browse the project briefs students will ship</h3>
								<p>Preview the employer-backed briefs in rotation and the milestones that prove job-ready skills.</p>
							</div>
							<div className="module-card__body project-module">
								<div className="project-layout">
									<div className="brief-list">
										{projectBriefs.map((brief) => (
											<button
												type="button"
												key={brief.id}
												className={`brief-item ${selectedBriefId === brief.id ? "active" : ""}`}
												onClick={() => setSelectedBriefId(brief.id)}
											>
												<strong>{brief.title}</strong>
												<span>{brief.sponsor}</span>
												<small>
													{brief.duration} · {brief.teamSize}
												</small>
											</button>
										))}
									</div>
									{activeBrief && (
										<div className="brief-detail">
											<span className="brief-sponsor">{activeBrief.sponsor}</span>
											<h4>{activeBrief.title}</h4>
											<p>{activeBrief.summary}</p>
											<div className="brief-meta">
												<div>
													<strong>Milestones</strong>
													<ol>
														{activeBrief.milestones.map((milestone) => (
															<li key={milestone}>{milestone}</li>
														))}
													</ol>
												</div>
												<div>
													<strong>Deliverables</strong>
													<div className="tag-row">
														{activeBrief.deliverables.map((item) => (
															<span key={item}>{item}</span>
														))}
													</div>
												</div>
											</div>
											<button type="button" className="cta secondary" onClick={handleJoinClick}>
												Partner on this brief
											</button>
										</div>
									)}
								</div>
							</div>
						</article>
					</div>
				</section>

				<section id="approach" className="page-shell section-spacing">
					<div className="section-heading">
						<span className="section-tag">Approach</span>
						<h2 className="section-title">Principles that keep progress visible.</h2>
					</div>
					<div className="values-grid">
						{values.map((value, index) => (
							<article
								key={value.title}
								className="value-card reveal"
								style={{ transitionDelay: `${70 + index * 70}ms` }}
							>
								<span className="value-icon" aria-hidden>
									{value.icon}
								</span>
								<h3>{value.title}</h3>
								<p>{value.description}</p>
							</article>
						))}
					</div>
				</section>

				<section id="feedback" className="page-shell section-spacing">
					<div className="section-heading">
						<span className="section-tag">Feedback</span>
						<h2 className="section-title">Tell us if these features hit the mark.</h2>
						<p className="section-lead">
							After you try the mentor loop, mock interviews, and project labs above, drop feedback so we know what to prioritize next.
						</p>
					</div>
					<div className="feedback-layout">
						<aside className="feedback-panel">
							<h3>Ways to collaborate</h3>
							<ul>
								{feedbackPrompts.map((prompt) => (
									<li key={prompt.title}>
										<strong>{prompt.title}</strong>
										<span>{prompt.description}</span>
									</li>
								))}
							</ul>
						</aside>
						<form className="feedback-form" onSubmit={handleFeedbackSubmit}>
							<div className="feedback-grid">
								<label>
									<span>Name</span>
									<input
										type="text"
										value={feedbackForm.name}
										onChange={handleFeedbackChange("name")}
										required
									/>
								</label>
								<label>
									<span>Email</span>
									<input
										type="email"
										value={feedbackForm.email}
										onChange={handleFeedbackChange("email")}
										required
									/>
								</label>
							</div>
							<label>
								<span>Which describes you best?</span>
								<select value={feedbackForm.segment} onChange={handleFeedbackChange("segment")}>
									<option value="student">Student</option>
									<option value="mentor">Mentor</option>
									<option value="employer">Employer / recruiter</option>
									<option value="career-center">Career center team</option>
								</select>
							</label>
							<label>
								<span>What should we build or change before launch?</span>
								<textarea
									rows={5}
									value={feedbackForm.message}
									onChange={handleFeedbackChange("message")}
									required
								/>
							</label>
							<button type="submit" className="cta primary" disabled={feedbackStatus === "sending"}>
								{feedbackStatus === "sending" ? "Sending..." : "Submit feedback"}
							</button>
							{feedbackStatus === "sent" && <p className="feedback-success">Thanks for helping shape Career Prep Platform! We’ll reply soon.</p>}
						</form>
					</div>
				</section>

				<section id="about" className="page-shell section-spacing about-section">
					<div className="section-heading">
						<span className="section-tag">About us</span>
						<h2 className="section-title">The mission and roadmap behind Career Prep Platform.</h2>
						<p className="section-lead">
							We combine mentorship, mock interviews, and employer projects into one flow so students gain real experience before graduation.
						</p>
					</div>
					<div className="mission-grid">
						{aboutHighlights.map((item, index) => (
							<article
								key={item.label}
								className="mission-card reveal"
								style={{ transitionDelay: `${80 + index * 80}ms` }}
							>
								<span className="mission-label">{item.label}</span>
								<p>{item.body}</p>
							</article>
						))}
					</div>
					<article className="difference-card reveal" style={{ transitionDelay: "320ms" }}>
						<h3>What makes us different</h3>
						<ul>
							{aboutDifferentiators.map((point) => (
								<li key={point}>{point}</li>
							))}
						</ul>
				</article>
				</section>

				<section className="page-shell section-spacing" id="contact">
					<div className="cta-panel">
						<div>
							<span className="section-tag">Contact</span>
							<h2>Bring Career Prep Platform to your campus or organization.</h2>
							<p>
								Tell us what you’re building and we’ll share the right launch plan — from mentor programs to real project labs.
							</p>
						</div>
						<div className="cta-actions">
							<button className="cta primary" type="button" onClick={handleJoinClick}>
								Request a walk-through
							</button>
							<a className="cta secondary" href="mailto:hello@careerprepplatform.com">
								hello@careerprepplatform.com
							</a>
						</div>
					</div>
				</section>
			</main>

			<footer className="page-shell site-footer">
				<div className="footer-brand">
					<span className="brand-mark">Career Prep Platform</span>
					<span className="brand-sub">Career Launch Studio</span>
				</div>
				<div className="footer-links">
					{navLinks.map((link) => (
						<a key={link.label} href={link.href}>
							{link.label}
						</a>
					))}
					<a href="mailto:hello@careerprepplatform.com">Email</a>
				</div>
				<p className="footer-meta">© {new Date().getFullYear()} Career Prep Platform Collective. Crafted in partnership with mentors worldwide.</p>
			</footer>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" role="dialog" aria-modal="true">
					<div className="modal-card">
						<h3>{submitted ? "You’re on the list!" : "Reserve your invite"}</h3>
						{!submitted ? (
							<form onSubmit={handleSubmit} className="modal-form">
								<label className="sr-hidden" htmlFor="email">
									Work email
								</label>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@organization.com"
									required
								/>
								<div className="modal-actions">
									<button type="submit" className="cta primary">
										Join waitlist
									</button>
									<button type="button" className="cta ghost" onClick={() => setShowModal(false)}>
										Cancel
									</button>
								</div>
							</form>
						) : (
							<p className="modal-success">We’ll reach out within 48 hours with next steps.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
