class Sound {
    constructor(src) {
        this.sound = resourceManager.getSoundSource(src);
        this.isPlaying = false;
        this.sound.volume = 0.1;
    }

    play() {
        this.sound.muted = noSound;
        if (noSound == false) {
            this.sound.play();
        }
    }

    pause() {
        this.sound.pause();
    }

    playsound() {
        if (this.isPlaying == false) {
            this.play();
            this.isPlaying = true;
        }
        else {
            this.pause();
            this.isPlaying = false;
        }
    }
}