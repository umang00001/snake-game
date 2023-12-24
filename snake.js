let setting_btn = document.querySelector('.setting_btn');
let setting_main_box = document.querySelector('.setting_main_box');
let game_bord = document.querySelector('.game_bord')
let score_el = document.querySelector('.score');
let high_score_el = document.querySelector('.high_score');
let detais_div = document.querySelector('.container');

let default_input = document.querySelector("#default");
let details_input = document.querySelector("#details_color");
let board_input = document.querySelector("#bord_color");
let snake_color_input = document.querySelector("#snake_color");
let food_color_input = document.querySelector("#food_color");
let speed_input = document.querySelector("#speed");
let save_btn = document.querySelector(".save_btn");




if(localStorage.getItem("setting")!=null){
    all_data = JSON.parse(localStorage.getItem("setting"))

    details_input.value=all_data.details
    board_input.value=all_data.board
    snake_color_input.value=all_data.snake
    speed_input.value=all_data.speed
    food_color_input.value=all_data.food

    if(all_data.active==false){
        default_input.checked=true
    }
    else{
        default_input.checked=false
    }
    detais_div.style.backgroundColor=details_input.value;
    game_bord.style.backgroundColor=board_input.value;



}



setting_btn.onclick = function () {
    setting_main_box.classList.toggle('display_none');
}


let high_score = localStorage.getItem("high_score") || 0

let score = 0
let i;
let interval;
let gameover = false
let snake_body = []
let foodX = 13;
let foodY = 10;
let snakeX = 10;
let snakeY = 10;
let velocityX = 0;
let velocityy = 0;
let setting_arry







const updateposition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
}

function handlegameover() {
    clearInterval(interval);
    alert("game over");
    location.reload()
}



const direction = (e) => {

    if (e.key == "ArrowDown" && velocityy != -1) {
        velocityX = 0;
        velocityy = 1;
    }
    else if (e.key == "ArrowUp" && velocityy != 1) {
        velocityX = 0;
        velocityy = -1
    }
    else if (e.key == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityy = 0;
    } else if (e.key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityy = 0;
    }

}

function foodPosition() {
    if (gameover) {
        return handlegameover()
    }
    snakeX += velocityX;
    snakeY += velocityy

    if (snakeX <= 0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30) {

        gameover = true

    }


    for (i = snake_body.length - 1; i > 0; i--) {
        snake_body[i] = snake_body[i - 1]
    }
    snake_body[0] = [snakeX, snakeY]
    if (snakeX == foodX && snakeY == foodY) {
        score++
        snake_body.push([foodX, foodY])
        score_el.innerHTML = `Score is:${score}`
        high_score = score >= high_score ? score : high_score

        localStorage.setItem("high_score", high_score)
        high_score_el.innerHTML = `High Score:${high_score}`
        updateposition()
    }
    let food = `<div class="food snake_food" style="grid-area:${foodY}/${foodX}"> </div>`
    for (i = 0; i < snake_body.length; i++) {
        food += `<div class="head snake_body" style="grid-area:${snake_body[i][1]}/${snake_body[i][0]}"> </div>`

        
    }
   



    game_bord.innerHTML = food
    if(localStorage.getItem("setting")!=null){
         document.querySelector('.food').style.backgroundColor=food_color_input.value;
        document.querySelector('.head').style.backgroundColor=snake_color_input.value;
        document.querySelector('.head').style.borderRadius="50%"
        }
}
high_score_el.innerHTML = `High Score:${high_score}`
document.addEventListener("keydown", direction)






// setting coding





save_btn.onclick = function () {
    if (default_input.checked == true) {
        setting_arry = {
            details: "#293447",
            board: "#212837",
            snake:"#e3f2f2",
            food:"red",
            speed:125,
            active:false
        }
        localStorage.setItem("setting",JSON.stringify(setting_arry))
    }
    else {

        setting_arry={
            details:details_input.value,
            board:board_input.value,
            snake:snake_color_input.value,
            food:food_color_input.value,
            speed:speed_input.value,
            active:true
        }    
        localStorage.setItem("setting",JSON.stringify(setting_arry))
    }
   
   setting_btn.click()
    location.reload()
}
 


updateposition()
interval = setInterval(foodPosition, speed_input.value)

