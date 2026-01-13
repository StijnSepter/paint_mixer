export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function averageRGB(colors) {
  const total = colors.reduce(
    (acc, c) => ({
      r: acc.r + c.r,
      g: acc.g + c.g,
      b: acc.b + c.b,
    }),
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: Math.round(total.r / colors.length),
    g: Math.round(total.g / colors.length),
    b: Math.round(total.b / colors.length),
  };
}
