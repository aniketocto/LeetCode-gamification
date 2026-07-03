// Pixel Art Palette
const PALETTE = {
  '.': 'transparent',
  'k': '#000000', // Black Outline
  'w': '#ffffff', // White
  'g': '#38b764', // Green
  'r': '#ff003c', // Red
  'b': '#29adff', // Blue
  'y': '#ffcd75', // Gold / Yellow
  'o': '#ff7b00', // Orange
  'p': '#a23e8c', // Purple
  's': '#e2b27a', // Skin Tone
  'd': '#8b93af', // Light Gray
  'c': '#3a3f58', // Dark Gray
};

// 12x12 Pixel Art Grids for each player rank
const AVATARS = {
  "ROOKIE CODER": [
    "............",
    "....kkkk....",
    "..kkggggkk..",
    ".kggggggggk.",
    "kggggwggwggk",
    "kgggkkwkkwgk",
    "kggggggggggk",
    "kggggkkkkggk",
    ".kggggggggk.",
    "..kkggggkk..",
    "....kkkk....",
    "............"
  ],
  "BUG CATCHER": [
    "....kkkk....",
    "...krrwwk...",
    "..krrrrrrk..",
    ".kkrkrrkrkk.",
    "kk.kkkkkk.kk",
    "k.krrrrrrk.k",
    "..krrrrrrk..",
    "..k.kkkk.k..",
    "..kk....kk..",
    "............",
    "............",
    "............"
  ],
  "CODE TRAINER": [
    "....kkkk....",
    "...kbbbbk...",
    "..kbbbbbbk..",
    ".kbbwbbwbbk.",
    ".kbkkbkbkbbk",
    ".kbbbbbbbbk.",
    "kbbkkkkkkbbk",
    "k.kbbbbbbk.k",
    "..kk....kk..",
    "............",
    "............",
    "............"
  ],
  "ALGORITHM SCOUT": [
    "....kkkk....",
    "..kkggggkk..",
    ".kggggggggk.",
    "kggssssssggk",
    "kgskkskkskgk",
    "kggssssssggk",
    ".kggggggggk.",
    "..kkggggkk..",
    "....kkkk....",
    "............",
    "............",
    "............"
  ],
  "STACK WARRIOR": [
    "...kkkkkk...",
    "..kyyyyyykk.",
    ".kddddddddk.",
    "kddddddddddk",
    "kddwddddwddk",
    "kddkkkkkkddk",
    ".kddccccddk.",
    "..kkddddkk..",
    "....kkkk....",
    "............",
    "............",
    "............"
  ],
  "CODE ACE": [
    "....kkkk....",
    "...kppppk...",
    "..kppppppk..",
    ".kyyppppyyk.",
    "ksswppppwssk",
    "ksskkkkkkssk",
    ".kssppppssk.",
    "..kkppppkk..",
    "....kkkk....",
    "............",
    "............",
    "............"
  ],
  "ALGORITHM MASTER": [
    "..kyyyyyyk..",
    "..kykkkkyk..",
    "..kyyyyyyk..",
    ".kssssssssk.",
    "ksswsssswssk",
    "ksskkkkkkssk",
    ".kssyyyyssk.",
    "..kkyyyykk..",
    "....kkkk....",
    "............",
    "............",
    "............"
  ]
};

/**
 * Returns raw HTML string (or React markup) representing SVG sprite
 */
export function getAvatarSVG(rank) {
  const matrix = AVATARS[rank] || AVATARS["ROOKIE CODER"];
  const pixelSize = 8;
  const height = matrix.length;
  const width = matrix[0].length;
  
  const rects = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = matrix[y][x];
      if (char !== '.' && PALETTE[char]) {
        rects.push(
          <rect 
            key={`${x}-${y}`} 
            x={x * pixelSize} 
            y={y * pixelSize} 
            width={pixelSize} 
            height={pixelSize} 
            fill={PALETTE[char]} 
          />
        );
      }
    }
  }
  
  return (
    <svg 
      viewBox={`0 0 ${width * pixelSize} ${height * pixelSize}`} 
      width="100%" 
      height="100%" 
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}
