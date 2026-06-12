import "./CardsFooter.css";
// import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function CardsFooter({ user }) {

    // 👉 hide completely if user logged in
    if (user) return null;
    

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="cards-footer">

            {/* SIGN UP + SCROLL */}
            {/* <div className="cards-signup-wrap">
        <a href="/signup" className="cards-signup-btn">
          Sign up to continue
        </a>

        <button
          className="cards-scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon width={18} height={18} />
        </button>
      </div> */}
            {/* ── SIGN UP BUTTON + SCROLL TOP ── */}
            <div className="cfooter-signup-wrap">
                <a href="/signup" className="footer-signup-btn">
                    Sign up to continue
                </a>
                {/* <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUpIcon />
        </button> */}
                <button
                    className="cards-scroll-top"
                    onClick={scrollToTop}
                >
                    <img width="50" height="50" class="lazyloading-hidden ls-is-cached lazyloaded" data-src="https://cdn.dribbble.com/assets/icon-backtotop-v2-9f3ef55e9788120b9b7764af9e386b31599c413703860e124c692db30efad7f2.png" alt="Back to top" src="https://cdn.dribbble.com/assets/icon-backtotop-v2-9f3ef55e9788120b9b7764af9e386b31599c413703860e124c692db30efad7f2.png"/>
                </button>
            </div>

        </div>
    );
}