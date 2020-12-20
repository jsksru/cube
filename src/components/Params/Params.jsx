import {useState} from 'react';

const Params = ({values, onChange}) => {
  const [width, setWidth] = useState(values.width || 10);
  const [height, setHeight] = useState(values.height || 10);
  const [length, setLength] = useState(values.length || 10);

  const handleChange = () => onChange({width, height, length});

  return (
    <div>
      <div>
        <label>
          <span>Width:</span>
          <input type="number" value={width} onInput={(e) => setWidth(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          <span>Height:</span>
          <input type="number" value={height} onInput={(e) => setHeight(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          <span>Length:</span>
          <input type="number" value={length} onInput={(e) => setLength(e.target.value)}/>
        </label>
      </div>
      <div>
        <button onClick={handleChange}>Redraw</button>
      </div>
    </div>
  );
};
export default Params;
