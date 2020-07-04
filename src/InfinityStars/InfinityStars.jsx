import React, { Component } from "react";
import * as THREE from "three";
import STARLITE from "../InfinityStars/star.png";

let scene, camera, renderer, stars, starGeo;

class InfinityStars extends Component {
  componentDidMount() {
    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1;
      camera.position.x = Math.PI / 2;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);
      // this.mount.appendChild(renderer.domElement);

      starGeo = new THREE.Geometry();
      for (let i = 0; i < 6000; i++) {
        let star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
      }

      let sprite = new THREE.TextureLoader().load(STARLITE);
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite,
      });

      stars = new THREE.Points(starGeo, starMaterial);
      scene.add(stars);

      window.addEventListener("resize", onWindowResize, false);

      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      starGeo.vertices.forEach((p) => {
        p.velocity += p.acceleration;
        p.y -= p.velocity;

        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      starGeo.verticesNeedUpdate = true;
      stars.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    init();
  }

  render() {
    return (
      <>
      <div ref={(ref) => (this.mount = ref)} />
      </>
    );
  }
}

export default InfinityStars;
