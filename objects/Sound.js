class Sound {
    constructor(src) {
        this.sound = resourceManager.getSoundSource(src);
        this.isPlaying = false;
    }

    play() {
        this.sound.play();
        this.sound.muted = false;
    }

    pause() {
        // this.sound.pause();
        this.sound.muted = true;
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