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
            // construct a new box
            box = new Box({
                scaleX: 10, 
                scaleY: 10, 
                scaleZ: 10, 
                width: 1, 
                depth: 1, 
                height: 1, 
                red:255, 
                green:0, 
                blue:0
            });
            
            box.setAttribute('gps-projected-entity-place', {
                latitude: latitude + 0.0001 * i,
                longitude: longitude - 0.0001 * i
            });
            
            const sceneEl = document.querySelector("a-scene");
            sceneEl.appendChild(box);

        }

}