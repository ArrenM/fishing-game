namespace SpriteKind {
    export const Transition = SpriteKind.create()
    export const MenuCursor = SpriteKind.create()
}
function mainMenu () {
    scene.setBackgroundImage(assets.image`mainMenuBG`)
    titleText = textsprite.create("Menu", 0, 1)
    titleText.setMaxFontHeight(16)
    titleText.left = 4
    titleText.top = 4
    promptText1 = textsprite.create("Select", 0, 1)
    promptText1.setIcon(assets.image`A_Button`)
    promptText1.setPosition(30, 110)
    menuButtons = [
    textsprite.create("Start Game", 0, 1),
    textsprite.create("Enter Password", 0, 1),
    textsprite.create("Settings", 0, 1),
    textsprite.create("About", 0, 1)
    ]
    cursor = sprites.create(assets.image`cursorRight`, SpriteKind.MenuCursor)
    selectedButton = 0
    index = 1
    for (let value of menuButtons) {
        value.right = 150
        value.top = index * 24
        index += 1
    }
    updateCursor()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursor) {
        if (selectedButton == 0) {
            selectedButton = menuButtons.length - 1
        } else {
            selectedButton += -1
        }
        updateCursor()
    }
})
function updateCursor () {
    cursor.right = menuButtons[selectedButton].left
    cursor.y = menuButtons[selectedButton].y
    for (let value of menuButtons) {
        value.setOutline(1, 0)
    }
    menuButtons[selectedButton].setOutline(1, 12)
}
function callScene (sceenName: string) {
    if (sceenName == "titleScreen") {
        titleScreen()
    } else if (sceenName == "mainMenu") {
        mainMenu()
    } else {
        sceneNotFound(sceenName)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentScene == "titleScreen") {
        scene.cameraShake(2, 100)
    } else if (currentScene == "mainMenu") {
        loadScene("titleScreen", "disolve")
    } else {
    	
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentScene == "titleScreen") {
        loadScene("mainMenu", "disolve")
    } else if (currentScene == "mainMenu") {
        if (selectedButton == 0) {
            startGame()
        } else if (selectedButton == 1) {
            loadScene("password", "disolve")
        } else if (selectedButton == 2) {
            loadScene("settings", "disolve")
        } else if (selectedButton == 3) {
            loadScene("about", "disolve")
        }
    } else if (currentScene == "error") {
        game.reset()
    }
})
function startGame () {
    error("not yet", "implemented")
}
function clearScene () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Transition)
    sprites.destroyAllSpritesOfKind(SpriteKind.MenuCursor)
    scene.setBackgroundColor(0)
    scene.setBackgroundImage(assets.image`blankBG`)
}
function loadScene (sceneName: string, transitionName: string) {
    currentScene = transitionName
    if (transitionName == "disolve") {
        disolve(0, 15, 300)
    }
    clearScene()
    if (transitionName == "disolve") {
        pause(200)
    }
    callScene(sceneName)
    if (currentScene != "error") {
        if (transitionName == "disolve") {
            disolve(15, 0, 300)
        } else if (transitionName == "start") {
            titleText.y = -100
            titleText.setVelocity(0, 200)
            pauseUntil(() => titleText.y >= 50)
            titleText.setVelocity(0, 0)
            titleText.y = 60
            scene.cameraShake(4, 100)
        }
        currentScene = sceneName
    }
}
function errorScene (messageTop: string, messageBottom: string) {
    faceSprite = sprites.create(assets.image`errorFace`, SpriteKind.Text)
    faceSprite.setPosition(80, 40)
    titleText = textsprite.create(messageTop, 0, 2)
    titleText.setPosition(80, 60)
    subtitleText = textsprite.create(messageBottom, 0, 2)
    subtitleText.setPosition(80, 70)
    promptText1 = textsprite.create("restart", 0, 1)
    promptText1.setIcon(assets.image`A_Button`)
    promptText1.setPosition(80, 100)
    currentScene = "error"
}
function sceneNotFound (sceneName: string) {
    errorScene("scene:" + "\"" + sceneName + "\"", "not found")
}
function titleScreen () {
    scene.setBackgroundImage(assets.image`titleScreenBackground`)
    titleText = textsprite.create("Fishing Game", 0, 9)
    titleText.setMaxFontHeight(16)
    titleText.setOutline(1, 8)
    titleText.setPosition(80, 60)
    subtitleText = textsprite.create("by ArrenM.github.io", 0, 15)
    subtitleText.setPosition(80, 75)
    promptText1 = textsprite.create("Start", 0, 15)
    promptText1.setIcon(assets.image`A_Button`)
    promptText1.setPosition(80, 100)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursor) {
        selectedButton = (selectedButton + 1) % menuButtons.length
        updateCursor()
    }
})
function disolve (colorStart: number, colorEnd: number, time: number) {
    if (transitionSprite) {
        sprites.destroy(transitionSprite)
    }
    transitionSprite = sprites.create(assets.image`blankBG`, SpriteKind.Transition)
    transitionSprite.image.fill(colorStart)
    for (let index2 = 0; index2 < 10; index2++) {
        for (let indexX = 0; indexX <= 160; indexX++) {
            for (let indexY = 0; indexY <= 120; indexY++) {
                if (Math.percentChance(25)) {
                    transitionSprite.image.setPixel(indexX, indexY, colorEnd)
                }
            }
        }
        pause(time / 10)
    }
    transitionSprite.image.fill(colorEnd)
}
function error (messageTop: string, messageBottom: string) {
    clearScene()
    errorScene(messageTop, messageBottom)
}
let transitionSprite: Sprite = null
let subtitleText: TextSprite = null
let faceSprite: Sprite = null
let currentScene = ""
let index = 0
let selectedButton = 0
let cursor: Sprite = null
let menuButtons: TextSprite[] = []
let promptText1: TextSprite = null
let titleText: TextSprite = null
loadScene("titleScreen", "start")
