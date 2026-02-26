import { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children }) => {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current); // 한 번만 작동
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
     className={`transition-all duration-[2000ms] ease-in-out transform p-6 bg-white dark:bg-gray-800 rounded shadow ${
       isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;