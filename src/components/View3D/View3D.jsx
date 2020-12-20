import {Component} from 'react';
import * as THREE from 'three';

class View3D extends Component {
  constructor(props) {
    super(props);
    this.buffer = props.buffer;
  }

  componentDidMount() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(70, 500 / 300, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(700, 500);
    renderer.domElement.className = "canvas";
    renderer.setClearColor(0xDDDDDD, 1);
    this.elem.appendChild(renderer.domElement);

    const vertices = new Float32Array(this.buffer);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    geometry.center();

    const material = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
    const cube = new THREE.Mesh(geometry, material);

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(5000, 5000, 5000);
    scene.add(light);

    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }

  render() {
    return <div className="canvas__wrapper" ref={ref => this.elem = ref}></div>;
  }
}

export default View3D;
