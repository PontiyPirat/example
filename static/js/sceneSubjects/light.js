function GeneralLights(scene) {
    var spotLight = new THREE.PointLight('#EEEEEE');
    spotLight.position.set(-40, -60, 100);
    spotLight.castShadow = true;
    scene.add(spotLight);
    var ambientlight = new THREE.AmbientLight(0xcaddaa);
    scene.add(ambientlight);
}