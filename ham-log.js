let eventLoop = require("event_loop");
let gui = require("gui");
let submenuView = require("gui/submenu");
let byteInputView = require("gui/byte_input");
let numberInputView = require("gui/number_input");
let popupView = require("gui/popup");
let dialogView = require("gui/dialog");
let textBoxView = require("gui/text_box");
let textInputView = require("gui/text_input");

let prevViews = [];

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

function bandKeys(band) {
    let keys = [];
    for (let i = 0; i < band.length; i++) {
        keys.push(band[i].wavelength.toString());
    }
    return keys;
}

// let mBandPlans = [
//     {
//         wavelength: 160,
//         plans: [
//             "CW",
//             "Digital Modes",
//             "CW QRP",
//             "SSB, SSTV, and other wideband modes",
//             "SSB QRP",
//             "Experimental",
//             "Beacons"
//         ]
//     },
//     {
//         wavelength: 80,
//         plans: [
//             "RTTY/Data DX",
//             "RTTY/Data",
//             "DX window",
//             "SSTV",
//             "AM calling frequency"
//         ]
//     },
//     {
//         wavelength: 60,
//         plans: [
//             "USB phone and CW/RTTY/data",
//             "USB phone and CW/RTTY/data",
//             "USB phone and CW/RTTY/data; 9.15 watts ERP max",
//             "USB phone and CW/RTTY/data"
//         ]
//     },
//     {
//         wavelength: 40,
//         plans: [
//             "RTTY/data DX",
//             "RTTY/data",
//             "SSTV",
//             "AM calling frequency",
//         ]
//     },
//     {
//         wavelength: 30,
//         plans: [
//             "RTTY",
//             "Packet"
//         ]
//     },
//     {
//         wavelength: 20,
//         plans: [
//             "RTTY",
//             "Packet",
//             "NCDXF Beacons",
//             "Packet",
//             "SSTV",
//             "AM calling frequency"
//         ]
//     },
//     {
//         wavelength: 10,
//         plans: [
//             "CW",
//             "RTTY",
//             "CW",
//             "Beacons",
//             "Phone",
//             "SSTV",
//             "AM",
//             "Satellite Uplinks or Downlinks",
//             "Repeater Inputs",
//             "FM Simplex",
//             "Repeater Outputs"
//         ]
//     },
//     {
//         wavelength: 6,
//         plans: [
//             "CW, beacons",                              // 1
//             "beacon subband",                           // 2
//             "SSB, CW",                                  // 3
//             "DX window",                                // 4
//             "SSB Calling",                              // 5
//             "All modes",                                // 6
//             "Nonvoice communications",                  // 7
//             "Digital (packet) calling",                 // 8
//             "Radio remote control (20-kHz channels)",   // 9
//             "Pacific DX window",                        // 10
//             "Repeater inputs (19 channels)",            // 11
//             "Digital repeater inputs",                  // 12
//             "Simplex (six channels)",                   // 13
//             "Repeater outputs (19 channels)",           // 14
//             "Digital repeater outputs",                 // 15
//             "Repeater inputs (23 channels)",            // 16
//             "FM simplex",                               // 17
//             "TEST PAIR (input)",                        // 18
//             "Repeater output (23 channels)",            // 19
//             "Primary FM simplex",                       // 20
//             "Secondary FM simplex",                     // 21
//             "TEST PAIR (output)",                       // 22
//             "Repeater inputs (except as noted; 19 channel)", // 23
//             "Remote base FM simplex",                   // 24
//             "Simplex",                                  // 25
//             "Radio Remote Control",                     // 26
//             "Repeater outputs (19 channels)",           // 27
//             "Radio remote control",                     // 28
//             "Simplex",                                  // 29
//         ]
//     },
//     {
//         wavelength: 2,
//         plans: [
//             "EME (CW)",
//             "General CW and weak signals",
//             "EME and weak-signal SSB",
//             "National calling requency",
//             "General SSB operation",
//             "Propagation beacons",
//             "New OSCAR subband",
//             "Linear translator inputs",
//             "FM repeater inputs",
//             "Weak signal and FM simplex",
//             "Linear translator outputs",
//             "FM repeater outputs",
//             "Misc and experimental modes",
//             "OSCAR subband",
//             "Repeater inputs",
//             "Simplex",
//             "National Simplex Calling Frequency",
//             "Repeater outputs",
//             "Repeater outputs",
//             "Simplex",
//             "Repeater inputs"
//         ]
//     },
//     {
//         wavelength: 1.25,
//         plans: [
//             "Weak-signal modes",
//             "EME",
//             "Propagation beacons",
//             "SSB & CW calling frequency",
//             "Weak-signal CW & SSB",
//             "Local coordinator's option",
//             "RM repeater inputs only",
//             "FM simplex",
//             "Digital, packet",
//             "Links, control",
//             "Local coordinators option",
//             "Repeater outputs only"
//         ]
//     },
// ];

// function getMPlanByWavelength(wavelength) {
//     for (let i = 0; i < mBandPlans.length; i++) {
//         if (mBandPlans[i].)
//     }
// }

// let cmBandPlans = [
//     {
//         wavelength: 70,
//         plans: [

//         ]
//     }
// ];

let bands = {
    hamMeterBands:   [
        {wavelength: 630, bandStart: 472, bandEnd: 479, unit: "kHz"},
        {wavelength: 160, bandStart: 1800, bandEnd: 479, unit: "kHz"},
        {wavelength: 80, bandStart: 3.5, bandEnd: 4.0, unit: "MHz"},
        {wavelength: 60},
        {wavelength: 40, bandStart: 7.0, bandEnd: 7.3, unit: "MHz"},
        {wavelength: 30, bandStart: 10.1, bandEnd: 10.15, unit: "MHz"},
        {wavelength: 20, bandStart: 14.0, bandEnd: 14.35, unit: "MHz"},
        {wavelength: 17, bandStart: 18.1, unit: "MHz"},
        {wavelength: 15, bandStart: 21.0, bandEnd: 21.45},
        {wavelength: 12, bandStart: 24.89, bandEnd: 24.99, unit: "MHz"},
        {wavelength: 10, bandStart: 28.0, bandEnd: 30.0, unit: "MHz"},
        {wavelength: 6, bandStart: 50.0, bandEnd: 54.0, unit: "MHz"},
        {wavelength: 2, bandStart: 144.0, bandEnd: 148.0, unit: "MHz"},
        {wavelength: 1.25, bandStart: 222.0, bandEnd: 225.0, unit: "MHz"},
    ],
    hamCentimeterBands: [
        {wavelength: 70, bandStart: 420.0, bandEnd: 450, unit: "MHz"},
        {wavelength: 33, bandStart: 902, bandEnd: 928, unit: "MHz"},
        {wavelength: 23, bandStart: 1240, bandEnd: 1300, unit: "MHz"},
        {wavelength: 13, bandStart: 2300, bandEnd: 2310, unit: "MHz"},
        {wavelength: 12, bandStart: 2400, bandEnd: 2450, unit: "MHz"},
        {wavelength: 9, bandStart: 3.3, bandEnd: 3.5, unit: "GHz"},
        {wavelength: 5, bandStart: 5.65, bandEnd: 5.925, unit: "GHz"},
        {wavelength: 3, bandStart: 10.0, bandEnd: 10.5, unit: "GHz"},
        {wavelength: 1.25, bandStart: 24.0, bandEnd: 24.25, unit: "GHz"},
    ],
    hamMillimeterBands: [
        {wavelength: 6.3, bandStart: 47.0, bandEnd: 47.2, unit: "GHz"},
        {wavelength: 3.8, bandStart: 75.5, bandEnd: 81.0, unit: "GHz"},
        {wavelength: 2.0, bandStart: 142.0, bandEnd: 149.0, unit: "GHz"},
        {wavelength: 1.2, bandStart: 241.0, bandEnd: 250.0, unit: "GHz"},
    ]
};

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

let qCodeMainDef = "Q-signals are a system of radio shorthand as old as wireless and developed from even older telegraphy codes. Q-signals are a set of\
abbreviations for common information that save time and allow communication between operators who don’t speak a common language.\
Modern ham radio uses them extensively. The table below lists the most common Q-signals used by hams. While Q-signals were developed\
for use by Morse operators, their use is common on phone, as well. You will often hear, “QRZed?” as someone asks “Who is calling me?” or\
“I’m getting a little QRM” from an operator receiving some interference or “Let’s QSY to 146.55” as two operators change from a repeater\
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
    mainMenu: submenuView.makeWith({ // Main Menu
        header: "Ham Log"
    },
    [
        "New",
        "View",
        "Delete",
        "References",
        "Profile",
        "Exit"
    ]),
    refMenuView: submenuView.makeWith({ // Reference Menu
        header: "References"
    },
    [
        "Bands",
        "Q-Codes",
        "Phonetec Alphabet",
    ]),
    profileView: submenuView.makeWith({
        header: "Profile"
    },
    [
        "View",
        "Set Callsign",
        "Set License Level",
    ]),
    setCallsignView: textInputView.makeWith({
        minLength: 4,
        maxLength: 13,
        header: "Set Callsign",
        defaultText: "HAM Callsign",
        defaultTextClear: true
    }),
    qCodesMainView: submenuView.makeWith({ // Q-Codes Main Menu
        header: "Q-Codes"
    }, [
        "View Q-Codes",
        "What are Q-Codes?"
    ]),
    qCodesView: submenuView.makeWith({ // Q-Codes Ref Menu
        header: "Q-Codes"
    }, qCodes),
    phoneticAlphabetView: submenuView.makeWith({ // Phonetic Alphabet
        header: "Phonetic Alphabet"
    }, phoneticAlphabetKeys()),
    bandInputView: numberInputView.makeWith({ // Band Select View
        header: "Select Band",
        defaultValue: 0,
        minValue: 0,
        maxValue: 700,
    }),
    bandsView: submenuView.makeWith({
        header: "Bands"
    },
    [
        "Meter Bands",
        "Centimeter Bands",
        "Millimeter Bands"
    ]),
    mBandView: submenuView.makeWith({
        header: "Meter Bands"
    }, bandKeys(bands.hamMeterBands)),
    cmBandView: submenuView.makeWith({
        header: "Centimeter Bands"
    }, bandKeys(bands.hamCentimeterBands)),
    mmBandView: submenuView.makeWith({
        header: "Millimeter Bands"
    }, bandKeys(bands.hamMillimeterBands)), 
    popUp: dialogView.make(),
    longText: textBoxView.make(),
};

// go to prev view if the back button is pressed, close app if back button is pressed from main menu
eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub, _, gui, views) {
    if (gui.viewDispatcher.currentView === views.mainMenu) {
        eventLoop.stop();
    } else {
        let index = prevViews.length - 1;
    
        gui.viewDispatcher.switchTo(prevViews[index]);
        let _ = prevViews.splice(index);
    }
}, gui, views);

// Show references
eventLoop.subscribe(views.refMenuView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        print("Band");
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.bandsView);
    } else if (index === 1) {
        print("Bandplan");
    } else if (index === 2) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.qCodesMainView);
    } else if (index === 3) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.phoneticAlphabetView);
    }
}, gui, eventLoop, views);

// Profile
eventLoop.subscribe(views.profileView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        print("Views")
    } else if (index === 1) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(gui.setCallsignView);
    } else if (index === 2) {
        print("Set license level")
    }
});

// Q-Codes main submenu view
eventLoop.subscribe(views.qCodesMainView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.qCodesView);
    } else if (index === 1) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.longText);
        views.longText.set("text", qCodeMainDef);
    }
    
}, gui, eventLoop, views);

// Q-Codes ref menu
eventLoop.subscribe(views.qCodesView.chosen, function(_sub, index, gui, eventLoop, views) {
    prevViews.push(gui.viewDispatcher.currentView);
    views.longText.set("text", qCodeDef[index]);
    gui.viewDispatcher.switchTo(views.longText);
}, gui, eventLoop, views);

// Frequency Input
eventLoop.subscribe(views.bandInputView.input, function(_sub, number, gui, views) {
    prevViews.push(gui.viewDispatcher.currentView);
    views.popUp.set("text", number.toString()); 
    gui.viewDispatcher.switchTo(views.popUp);
}, gui, views);

// Bands
eventLoop.subscribe(views.bandsView.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.mBandView);
    } else if (index === 1) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.cmBandView);
    } else if (index === 2) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.mmBandView);
    }
}, gui, eventLoop, views);

// Meter bands
// eventLoop.subscribe(views.mBandView, function(_sub, index, gui, eventLoop, views) {
//     // prevViews.push(gui.viewDispatcher.currentView);
//     // gui.viewDispatcher.switchTo(views.);
// }, gui, eventLoop, views);

// Main menu
eventLoop.subscribe(views.mainMenu.chosen, function(_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.frequencyInputView);
    } else if (index === 1) {
        print("View Logs");
    } else if (index === 2) {
        print("Delete Log");
    } else if (index === 3) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.refMenuView);
    } else if (index === 4) {
        prevViews.push(gui.viewDispatcher.currentView);
        gui.viewDispatcher.switchTo(views.profileView);
    } else if (index === 5) {
        eventLoop.stop();
    }
}, gui, eventLoop, views);

gui.viewDispatcher.switchTo(views.mainMenu);
eventLoop.run();