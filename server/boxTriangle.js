function getPosition(pointNum, x, y, z) {
  const points = [
    [0,0,0],
    [x,0,0],
    [0,y,0],
    [x,y,0],
    [0,0,z],
    [x,0,z],
    [0,y,z],
    [x,y,z]
  ];
  return points[pointNum];
}

const faces = [
  0,2,3,0,3,1, // front
  1,3,7,1,7,5, // right
  5,7,6,5,6,4, // back
  4,6,2,4,2,0, // left
  2,6,7,2,7,3, // top
  4,0,1,4,1,5, // bottom
];

const positions = (width, height, length) => {
  const positions = [];
  faces.forEach(point => positions.push( ...getPosition(point ,width, height, length)));
  return positions;
};

module.exports = positions;
