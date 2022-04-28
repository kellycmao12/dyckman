let firstLoc = true;

window.onload = () => {
    const camera = document.querySelector('a-camera');
    window.addEventListener("gps-camera-update-position", e => {
        if(firstLoc) {
			firstLoc = false;
            alert(`Got GPS: you are at: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
            // setPos(e.detail.position.longitude, e.detail.position.latitude);
            let places = staticLoadPlaces();
            renderPlaces(places, e.detail.position.longitude, e.detail.position.latitude);    
        }
    });
    
};

function staticLoadPlaces() {
    return [
        {
            name: 'cherry',
            link: './assets/cherries/scene.gltf'
        },
        {
            name: 'cherry',
            link: './assets/cherries/scene.gltf'
        },
        {
            name: 'cherry',
            link: './assets/cherries/scene.gltf'
        },
        {
            name: 'cherry',
            link: './assets/cherries/scene.gltf'
        },
        {
            name: 'cherry',
            link: './assets/cherries/scene.gltf'
        },
        {
            name: 'magnemite',
            link: './assets/magnemite/scene.gltf'
        },
    ];
}

function renderPlaces(places, longitude, latitude) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let randNum = Math.random()/10000;
        randNum *= Math.round(Math.random()) ? 1 : -1;
        let randLatitude = latitude + randNum;
        randNum *= Math.round(Math.random()) ? 1 : -1;
        let randLongitude = longitude + randNum;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-projected-entity-place', `latitude: ${randLatitude}; longitude: ${randLongitude};`);
        model.setAttribute('gltf-model', './assets/' + place.name + '/scene.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}

// function setPos(longitude,latitude) {

//         for (let i = 0; i < 10; i++) {
            
//             box.setAttribute('scale', {
//                 x: 10, 
//                 y: 10,
//                 z: 10
//             });
//             box.setAttribute('material', {
//                 color: 'red'
//             });
//             const box = document.createElement("a-box");
//             box.setAttribute('gps-projected-entity-place', {
//                 latitude: latitude + 0.0001 * i,
//                 longitude: longitude - 0.0001 * i
//             });

//             const sceneEl = document.querySelector("a-scene");
//             sceneEl.appendChild(box);
//         }
        
// }