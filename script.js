let firstLoc = true;

window.onload = () => {
    const camera = document.querySelector('a-camera');
    window.addEventListener("gps-camera-update-position", e => {
        if(firstLoc) {
			firstLoc = false;
            alert(`Got GPS: you are at: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
            setPos(e.detail.position.longitude, e.detail.position.latitude);
        }
    });    
};

function setPos(longitude,latitude) {

        for (let i = 0; i < 10; i++) {
            const box = document.createElement("a-box");
            box.setAttribute('scale', {
                x: 10, 
                y: 10,
                z: 10
            });
            box.setAttribute('material', {
                color: 'red'
            });
            box.setAttribute('gps-projected-entity-place', {
                latitude: latitude + 0.0001 * i,
                longitude: longitude - 0.0001 * i
            });

            const sceneEl = document.querySelector("a-scene");
            sceneEl.appendChild(box);
        }
        
}