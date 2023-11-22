"use client";
import { Typewriter } from "react-simple-typewriter";
const AnimatedHeader = ({
  fontSize,
  words,
  courser,
  typeSpeed,
}: {
  fontSize: string;
  words: string;
  courser: string;
  typeSpeed: number;
}) => {
  return (
    <div className="App">
      <h1 style={{ fontWeight: "normal", fontSize: fontSize }}>
        <span style={{ fontWeight: "bold" }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={[words]}
            cursor
            cursorStyle={`${courser}`}
            typeSpeed={typeSpeed}
            deleteSpeed={800}
            delaySpeed={1000}
            // onLoopDone={handleDone}
            // onType={handleType}
          />
        </span>
      </h1>
    </div>
  );
};

export default AnimatedHeader;
