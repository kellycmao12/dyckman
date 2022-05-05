let firstLoc = true;

function staticLoadPlaces() {
    return [
        {
            name: 'apple',
            link: './assets/apple/scene.gltf'
        },
        {
            name: 'apple tree',
            link: './assets/apple tree/scene.gltf'
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
        model.setAttribute('gltf-model', place.link);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}

function startGame() {
    console.log("start game");
    toggleScreen('start-screen', false);
    toggleScreen('main-screen', true);
    toggleVideo(true);

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
}

function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display;
}

function toggleVideo(toggle) {
    let video = document.querySelector('video');
    if (toggle) {
        video.setAttribute('style', 'display: block !important; position: absolute; top: 0px; left: 0px;');
    } else {
        video.setAttribute('style', 'display: none !important;');
        video.play();
    }
}

function openVideo() {
    const popup = document.getElementById("asl-button");
    popup.classList.toggle("show");

}

