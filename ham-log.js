let eventLoop = require("event_loop");
let gui = require("gui");
let submenuView = require("gui/submenu");
let byteInputView = require("gui/byte_input");
let numberInputView = require("gui/number_input");
let popupView = require("gui/popup");
let dialogView = require("gui/dialog");
let textBoxView = require("gui/text_box");

let prevView = [];

let phoneticAlphabet = [
    {letter: "A", word: "Alfa", sound: "AL FAH"},
    {letter: "B", word: "Bravo", sound: "BRAH VOH"},
    {letter: "C", word: "Charlie", sound: "CHAR LEE"},
    {letter: "D", word: "Delta", sound: "DELL TAH"},
    {letter: "E", word: "Echo", sound: "ECK OH"},
    {letter: "F", word: "Foxtrot", sound: "FOKS TROT"},
    {letter: "G", word: "Golf", sound: "GOLF"},
    {letter: "H", word: "Hotel", sound: "HOH TELL"},
    {letter: "I", word: "India", sound: "IN DEE AH"},
    {letter: "J", word: "Juliet", sound: "JEW LEE ETT"},
    {letter: "K", word: "Kilo", sound: "KEY LOH"},
    {letter: "L", word: "Lima", sound: "LEE MAH"},
    {letter: "M", word: "Mike", sound: "MIKE"},
    {letter: "N", word: "November", sound: "NO VEM BER"},
    {letter: "O", word: "Oscar", sound: "OSS CAH"},
    {letter: "P", word: "Papa", sound: "PAH PAH"},
    {letter: "Q", word: "Quebec", sound: "KEH BECK"},
    {letter: "R", word: "Romeo", sound: "ROW ME OH"},
    {letter: "S", word: "Sierra", sound: "SEE AIR RAH"},
    {letter: "T", word: "Tango", sound: "TANG GO"},
    {letter: "U", word: "Uniform", sound: "YOU NEE FORM"},
    {letter: "V", word: "Victor", sound: "VIK TAH"},
    {letter: "W", word: "Whiskey", sound: "WISS KEY"},
    {letter: "X", word: "X-Ray", sound: "ECKS RAY"},
    {letter: "Y", word: "Yankee", sound: "YANG KEY"},
    {letter: "Z", word: "Zulu", sound: "ZOO LOO"},
];

// Create phonetic alphabet menu elements
function phoneticAlphabetKeys() {
    let keys = [];
    // phoneticAlphabet.forEach(function(currentValue, index) {
    //     keys.push(currentValue.word);
    // });
    for (let i = 0; i < phoneticAlphabet.length; i++) {
        keys.push(phoneticAlphabet[i].word);
    }
    return keys;
}

let qCodeMainDef = "Q-signals are a system of radio shorthand as old as wireless and developed from even older telegraphy codes. Q-signals are a set of\
abbreviations for common information that save time and allow communication between operators who don’t speak a common language.\
Modern ham radio uses them extensively. The table below lists the most common Q-signals used by hams. While Q-signals were developed\
for use by Morse operators, their use is common on phone, as well. You will often hear, \“QRZed?\” as someone asks “Who is calling me?\” or\
\“I’m getting a little QRM\” from an operator receiving some interference or \“Let’s QSY to 146.55\” as two operators change from a repeater\
frequency to a nearby simplex communications frequency.";

let phoneticAlphabetNotes = "Note: The boldfaced syllables are\
emphasized. The pronunciations shown in\
this table were designed for those who speak\
any of the international languages. The\
pronunciations given for \“Oscar\” and \“Victor\”\
may seem awkward to English-speaking\
people in the US.";

// Q-Codes
let qCodes = [
    "QRG",
    "QRL",
    "QRM",
    "QRN",
    "QRO",
    "QRP",
    "QRQ",
    "QRS",
    "QRT",
    "QRU",
    "QRV",
    "QRX",
    "QRZ",
    "QSB",
    "QSK",
    "QSL",
    "QSO",
    "QSP",
    "QST",
    "QSX",
    "QTC",
    "QTC",
    "QTH",
    "QTR",
];

// Q-Codes definitions
let qCodeDef = [
    "Your exact frequency (or that of ______) is _________kHz.\nWill you tell me my exact frequency (or that of __________)?",
    "I am busy (or I am busy with _________). Are you busy?\nUsually used to see if a frequency is busy.",
    "Your transmission is being interfered with _________\n(1. Nil; 2. Slightly; 3. Moderately; 4. Severely; 5. Extremely.)\nIs my transmission being interfered with?",
    "I am troubled by static _________. (1 to 5 as under QRM.)\nAre you troubled by static?",
    "Increase power. Shall I increase power?",
    "Decrease power. Shall I decrease power?",
    "Send faster (_________wpm). Shall I send faster?",
    "Send more slowly (_________wpm). Shall I send more slowly?",
    "Stop sending. Shall I stop sending?",
    "I have nothing for you. Have you anything for me?",
    "I am ready. Are you ready?",
    "I will call you again at ______hours (on ______kHz).\nWhen will you call me again? Minutes are usually implied rather than hours",
    "You are being called by _________ (on ______kHz).\nWho is calling me?",
    "Your signals are fading. Are my signals fading?",
    "I can hear you between signals; break in on my transmission.\nCan you hear me between your signals and if so can I break in on your transmission?",
    "I am acknowledging receipt.\nCan you acknowledge receipt (of a message or transmission)?",
    "I can communicate with _________ direct (or relay through ______).\nCan you communicate with ______ direct or by relay?",
    "I will relay to ______. Will you relay to ______?",
    "General call preceding a message addressed to all amateurs and ARRL members.\nThis is in effect \“CQ ARRL.\”",
    "I am listening to ______ on ______kHz. Will you listen to ______on ______kHz?",
    "Change to transmission on another frequency (or on ______kHz).\nShall I change to transmission on another frequency (or on ______kHz)?",
    "I have ______messages for you (or for ______).\nHow many messages have you to send?",
    "My location is _________. What is your location?",
    "The time is _________. What is the correct time?",
];

let views = {
    mainMenu: submenuView.makeWith({
        header: "Ham Log"
    },
    [
        "New",
        "View",
        "Delete",
        "References",
        "Exit"
    ]),
    refMenuView: submenuView.makeWith({
        header: "References"
    },
    [
        "Bandplans",
        "Q-Codes",
        "Phonetec Alphabet",
    ]),
    qCodesMainView: submenuView.makeWith({
        header: "Q-Codes"
    }, [
        "View Q-Codes",
        "What are Q-Codes?"
    ]),
    qCodesView: submenuView.makeWith({
        header: "Q-Codes"
    }, qCodes),
    phoneticAlphabetView: submenuView.makeWith({
        header: "Phonetic Alphabet"
    }, phoneticAlphabetKeys()),
    frequencyInputView: numberInputView.makeWith({
        header: "Frequency",
        defaultValue: 0,
        minValue: 0,
        maxValue: 700,
    }),
    popUp: dialogView.make(),
    longText: textBoxView.make(),
};

// Main menu
eventLoop.subscribe(views.mainMenu.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.frequencyInputView);
    } else if (index === 1) {
        print("View Logs");
    } else if (index === 2) {
        print("Delete Log");
    } else if (index === 3) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.refMenuView);
    } else if (index === 4) {
        eventLoop.stop();
    }
}, gui, eventLoop, views);

// go to prev view if the back button is pressed, close app if back button is pressed from main menu
eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub, _, gui, views) {
    if (gui.viewDispatcher.currentView === views.mainMenu) {
        eventLoop.stop();
    } else {
        let index = prevView.length - 1;
    
        gui.viewDispatcher.switchTo(prevView[index]);
        let _ = prevView.splice(index);
    }
}, gui, views);

// Show references
eventLoop.subscribe(views.refMenuView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        print("Bandplans");
    } else if (index === 1) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.qCodesView);
    } else if (index === 2) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.phoneticAlphabetView);
    }
}, gui, eventLoop, views);

// Q-Codes main submenu view
eventLoop.subscribe(views.qCodesMainView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.qCodesView);
    } else if (index === 1) {
        prevView.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.longText);
        views.longText.set("text", qCodeMainDef);
    }
    
}, gui, eventLoop, views);

// Q-Codes ref menu
eventLoop.subscribe(views.qCodesView.chosen, function(_sub, index, gui, eventLoop, views) {
    prevView.push(gui.viewDispatcher.currentView);
    views.longText.set("text", qCodeDef[index]);
    gui.viewDispatcher.switchTo(views.longText);
}, gui, eventLoop, views);

// Frequency Input
eventLoop.subscribe(views.frequencyInputView.input, function(_sub, number, gui, views) {
    prevView.push(gui.viewDispatcher.currentView);
    views.popUp.set("text", number.toString()); 
    gui.viewDispatcher.switchTo(views.popUp);
}, gui, views);

gui.viewDispatcher.switchTo(views.mainMenu);
eventLoop.run();