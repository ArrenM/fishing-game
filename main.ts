namespace SpriteKind {
    export const Transition = SpriteKind.create()
    export const MenuButton = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const Selector = SpriteKind.create()
}
function mainMenu () {
    scene.setBackgroundImage(assets.image`mainMenuBG`)
    titleText = textsprite.create("Menu", 0, 1)
    titleText.setMaxFontHeight(16)
    titleText.left = 4
    titleText.top = 4
    tempText = textsprite.create("New Game", 0, 1)
    button1 = makeMenuButton(tempText, "newGame")
    button1.right = 140
    button1.top = 30
    tempText = textsprite.create("Load Game", 0, 1)
    button2 = makeMenuButton(tempText, "loadGame")
    button2.right = 140
    button2.top = 60
    tempText = textsprite.create("Settings", 0, 1)
    button3 = makeMenuButton(tempText, "settings")
    button3.right = 140
    button3.top = 90
    promptText1 = textsprite.create("Back", 0, 1)
    promptText1.setIcon(assets.image`B_Button`)
    promptText1.setPosition(20, 110)
    selector = sprites.create(assets.image`selectorRight`, SpriteKind.Selector)
    selector.setPosition(-100, 0)
    cursor = sprites.create(assets.image`cursorRight`, SpriteKind.Cursor)
    controller.moveSprite(cursor, 100, 100)
    cursor.setStayInScreen(true)
    cursor.setPosition(70, 30)
}
function callScene (sceenName: string) {
    if (sceenName == "titleScreen") {
        titleScreen()
    } else if (sceenName == "mainMenu") {
        mainMenu()
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentScene == "mainMenu") {
        loadScene("titleScreen", "fade")
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentScene == "titleScreen") {
        loadScene("mainMenu", "fade")
    }
})
function clearScene () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.MenuButton)
    sprites.destroyAllSpritesOfKind(SpriteKind.Transition)
    sprites.destroyAllSpritesOfKind(SpriteKind.Cursor)
    sprites.destroyAllSpritesOfKind(SpriteKind.Selector)
    scene.setBackgroundColor(0)
    scene.setBackgroundImage(assets.image`blankBG`)
}
function loadScene (sceneName: string, transitionName: string) {
    currentScene = transitionName
    if (transitionName == "fade") {
        fade(0, 15, 300)
    } else if (false) {
    	
    }
    clearScene()
    if (transitionName == "fade") {
        pause(200)
    } else if (false) {
    	
    }
    callScene(sceneName)
    if ((0 as any) == ("fade" as any)) {
        fade(15, 0, 300)
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
sprites.onOverlap(SpriteKind.Cursor, SpriteKind.MenuButton, function (sprite, otherSprite) {
    selectedButton = otherSprite
    selector.y = otherSprite.y
    selector.left = otherSprite.left - 3
})
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
function fade (colorStart: number, colorEnd: number, time: number) {
    if (transitionSprite) {
        sprites.destroy(transitionSprite)
    }
    transitionSprite = sprites.create(assets.image`blankBG`, SpriteKind.Transition)
    transitionSprite.image.fill(colorStart)
    for (let index = 0; index < 10; index++) {
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
function makeMenuButton (textSprite: Sprite, actionName: string) {
    newButton = sprites.create(textSprite.image, SpriteKind.MenuButton)
    sprites.destroy(textSprite)
    sprites.setDataString(newButton, "actionName", actionName)
    return newButton
}
let newButton: Sprite = null
let transitionSprite: Sprite = null
let subtitleText: TextSprite = null
let selectedButton: Sprite = null
let currentScene = ""
let cursor: Sprite = null
let selector: Sprite = null
let promptText1: TextSprite = null
let button3: Sprite = null
let button2: Sprite = null
let button1: Sprite = null
let tempText: TextSprite = null
let titleText: TextSprite = null
loadScene("titleScreen", "start")
game.onUpdateInterval(500, function () {
    if (selectedButton) {
        selectedButton.startEffect(effects.bubbles, 100)
    }
})
