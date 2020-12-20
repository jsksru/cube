import {Component, createRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class View3D extends Component {
  constructor(props) {
    super(props);
    this.buffer = props.buffer;
    this.elemRef = createRef();
  }

  sceneSetup() {
    const elem = this.elemRef.current;
    const width = elem.clientWidth;
    const height = elem.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    new OrbitControls( this.camera, elem );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: elem
    });
    this.renderer.setSize( width, height );
    this.renderer.setClearColor(0xDDDDDD, 1);
  }

  addObjects() {
    const vertices = new Float32Array(this.buffer);
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    geometry.center();

    this.cube = new THREE.Mesh(geometry, material);

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(5000, 5000, 5000);

    this.scene.add(light);
    this.scene.add(this.cube);
  }

  startAnimation = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render( this.scene, this.camera );
    this.requestID = window.requestAnimationFrame(this.startAnimation);
  };

  handleWindowResize = () => {
    const elem = this.elemRef.current;
    const width = elem.clientWidth;
    const height = elem.clientHeight;
    this.renderer.setSize( width, height );
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  componentDidMount() {
    this.sceneSetup();
    this.addObjects();
    this.startAnimation();
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount() {
    this.scene.clear();
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
  }

  render() {
    return <canvas className="canvas" ref={this.elemRef}></canvas>;
  }
}

export default View3D;
