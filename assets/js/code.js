/* Loading Elements from HTML */
const sectionPetSelection = document.getElementById('pet-select')
const sectionAttackSelection = document.getElementById('attack-select')
const sectionRestart = document.getElementById('restart')
const cardsContainer = document.getElementById('cards-container')
const playerPetButton = document.getElementById('pet-select-button')
const attacksContainer = document.getElementById('attacks-buttons-container')
const restartButton = document.getElementById('restart-button')
const notifications = document.getElementById('result')
const playerPetName = document.getElementById('player-pet-name')
const enemyPetName = document.getElementById('enemy-pet-name')
const playerLivesElement = document.getElementById('player-lives')
const enemyLivesElement = document.getElementById('enemy-lives')
const playerAttackElement = document.getElementById('player-attack')
const enemyAttackElement = document.getElementById('enemy-attack')

/* Defining Global Variables */
let mokepons = []
let playerAttack = []
let enemyAttack = []
let mokeponsOption
let randomPet
let inputHipodoge
let inputCapipepo
let inputRatigueya
let playerPet
let playerMokeponAttacks
let enemyMokeponAttacks
let fireButton
let waterButton
let earthButton
let buttons = []
let variableAttackPlayerI
let variableAttackEnemyI
let playerLives
let enemyLives

/* Defining Classes */
class Mokepon {
    constructor(name, img, lives){
        this.name = name
        this.img = img
        this.lives = lives
        this.attacks = []
    }
}

/* Defining Objects for Mokepon Class */
let hipodoge = new Mokepon('Hipodoge', './assets/img/mokepon_hipodoge.webp', 5)
let capipepo = new Mokepon('Capipepo', './assets/img/mokepon_capipepo.webp', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/img/mokepon_ratigueya.webp', 5)

hipodoge.attacks.push(
    {name: '💧', id: 'water-button', attack: 'Agua'},
    {name: '💧', id: 'water-button', attack: 'Agua'},
    {name: '💧', id: 'water-button', attack: 'Agua'},
    {name: '🔥', id: 'fire-button', attack: 'Fuego'},
    {name: '🌱', id: 'earth-button', attack: 'Tierra'}
)

capipepo.attacks.push(
    {name: '🌱', id: 'earth-button', attack: 'Tierra'},
    {name: '🌱', id: 'earth-button', attack: 'Tierra'},
    {name: '🌱', id: 'earth-button', attack: 'Tierra'},
    {name: '💧', id: 'water-button', attack: 'Agua'},
    {name: '🔥', id: 'fire-button', attack: 'Fuego'}
)

ratigueya.attacks.push(
    {name: '🔥', id: 'fire-button', attack: 'Fuego'},
    {name: '🔥', id: 'fire-button', attack: 'Fuego'},
    {name: '🔥', id: 'fire-button', attack: 'Fuego'},
    {name: '💧', id: 'water-button', attack: 'Agua'},
    {name: '🌱', id: 'earth-button', attack: 'Tierra'}
)

mokepons.push(hipodoge, capipepo, ratigueya)

/* Creating Game Functions */
function startGame(){
    sectionAttackSelection.style.display = 'none'
    sectionRestart.style.display = 'none'

    mokepons.forEach((Mokepon) =>{
        mokeponsOption = `
        <input type="radio" name="pet" id=${Mokepon.name} />
        <label for=${Mokepon.name} class="mokepon-card">
            <p>${Mokepon.name}</p>
            <img src=${Mokepon.img} alt=${Mokepon.name} />
        </label>
        `
        cardsContainer.innerHTML += mokeponsOption

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    playerPetButton.addEventListener('click', selectPlayerPet)
    restartButton.addEventListener('click', restartGame)
}

function selectPlayerPet(){
    if (inputHipodoge.checked){
        playerPetName.innerHTML = inputHipodoge.id
        playerPet = inputHipodoge.id
        extractAttacks(playerPet)
        extractLives(playerPet)
        selectEnemyPet()
    }
    else if (inputCapipepo.checked){
        playerPetName.innerHTML = inputCapipepo.id
        playerPet = inputCapipepo.id
        extractAttacks(playerPet)
        extractLives(playerPet)
        selectEnemyPet()
    }
    else if (inputRatigueya.checked){
        playerPetName.innerHTML = inputRatigueya.id
        playerPet = inputRatigueya.id
        extractAttacks(playerPet)
        extractLives(playerPet)
        selectEnemyPet()
    }
    else {
        alert('No seleccionaste ninguna mascota')
    }
}

function extractAttacks(playerPet) {
    let attacks = []

    for (let i = 0; i < mokepons.length; i++) {
        if (playerPet === mokepons[i].name) {
            attacks = mokepons[i].attacks
        }
        
    }

    showAttacks(attacks)
}

function extractLives(Pet) {
    let lives

    for (let i = 0; i < mokepons.length; i++) {
        if (Pet === mokepons[i].name) {
            lives = mokepons[i].lives
        }
        
    }
    playerLives = lives

    playerLivesElement.innerHTML = lives
}

function showAttacks (attacks) {
    attacks.forEach((attack) =>{
        playerMokeponAttacks = `
        <button id=${attack.id} class="button-2 attack-button">${attack.name}</button>
        `

        attacksContainer.innerHTML += playerMokeponAttacks
    })

    fireButton = document.getElementById('fire-button')
    waterButton = document.getElementById('water-button')
    earthButton = document.getElementById('earth-button')
    buttons = document.querySelectorAll('.attack-button')
}

function attackSequence() {
    buttons.forEach((button) =>{
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('Fuego')
                console.log(playerAttack)
                button.style.background = '#86E5FF97'
                button.disabled = true
            }
            else if (e.target.textContent === '💧') {
                playerAttack.push('Agua')
                console.log(playerAttack)
                button.style.background = '#86E5FF97'
                button.disabled = true
            }
            else {
                playerAttack.push('Tierra')
                console.log(playerAttack)
                button.style.background = '#86E5FF97'
                button.disabled = true
            }
            enemyRandomAttack()
        })
    })
}

function selectEnemyPet(){  
    randomPet = randomizer(0, mokepons.length -1)

    sectionPetSelection.style.display = 'none'
    sectionAttackSelection.style.display = 'flex'

    enemyPetName.innerHTML = mokepons[randomPet].name

    enemyMokeponAttacks = mokepons[randomPet].attacks

    enemyLives = mokepons[randomPet].lives

    enemyLivesElement.innerHTML = enemyLives

    attackSequence()
}

function enemyRandomAttack(){
    let randomAttack = randomizer(0, enemyMokeponAttacks.length - 1)

    enemyAttack.push(enemyMokeponAttacks[randomAttack].attack)
    enemyMokeponAttacks.splice(randomAttack, 1)
    console.log(enemyAttack)

    startCombat()
}

function startCombat() {
    if (enemyAttack.length == 5) {
        combat()
    }
}

function variablesAttack(player, enemy) {
    variableAttackPlayerI = playerAttack[player]
    variableAttackEnemyI = enemyAttack[enemy]
}

function combat(){

    for (let i = 0; i < enemyAttack.length; i++) {
        if (playerAttack[i] === enemyAttack[i]){
            variablesAttack(i, i)
            createNotification('Empate')
        }else if ((playerAttack[i] == 'Fuego' && enemyAttack[i] == 'Tierra') ||
        (playerAttack[i] == 'Agua' && enemyAttack[i] == 'Fuego') ||
        (playerAttack[i] == 'Tierra' && enemyAttack[i] == 'Agua')){
            variablesAttack(i, i)
            createNotification('Ganaste')
            enemyLives --
            enemyLivesElement.innerHTML = enemyLives
        }else {
            variablesAttack(i, i)
            createNotification('Perdiste')
            playerLives --
            playerLivesElement.innerHTML = playerLives
        }

        checkLives()
    }
}

function checkLives(){
    if (playerLives < enemyLives){
        createFinalNotification('¡Perdiste el combate!')
    }
    else if (playerLives == enemyLives){
        createFinalNotification('¡Empate!')
    }
    else {
        createFinalNotification('¡Ganaste el combate!')
    }
}

function createNotification(result){
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    notifications.innerHTML = result
    newPlayerAttack.innerHTML = variableAttackPlayerI
    newEnemyAttack.innerHTML = variableAttackEnemyI

    playerAttackElement.appendChild(newPlayerAttack)
    enemyAttackElement.appendChild(newEnemyAttack)
}

function createFinalNotification(finalResult){
    sectionRestart.style.display = 'block'

    notifications.innerHTML = finalResult
}

function restartGame(){
    location.reload()
}

function randomizer(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)