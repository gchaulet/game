new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        //checl if player won at first or none
        attack () {
            this.monsterHealth -= this.calculateDamage(3,10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack () {
            this.monsterHealth -= this.calculateDamage(10,20);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
           
        },
        //give point to player
        heal () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp () {
            this.gameIsRunning = false;
        },
        monsterAttacks () {
            this.playerHealth -= this.calculateDamage(5,12);
            this.checkWin();
            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits player for ' + damage
            });
        },
        //function which calculate parameters for damages
        calculateDamage (min, max) {
            return damage = Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        //Restart game or not
        checkWin () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won, New game ?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
                
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost, New game ?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});