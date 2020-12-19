import View3D from "./components/View3D";
import Params from "./components/Params";

function App() {
  return (
    <div className="box">
        <div className="view3d">
            <View3D/>
        </div>
        <div className="params">
            <Params/>
        </div>
    </div>
  );
}

export default App;
