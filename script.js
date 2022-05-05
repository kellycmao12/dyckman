let firstLoc = true;

function staticLoadPlaces() {
    return [
        {
            name: 'cherry',
            link: './assets/cherry/scene.gltf'
        },
        // {
        //     name: 'apple',
        //     link: './assets/apple/scene.gltf'
        // },
        // {
        //     name: 'apple',
        //     link: './assets/apple/scene.gltf'
        // },
        // {
        //     name: 'apple tree',
        //     link: './assets/apple tree/scene.gltf'
        // },
    ];
}

function renderPlaces(places, longitude, latitude) {
    let scene = document.querySelector('a-scene-apple');

    places.forEach((place) => {
        let randNum = Math.random()/10000;
        randNum *= Math.round(Math.random()) ? 1 : -1;
        let randLatitude = latitude + randNum;
        randNum *= Math.round(Math.random()) ? 1 : -1;
        let randLongitude = longitude + randNum;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-projected-entity-place', `latitude: ${randLatitude}; longitude: ${randLongitude};`);
        model.setAttribute('gltf-model', place.link);
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}

function startIntro() {
    toggleScreen('start-screen', false);
    toggleScreen('intro-video-screen', true);
    const video = document.getElementById('intro-video');
    video.play();
    video.addEventListener('ended', showNextButton, false);
    function showNextButton(e) {
        const nextBtn = document.getElementById('next-button');
        nextBtn.style.display = 'block';
    }
}

function startAppleAR() {
    console.log("start apple AR");
    toggleScreen('intro-video-screen', false);
    toggleScreen('apple-ar-screen', true);
    toggleVideo(true);

    const camera = document.querySelector('a-camera');
    window.addEventListener("gps-camera-update-position", e => {
        if(firstLoc) {
            console.log("got first location");
			firstLoc = false;
            alert(`Got GPS: you are at: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
            setPosition(e.detail.position.longitude, e.detail.position.latitude);
            let places = staticLoadPlaces();
            renderPlaces(places, e.detail.position.longitude, e.detail.position.latitude);    
        }
    });
}

function openAppleVideo() {
    toggleScreen('apple-ar-screen', false);
    toggleScreen('apple-video-screen', true);
    const video = document.getElementById('apple-video');
    video.play();
    video.addEventListener('ended', showNextButton, false);
    function showNextButton(e) {
        const nextBtn = document.getElementById('next-button');
        nextBtn.style.display = 'block';
    }
}

function startArtAR() {
    toggleScreen('apple-video-screen', false);
    toggleScreen('art-ar-screen', true);
    toggleVideo(true);

    const camera = document.querySelector('a-camera');
    window.addEventListener("gps-camera-update-position", e => {
        if(firstLoc) {
            console.log("got first location");
			firstLoc = false;
            alert(`Got GPS: you are at: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
            setPos(e.detail.position.longitude, e.detail.position.latitude);
            let places = [{ name: 'reggie black', link: './assets/reggie black.obj' }];
            renderPlaces(places, e.detail.position.longitude, e.detail.position.latitude);    
        }
    });
}

function openArtVideo() {
    toggleScreen('art-ar-screen', false);
    toggleScreen('art-video-screen', true);
    const video = document.getElementById('art-video');
    video.play();
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
    }
}

