// import { useState } from "react";
import { useState, useRef } from "react";
import "./Home.css";




const TAB_PLACEHOLDERS = {
    shots: "What type of design are you interested in?",
    designers: "What type of designer do you need?",
    services: "What do you need designed?",
};

const TAB_TAGS = {
    shots: ["dashboard", "landing page", "e-commerce", "logo", "card", "icons"],
    designers: ["app design", "landing page", "web design", "dashboard", "logo design"],
    services: ["branding", "logo design", "mobile app", "illustration", "animation"],
};

/* ── ICONS ── */
const ShotsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M16.2 21H6.93137C6.32555 21 6.02265 21 5.88238 20.8802C5.76068 20.7763 5.69609 20.6203 5.70865 20.4608C5.72312 20.2769 5.93731 20.0627 6.36569 19.6343L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21 15V16.2M16.2 21C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
);

const DesignersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
);

const ServicesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M12.5 11H8M9 15H8M16 7H8M16.9973 14.8306C16.1975 13.9216 14.8639 13.6771 13.8619 14.5094C12.8599 15.3418 12.7188 16.7335 13.5057 17.7179C14.2926 18.7024 16.9973 21 16.9973 21C16.9973 21 19.7019 18.7024 20.4888 17.7179C21.2757 16.7335 21.1519 15.3331 20.1326 14.5094C19.1134 13.6858 17.797 13.9216 16.9973 14.8306Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.2">
        <circle cx="9" cy="9" r="6" />
        <path d="M15 15l3 3" />
    </svg>
);

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="black">
        <path d="M8 5v14l11-7L8 5z" />
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="black">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
    </svg>
);

/* ── MAIN HOME COMPONENT ── */
export default function Home({ activeTab, onTabChange }) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    return (
        <div className="home">
            <section className="hero">

                {/* ── LEFT ── */}
                <div className="hero-left">
                    <h1 className="hero-title">
                        Discover the<br />
                        World's Top  Designers
                    </h1>
                    <p className="hero-subtitle">
                        Explore work from the most talented and accomplished designers ready to take on your next project.
                    </p>

                    {/* Tabs: Shots / Designers / Services */}
                    <div className="hero-tabs">
                        <button
                            className={`hero-tab ${activeTab === "shots" ? "active" : ""}`}
                            onClick={() => onTabChange("shots")}
                        >
                            <ShotsIcon /> Shots
                        </button>
                        <button
                            className={`hero-tab ${activeTab === "designers" ? "active" : ""}`}
                            onClick={() => onTabChange("designers")}
                        >
                            <DesignersIcon /> Designers
                        </button>
                        <button
                            className={`hero-tab ${activeTab === "services" ? "active" : ""}`}
                            onClick={() => onTabChange("services")}
                        >
                            <ServicesIcon /> Services
                        </button>
                    </div>

                    {/* Search */}
                    <div className="hero-search">
                        <input
                            type="text"
                            className="hero-search-input"
                            placeholder={TAB_PLACEHOLDERS[activeTab]}
                        />
                        <button className="hero-search-btn">
                            <SearchIcon />
                        </button>
                    </div>

                    {/* Popular Tags */}
                    <div className="popular-row">
                        <span className="popular-label">Popular:</span>
                        {TAB_TAGS[activeTab].map(tag => (
                            <a key={tag} href="#" className="tag-pill">{tag}</a>
                        ))}
                    </div>

                    {/* Project Brief CTA */}
                    <div className="brief-cta">
                        <button className="brief-btn">
                            ✦ Start a Project Brief
                            <span className="brief-badge">NEW</span>
                        </button>
                        <p className="brief-text">
                            Tell us what you need and instantly connect with world-class talent ready to work on your project.
                        </p>
                    </div>
                </div>

                {/* ── RIGHT: Video ── */}
                <div className="hero-right">
                    <div className="hero-video-placeholder">
                        <div className="video-play-icon">
                            {/* <PlayIcon /> */}
                            <div className="hero-video-placeholder-ma">
                                <video
                                // src="/src/assets/video.mp4"   
                                src="/video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="hero-video-el"
                            /></div>
                            
                        </div>
                        
                    </div>

                    {/* Author chip */}
                    {/* <div className="video-author-chip">
                        <div className="video-author-avatar">XY</div>
                        Xin Yan
                    </div> */}

                    {/* Play/Pause */}
                    {/* <button className="video-play-btn" onClick={() => setPlaying(p => !p)}>
                        {playing ? <PauseIcon /> : <PlayIcon />}
                    </button> */}
                </div>

            </section>
        </div>
    );
}