import type { CSSProperties, ReactNode } from "react";

function BranchLeaves({
  flip = false,
  className = "",
  idPrefix = "branch",
}: {
  flip?: boolean;
  className?: string;
  idPrefix?: string;
}) {
  const transform = flip ? "scale(-1, 1) translate(-400, 0)" : undefined;

  return (
    <svg
      className={`h-auto w-full ${className}`}
      viewBox="0 0 400 500"
      fill="none"
      aria-hidden
      style={{ transform }}
    >
      <defs>
        <linearGradient id={`${idPrefix}-leafPink`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-leafLavender`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-leafSoft`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.8" />
        </linearGradient>
        <filter id={`${idPrefix}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <g filter={`url(#${idPrefix}-soft)`} opacity="1">
        <path
          d="M30 480 C50 420 35 350 70 280 C95 230 120 180 145 130 C165 90 175 55 185 25"
          stroke="#c084fc"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.82"
        />
        <path
          d="M70 280 C85 260 95 245 105 230"
          stroke="#e879f9"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M100 200 C115 195 125 188 138 178"
          stroke="#f472b6"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.72"
        />
        <ellipse cx="118" cy="248" rx="22" ry="12" fill={`url(#${idPrefix}-leafPink)`} transform="rotate(-35 118 248)" />
        <ellipse cx="95" cy="218" rx="19" ry="10" fill={`url(#${idPrefix}-leafLavender)`} transform="rotate(-50 95 218)" />
        <ellipse cx="128" cy="195" rx="21" ry="11" fill={`url(#${idPrefix}-leafSoft)`} transform="rotate(-25 128 195)" />
        <ellipse cx="108" cy="168" rx="18" ry="10" fill={`url(#${idPrefix}-leafPink)`} transform="rotate(-40 108 168)" />
        <ellipse cx="140" cy="148" rx="20" ry="11" fill={`url(#${idPrefix}-leafLavender)`} transform="rotate(-20 140 148)" />
        <ellipse cx="122" cy="118" rx="17" ry="9" fill={`url(#${idPrefix}-leafSoft)`} transform="rotate(-45 122 118)" />
        <ellipse cx="155" cy="98" rx="19" ry="10" fill={`url(#${idPrefix}-leafPink)`} transform="rotate(-30 155 98)" />
        <ellipse cx="138" cy="72" rx="16" ry="9" fill={`url(#${idPrefix}-leafLavender)`} transform="rotate(-38 138 72)" />
        <ellipse cx="168" cy="52" rx="18" ry="10" fill={`url(#${idPrefix}-leafSoft)`} transform="rotate(-22 168 52)" />
        <ellipse cx="178" cy="30" rx="14" ry="8" fill={`url(#${idPrefix}-leafPink)`} transform="rotate(-35 178 30)" />
        <path
          d="M145 130 C165 125 180 115 195 100"
          stroke="#e879f9"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.72"
        />
        <ellipse cx="188" cy="108" rx="16" ry="9" fill={`url(#${idPrefix}-leafLavender)`} transform="rotate(15 188 108)" />
        <ellipse cx="200" cy="95" rx="14" ry="8" fill={`url(#${idPrefix}-leafPink)`} transform="rotate(25 200 95)" />
      </g>
    </svg>
  );
}

function BranchCornerSmall({
  flip = false,
  idPrefix = "small",
}: {
  flip?: boolean;
  idPrefix?: string;
}) {
  const transform = flip ? "scale(-1, 1) translate(-300, 0)" : undefined;

  return (
    <svg viewBox="0 0 300 360" fill="none" aria-hidden className="h-auto w-full" style={{ transform }}>
      <defs>
        <linearGradient id={`${idPrefix}-leafSmall`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.82" />
        </linearGradient>
        <filter id={`${idPrefix}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      <g filter={`url(#${idPrefix}-blur)`} opacity="1">
        <path
          d="M20 340 C35 290 25 240 55 190 C75 155 95 125 115 95"
          stroke="#c084fc"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.78"
        />
        <ellipse cx="72" cy="210" rx="17" ry="9" fill={`url(#${idPrefix}-leafSmall)`} transform="rotate(-40 72 210)" />
        <ellipse cx="58" cy="178" rx="15" ry="8" fill={`url(#${idPrefix}-leafSmall)`} transform="rotate(-52 58 178)" />
        <ellipse cx="88" cy="158" rx="16" ry="9" fill={`url(#${idPrefix}-leafSmall)`} transform="rotate(-28 88 158)" />
        <ellipse cx="105" cy="118" rx="14" ry="8" fill={`url(#${idPrefix}-leafSmall)`} transform="rotate(-35 105 118)" />
        <ellipse cx="118" cy="88" rx="13" ry="7" fill={`url(#${idPrefix}-leafSmall)`} transform="rotate(-42 118 88)" />
      </g>
    </svg>
  );
}

type BranchPlacement = {
  id: string;
  size: "large" | "small";
  flip?: boolean;
  rotate?: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  opacity: number;
};

function generateExtraBranches(): BranchPlacement[] {
  const branches: BranchPlacement[] = [];

  for (let i = 0; i < 18; i++) {
    branches.push({
      id: `ex-l-${i}`,
      size: i % 4 === 0 ? "large" : "small",
      top: `${3 + i * 5.4}%`,
      left: `${-95 - (i % 4) * 28}px`,
      width: `min(${210 + (i % 5) * 38}px, ${23 + (i % 4) * 4}vw)`,
      opacity: 0.62 + (i % 4) * 0.08,
      rotate: 6 + (i % 6) * 7,
    });
  }

  for (let i = 0; i < 18; i++) {
    branches.push({
      id: `ex-r-${i}`,
      size: i % 4 === 0 ? "large" : "small",
      flip: true,
      top: `${4 + i * 5.2}%`,
      right: `${-90 - (i % 4) * 26}px`,
      width: `min(${205 + (i % 5) * 36}px, ${22 + (i % 4) * 4}vw)`,
      opacity: 0.6 + (i % 4) * 0.08,
      rotate: -(5 + (i % 6) * 7),
    });
  }

  for (let i = 0; i < 30; i++) {
    const isLeft = i % 2 === 0;
    branches.push({
      id: `ex-in-${i}`,
      size: "small",
      flip: !isLeft,
      top: `${5 + (i % 15) * 6.2}%`,
      ...(isLeft
        ? { left: `${4 + (i % 5) * 4.5}%` }
        : { right: `${3 + (i % 5) * 4.5}%` }),
      width: `min(${105 + (i % 4) * 28}px, ${11 + (i % 4) * 3}vw)`,
      opacity: 0.48 + (i % 5) * 0.07,
      rotate: isLeft ? 10 + (i % 7) * 5 : -(8 + (i % 7) * 5),
    });
  }

  for (let i = 0; i < 12; i++) {
    branches.push({
      id: `ex-t-${i}`,
      size: i % 3 === 0 ? "large" : "small",
      flip: i % 2 === 1,
      top: `${8 + (i % 6) * 18}px`,
      left: `${6 + i * 7.5}%`,
      width: `min(${230 + i * 12}px, ${25 + (i % 3) * 3}vw)`,
      opacity: 0.58 + (i % 3) * 0.1,
      rotate: i % 2 === 0 ? 12 : -14,
    });
    branches.push({
      id: `ex-b-${i}`,
      size: i % 3 === 0 ? "large" : "small",
      flip: i % 2 === 0,
      bottom: `${6 + (i % 6) * 16}px`,
      left: `${5 + i * 7.8}%`,
      width: `min(${220 + i * 10}px, ${24 + (i % 3) * 3}vw)`,
      opacity: 0.56 + (i % 3) * 0.1,
      rotate: i % 2 === 1 ? 9 : -11,
    });
  }

  return branches;
}

const branchPlacements: BranchPlacement[] = [
  { id: "tl1", size: "large", top: "-20px", left: "-140px", width: "min(640px, 68vw)", opacity: 0.95 },
  { id: "tl2", size: "large", flip: true, top: "80px", left: "-100px", width: "min(480px, 52vw)", opacity: 0.78, rotate: 18 },
  { id: "tl3", size: "small", top: "200px", left: "-50px", width: "min(320px, 34vw)", opacity: 0.68, rotate: 12 },
  { id: "tl4", size: "small", top: "12%", left: "2%", width: "min(280px, 30vw)", opacity: 0.62, rotate: 22 },
  { id: "tl5", size: "small", top: "32%", left: "-30px", width: "min(260px, 28vw)", opacity: 0.58, rotate: 8 },

  { id: "tr1", size: "large", flip: true, top: "-10px", right: "-150px", width: "min(640px, 68vw)", opacity: 0.92 },
  { id: "tr2", size: "large", top: "100px", right: "-110px", width: "min(460px, 50vw)", opacity: 0.76, rotate: -16 },
  { id: "tr3", size: "small", flip: true, top: "220px", right: "-40px", width: "min(300px, 32vw)", opacity: 0.66, rotate: -10 },
  { id: "tr4", size: "small", flip: true, top: "14%", right: "1%", width: "min(270px, 29vw)", opacity: 0.6, rotate: -24 },
  { id: "tr5", size: "small", flip: true, top: "35%", right: "-25px", width: "min(250px, 27vw)", opacity: 0.55, rotate: -6 },

  { id: "bl1", size: "large", bottom: "-40px", left: "-110px", width: "min(560px, 62vw)", opacity: 0.88, rotate: 12 },
  { id: "bl2", size: "large", bottom: "120px", left: "-90px", width: "min(420px, 46vw)", opacity: 0.72, rotate: 20 },
  { id: "bl3", size: "small", bottom: "28%", left: "-35px", width: "min(300px, 32vw)", opacity: 0.64, rotate: 14 },
  { id: "bl4", size: "small", bottom: "12%", left: "3%", width: "min(280px, 30vw)", opacity: 0.58, rotate: 28 },
  { id: "bl5", size: "small", bottom: "45%", left: "-20px", width: "min(240px, 26vw)", opacity: 0.52, rotate: 6 },

  { id: "br1", size: "large", flip: true, bottom: "-50px", right: "-110px", width: "min(560px, 62vw)", opacity: 0.88, rotate: -12 },
  { id: "br2", size: "large", flip: true, bottom: "100px", right: "-85px", width: "min(400px, 44vw)", opacity: 0.7, rotate: -18 },
  { id: "br3", size: "small", flip: true, bottom: "26%", right: "-30px", width: "min(290px, 31vw)", opacity: 0.62, rotate: -14 },
  { id: "br4", size: "small", flip: true, bottom: "10%", right: "2%", width: "min(270px, 29vw)", opacity: 0.56, rotate: -26 },
  { id: "br5", size: "small", flip: true, bottom: "48%", right: "-15px", width: "min(230px, 25vw)", opacity: 0.5, rotate: -8 },

  { id: "ml1", size: "large", top: "18%", left: "-150px", width: "min(500px, 56vw)", opacity: 0.8, rotate: 6 },
  { id: "ml2", size: "large", top: "52%", left: "-130px", width: "min(460px, 50vw)", opacity: 0.74, rotate: -4 },
  { id: "ml3", size: "small", top: "68%", left: "-60px", width: "min(320px, 34vw)", opacity: 0.62, rotate: 16 },
  { id: "ml4", size: "small", top: "38%", left: "5%", width: "min(260px, 28vw)", opacity: 0.54, rotate: 10 },

  { id: "mr1", size: "large", flip: true, top: "22%", right: "-150px", width: "min(500px, 56vw)", opacity: 0.78, rotate: -6 },
  { id: "mr2", size: "large", flip: true, top: "55%", right: "-125px", width: "min(440px, 48vw)", opacity: 0.72, rotate: 4 },
  { id: "mr3", size: "small", flip: true, top: "72%", right: "-55px", width: "min(310px, 33vw)", opacity: 0.6, rotate: -16 },
  { id: "mr4", size: "small", flip: true, top: "42%", right: "4%", width: "min(250px, 27vw)", opacity: 0.52, rotate: -12 },

  { id: "tc1", size: "small", flip: true, top: "40px", left: "50%", width: "min(300px, 32vw)", opacity: 0.62, rotate: -4 },
  { id: "tc2", size: "small", top: "90px", left: "28%", width: "min(260px, 28vw)", opacity: 0.55, rotate: 14 },
  { id: "tc3", size: "small", flip: true, top: "70px", right: "22%", width: "min(240px, 26vw)", opacity: 0.52, rotate: -20 },

  { id: "bc1", size: "large", bottom: "-60px", left: "50%", width: "min(480px, 54vw)", opacity: 0.72, rotate: 4 },
  { id: "bc2", size: "small", bottom: "8%", left: "22%", width: "min(280px, 30vw)", opacity: 0.58, rotate: 12 },
  { id: "bc3", size: "small", flip: true, bottom: "6%", right: "20%", width: "min(260px, 28vw)", opacity: 0.54, rotate: -10 },

  { id: "in1", size: "small", top: "24%", left: "12%", width: "min(220px, 24vw)", opacity: 0.48, rotate: 32 },
  { id: "in2", size: "small", flip: true, top: "28%", right: "10%", width: "min(210px, 23vw)", opacity: 0.45, rotate: -28 },
  { id: "in3", size: "small", top: "58%", left: "8%", width: "min(200px, 22vw)", opacity: 0.42, rotate: 18 },
  { id: "in4", size: "small", flip: true, top: "62%", right: "7%", width: "min(195px, 21vw)", opacity: 0.4, rotate: -22 },
  { id: "in5", size: "small", top: "78%", left: "14%", width: "min(185px, 20vw)", opacity: 0.38, rotate: 8 },
  { id: "in6", size: "small", flip: true, top: "82%", right: "12%", width: "min(180px, 19vw)", opacity: 0.36, rotate: -14 },
  { id: "in7", size: "small", top: "46%", left: "16%", width: "min(175px, 18vw)", opacity: 0.34, rotate: 24 },
  { id: "in8", size: "small", flip: true, top: "50%", right: "15%", width: "min(170px, 18vw)", opacity: 0.34, rotate: -18 },

  { id: "tl6", size: "small", top: "6%", left: "-80px", width: "min(300px, 32vw)", opacity: 0.6, rotate: 30 },
  { id: "tl7", size: "large", top: "150px", left: "-120px", width: "min(400px, 44vw)", opacity: 0.66, rotate: 24 },
  { id: "tl8", size: "small", top: "48%", left: "-45px", width: "min(220px, 24vw)", opacity: 0.5, rotate: 16 },
  { id: "tl9", size: "small", top: "65%", left: "1%", width: "min(200px, 22vw)", opacity: 0.44, rotate: 20 },
  { id: "tl10", size: "small", top: "88%", left: "-25px", width: "min(240px, 26vw)", opacity: 0.48, rotate: 10 },

  { id: "tr6", size: "small", flip: true, top: "5%", right: "-75px", width: "min(290px, 31vw)", opacity: 0.58, rotate: -32 },
  { id: "tr7", size: "large", flip: true, top: "160px", right: "-115px", width: "min(390px, 42vw)", opacity: 0.64, rotate: -22 },
  { id: "tr8", size: "small", flip: true, top: "50%", right: "-42px", width: "min(215px, 23vw)", opacity: 0.48, rotate: -14 },
  { id: "tr9", size: "small", flip: true, top: "67%", right: "0%", width: "min(195px, 21vw)", opacity: 0.42, rotate: -18 },
  { id: "tr10", size: "small", flip: true, top: "90%", right: "-20px", width: "min(235px, 25vw)", opacity: 0.46, rotate: -8 },

  { id: "bl6", size: "small", bottom: "35%", left: "-55px", width: "min(270px, 29vw)", opacity: 0.56, rotate: 18 },
  { id: "bl7", size: "large", bottom: "200px", left: "-70px", width: "min(380px, 41vw)", opacity: 0.68, rotate: 14 },
  { id: "bl8", size: "small", bottom: "55%", left: "6%", width: "min(190px, 20vw)", opacity: 0.46, rotate: 26 },
  { id: "bl9", size: "small", bottom: "18%", left: "-15px", width: "min(210px, 23vw)", opacity: 0.5, rotate: 8 },
  { id: "bl10", size: "small", bottom: "2%", left: "10%", width: "min(250px, 27vw)", opacity: 0.54, rotate: 22 },

  { id: "br6", size: "small", flip: true, bottom: "33%", right: "-50px", width: "min(265px, 28vw)", opacity: 0.54, rotate: -20 },
  { id: "br7", size: "large", flip: true, bottom: "190px", right: "-65px", width: "min(370px, 40vw)", opacity: 0.66, rotate: -16 },
  { id: "br8", size: "small", flip: true, bottom: "53%", right: "5%", width: "min(185px, 20vw)", opacity: 0.44, rotate: -24 },
  { id: "br9", size: "small", flip: true, bottom: "16%", right: "-12px", width: "min(205px, 22vw)", opacity: 0.48, rotate: -6 },
  { id: "br10", size: "small", flip: true, bottom: "1%", right: "8%", width: "min(245px, 26vw)", opacity: 0.52, rotate: -20 },

  { id: "ml5", size: "large", top: "8%", left: "-100px", width: "min(420px, 45vw)", opacity: 0.7, rotate: 10 },
  { id: "ml6", size: "small", top: "30%", left: "-80px", width: "min(280px, 30vw)", opacity: 0.58, rotate: -8 },
  { id: "ml7", size: "small", top: "45%", left: "-45px", width: "min(240px, 26vw)", opacity: 0.5, rotate: 14 },
  { id: "ml8", size: "large", top: "78%", left: "-110px", width: "min(400px, 43vw)", opacity: 0.66, rotate: -6 },
  { id: "ml9", size: "small", top: "92%", left: "-35px", width: "min(260px, 28vw)", opacity: 0.52, rotate: 12 },
  { id: "ml10", size: "small", top: "62%", left: "3%", width: "min(180px, 19vw)", opacity: 0.4, rotate: 20 },

  { id: "mr5", size: "large", flip: true, top: "10%", right: "-95px", width: "min(410px, 44vw)", opacity: 0.68, rotate: -10 },
  { id: "mr6", size: "small", flip: true, top: "32%", right: "-75px", width: "min(275px, 29vw)", opacity: 0.56, rotate: 8 },
  { id: "mr7", size: "small", flip: true, top: "47%", right: "-40px", width: "min(235px, 25vw)", opacity: 0.48, rotate: -14 },
  { id: "mr8", size: "large", flip: true, top: "80%", right: "-105px", width: "min(390px, 42vw)", opacity: 0.64, rotate: 6 },
  { id: "mr9", size: "small", flip: true, top: "94%", right: "-30px", width: "min(255px, 27vw)", opacity: 0.5, rotate: -12 },
  { id: "mr10", size: "small", flip: true, top: "64%", right: "2%", width: "min(175px, 18vw)", opacity: 0.38, rotate: -20 },

  { id: "tc4", size: "small", top: "20px", left: "15%", width: "min(230px, 25vw)", opacity: 0.5, rotate: 8 },
  { id: "tc5", size: "small", flip: true, top: "30px", right: "12%", width: "min(220px, 24vw)", opacity: 0.48, rotate: -12 },
  { id: "tc6", size: "large", top: "55px", left: "50%", width: "min(360px, 38vw)", opacity: 0.58, rotate: -6 },
  { id: "tc7", size: "small", top: "130px", left: "38%", width: "min(200px, 21vw)", opacity: 0.42, rotate: 16 },
  { id: "tc8", size: "small", flip: true, top: "110px", right: "35%", width: "min(190px, 20vw)", opacity: 0.4, rotate: -16 },

  { id: "bc4", size: "large", bottom: "-30px", left: "30%", width: "min(350px, 37vw)", opacity: 0.6, rotate: 8 },
  { id: "bc5", size: "large", flip: true, bottom: "-25px", right: "28%", width: "min(340px, 36vw)", opacity: 0.58, rotate: -8 },
  { id: "bc6", size: "small", bottom: "15%", left: "50%", width: "min(250px, 27vw)", opacity: 0.5, rotate: 4 },
  { id: "bc7", size: "small", bottom: "22%", left: "35%", width: "min(210px, 22vw)", opacity: 0.44, rotate: 14 },
  { id: "bc8", size: "small", flip: true, bottom: "20%", right: "32%", width: "min(200px, 21vw)", opacity: 0.42, rotate: -12 },

  { id: "in9", size: "small", top: "18%", left: "20%", width: "min(165px, 17vw)", opacity: 0.32, rotate: 28 },
  { id: "in10", size: "small", flip: true, top: "20%", right: "18%", width: "min(160px, 17vw)", opacity: 0.32, rotate: -26 },
  { id: "in11", size: "small", top: "36%", left: "10%", width: "min(155px, 16vw)", opacity: 0.3, rotate: 14 },
  { id: "in12", size: "small", flip: true, top: "38%", right: "9%", width: "min(150px, 16vw)", opacity: 0.3, rotate: -16 },
  { id: "in13", size: "small", top: "52%", left: "20%", width: "min(145px, 15vw)", opacity: 0.28, rotate: 22 },
  { id: "in14", size: "small", flip: true, top: "54%", right: "19%", width: "min(140px, 15vw)", opacity: 0.28, rotate: -20 },
  { id: "in15", size: "small", top: "68%", left: "11%", width: "min(135px, 14vw)", opacity: 0.26, rotate: 10 },
  { id: "in16", size: "small", flip: true, top: "70%", right: "10%", width: "min(130px, 14vw)", opacity: 0.26, rotate: -12 },
  { id: "in17", size: "small", top: "84%", left: "18%", width: "min(125px, 13vw)", opacity: 0.24, rotate: 18 },
  { id: "in18", size: "small", flip: true, top: "86%", right: "17%", width: "min(120px, 13vw)", opacity: 0.24, rotate: -14 },
  { id: "in19", size: "small", top: "42%", left: "25%", width: "min(115px, 12vw)", opacity: 0.22, rotate: 30 },
  { id: "in20", size: "small", flip: true, top: "44%", right: "24%", width: "min(110px, 12vw)", opacity: 0.22, rotate: -28 },
  { id: "in21", size: "small", top: "8%", left: "35%", width: "min(180px, 19vw)", opacity: 0.36, rotate: 12 },
  { id: "in22", size: "small", flip: true, top: "9%", right: "33%", width: "min(175px, 18vw)", opacity: 0.36, rotate: -10 },
  { id: "in23", size: "small", top: "96%", left: "40%", width: "min(170px, 18vw)", opacity: 0.34, rotate: 6 },
  { id: "in24", size: "small", flip: true, top: "95%", right: "38%", width: "min(165px, 17vw)", opacity: 0.34, rotate: -8 },

  ...generateExtraBranches(),
];

function BranchWrap({
  placement,
  children,
}: {
  placement: BranchPlacement;
  children: ReactNode;
}) {
  const needsCenter = placement.left === "50%";
  const transform = [
    needsCenter ? "translateX(-50%)" : "",
    placement.rotate ? `rotate(${placement.rotate}deg)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties = {
    top: placement.top === "auto" ? undefined : placement.top,
    bottom: placement.bottom,
    left: placement.left,
    right: placement.right,
    width: placement.width,
    opacity: Math.min(1, placement.opacity * 1.3 + 0.14),
    transform: transform || undefined,
  };

  return (
    <div className="botanical" style={style}>
      {children}
    </div>
  );
}

export function FloralBranches() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="page-bg-base" />

      {branchPlacements.map((placement) => (
        <BranchWrap key={placement.id} placement={placement}>
          {placement.size === "large" ? (
            <BranchLeaves idPrefix={placement.id} flip={placement.flip} />
          ) : (
            <BranchCornerSmall idPrefix={placement.id} flip={placement.flip} />
          )}
        </BranchWrap>
      ))}

      {[2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 96].map((top, i) => (
        <span
          key={top}
          className="floating-heart"
          style={{
            top: `${top}%`,
            left: i % 2 === 0 ? `${0.3 + (i % 5) * 1.2}%` : undefined,
            right: i % 2 === 1 ? `${0.3 + (i % 5) * 1.2}%` : undefined,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
