var app = new Vue({
    el: '#app',
    data: {
        armRotation: -61,
        cableLength: 450,
        started: false,
        won: false,
        lost: false
    },
    mounted () {
        this.$refs.app.focus()
    },
    methods: {
        moveArmLeft: function () {
            (this.armRotation > -69) ? this.armRotation -= 0.3 : false;
        },
        moveArmRight: function () {
            (this.armRotation < 0) ? this.armRotation += 0.3 : false;
        },
        releaseCable: function () {
            (this.cableLength < 600) ? this.cableLength++ : false;
        },
        pullCable: function () {
            (this.cableLength > 100) ? this.cableLength-- : false;
        }
    },
    computed: {
        mStarted: function () {

            if (!this.started) {
                let armState = this.armRotation < -60.6 && this.armRotation > -69.3
                let cableState = this.cableLength > 500 && this.cableLength < 520
                if (armState && cableState)
                    this.started = true
            }

            return this.started
        },
        mWon: function () {

            if (this.started && !this.won) {
                let armState = this.armRotation < -29 && this.armRotation > -31
                let cableState = this.cableLength > 105 && this.cableLength < 112
                if (armState && cableState) {

                    this.started = false
                    this.won = true
                }
            }
            return this.won
        }
    }
})