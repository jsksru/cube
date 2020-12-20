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

    const fetchData = () => {
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
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="box">
            <div className="view3d">
                {
                    loading ? <div>Загрузка...</div> : <View3D buffer={buffer} />
                }
            </div>
            <div className="params">
                <Params values={params} onChange={(params) => {setParams(params);fetchData()}} />
            </div>
        </div>
    );
}

export default App;
