// window.onload = () => {
//     let places = staticLoadPlaces();
//     renderPlaces(places);
// };

// function staticLoadPlaces() {
//    return [
//        {
//            name: 'Magnemite',
//            location: {
//                lat: 44.496470,
//                lng: 11.320180,
//            }
//        },
//    ];
// }

// function renderPlaces(places) {
//    let scene = document.querySelector('a-scene');

//    places.forEach((place) => {
//        let latitude = place.location.lat;
//        let longitude = place.location.lng;

//        let model = document.createElement('a-entity');
//        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//        model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
//        model.setAttribute('rotation', '0 180 0');
//        model.setAttribute('animation-mixer', '');
//        model.setAttribute('scale', '0.5 0.5 0.5');

//        model.addEventListener('loaded', () => {
//            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
//        });

//        scene.appendChild(model);
//    });
// }

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
            latitude: latitude+0.0006,
            longitude: longitude-0.0005
        });
        const box2 = document.createElement("a-box");
        box2.setAttribute('scale', {
            x: 10, 
            y: 10,
            z: 10
        });
        box2.setAttribute('material', {
            color: 'yellow'
        });
        box2.setAttribute('gps-projected-entity-place', {
            latitude: latitude+0.0004,
            longitude: longitude-0.0001
        });
        const sceneEl = document.querySelector("a-scene");
        sceneEl.appendChild(box);
        sceneEl.appendChild(box2);
}