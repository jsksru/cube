import { useState, useEffect } from 'react';
import View3D from "./components/View3D";
import Params from "./components/Params";

function App() {
    const [loading, setLoading] = useState(true);
    const [buffer, setBuffer] = useState([]);
    const [params, setParams] = useState({
        width: 10,
        height: 10,
        length: 10,
    });

    useEffect(() => {
      setLoading(true);
      const url = `http://localhost:8080/cube?width=${params.width}&height=${params.height}&length=${params.length}`;
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          if (data && !data.error && data.buffer) {
            setBuffer(data.buffer);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, [params.width, params.height, params.length]);

    const changeParams = (params) => {
      setParams(params);
    };

    return (
        <div className="box">
            <div className="view3d">
              <View3D buffer={buffer} />
              {loading && <div className="updating-indicator"><span>Updating...</span></div>}
            </div>
            <div className="params">
              <Params values={params} onChange={params => changeParams(params)} />
            </div>
        </div>
    );
}

export default App;
