var yourVideo = document.querySelector("#yours"),
    theirVideo = document.querySelector("#theirs"),
    yourConnection, theirConnection;

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        yourVideo.srcObject = stream;
        var configuration = {
            "iceServers": [{
                "urls": "stun://localhost:3002"
            }]
        };
        yourConnection = new RTCPeerConnection(configuration);
        stream.getTracks().forEach(track => yourConnection.addTrack(track,stream))
        yourConnection.createOffer()
            .then((offer) => {
                console.log(offer.sdp)
                yourConnection.setLocalDescription(offer)
            })

    });

function startPeerConnection(stream) {
    var configuration = {
        "iceServers": [{
            "urls": "stun: stun.1.google.com: 19302"
        }]
    };
    yourConnection = new RTCPeerConnection(configuration);
    theirConnection = new RTCPeerConnection(configuration);
    // Setup stream listening
    theirConnection.onaddstream = function (e) {
        theirVideo.srcObbject = stream;
    };
    // Setup ice handling
    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            theirConnection.addIceCandidate(new RTCIceCandidate(event.
                candidate));
        }
    };
    theirConnection.onicecandidate = function (event) {
        if (event.candidate) {
            yourConnection.addIceCandidate(new RTCIceCandidate(event.
                candidate));
        }
    };
    // Begin the offer
    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);
        theirConnection.createAnswer(function (offer) {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });
};