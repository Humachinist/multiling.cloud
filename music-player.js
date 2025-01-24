function activateAudioPlayer() {
    const player = document.querySelector('#single-song-player');
    const changePlayerBtn = document.querySelector('.change-player');
    if(!player) {
        return;
    }

    changePlayerBtn.addEventListener('click', () => {
        player.style.display = "none"
        document.querySelector('#standart-player').style.display = "block"
    })

    if(window.Amplitude && player) {
        const audioUrl = player.dataset.src
        Amplitude.init({
            "bindings": {
                37: 'prev',
                39: 'next',
                32: 'play_pause'
            },
            "songs": [
                {
                    "url": audioUrl,
                }
            ]
        });
    
        window.onkeydown = function(e) {
            return !(e.keyCode == 32);
        };
    
        document.getElementById('song-played-progress').addEventListener('click', function( e ){
            var offset = this.getBoundingClientRect();
            var x = e.pageX - offset.left;
            Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
        });
    }
}

activateAudioPlayer()