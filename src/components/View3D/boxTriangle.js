const frontSide = (x, y) => [0,0,0,x,0,0,0,y,0,x,0,0,x,y,0,0,y,0];
const backSide = (x, y, z) => [x,0,z,0,0,z,x,y,z,0,0,z,0,y,z,x,y,z];
const leftSide = (y, z) => [0,0,z,0,0,0,0,y,z,0,0,0,0,y,0,0,y,z];
const rightSide = (x, y, z) => [x,0,0,x,0,z,x,y,0,x,0,z,x,y,z,x,y,0];
const topSide = (x, y, z) => [0,y,0,x,y,0,0,y,z,x,y,0,x,y,z,0,y,z];
const bottomSide = (x, z) => [x,0,0,0,0,0,x,0,z,0,0,0,0,0,z,x,0,z];

export const TriangleBox = (width, height, length) => {
  return new Float32Array([
      ...frontSide(width, height),
      ...backSide(width, height, length),
      ...leftSide(height, length),
      ...rightSide(width, height, length),
      ...topSide(width, height, length),
      ...bottomSide(width, length)
  ]);
};
