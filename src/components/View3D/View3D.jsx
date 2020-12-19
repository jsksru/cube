import { Component } from 'react';
import { TriangleBox } from './boxTriangle';
import * as THREE from 'three';

class View3D extends Component {
    componentDidMount() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, 500 / 300, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( 500, 300 );
        this.elem.appendChild(renderer.domElement);
        const geometry = new THREE.BufferGeometry();

        const vertices = TriangleBox(10,10,10);

        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.computeBoundingSphere();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 50;
        function animate() {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            renderer.render( scene, camera );
        }
        animate();
    }

    render() {
        return <div ref={ref => this.elem = ref}></div>;
    }
}

export default View3D;
