const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");

const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const fontSelect = document.getElementById("fontSelect");
const alignSelect = document.getElementById("alignSelect");
const colorSelect = document.getElementById("colorSelect");
const reverseToggle = document.getElementById("reverseToggle");

const output = document.getElementById("output");
const outputStatus = document.getElementById("outputStatus");

const toast = document.getElementById("toast");


/* =========================
   CHARACTER COUNTER
========================= */

textInput.addEventListener("input", () => {

    const length = textInput.value.length;

    characterCount.textContent = `${length} / 100`;

});


/* =========================
   GENERATE
========================= */

generateBtn.addEventListener("click", generateAscii);


function generateAscii() {

    const text = textInput.value.trim();

    if (!text) {

        textInput.focus();

        return;
    }


    /*
        Temporary frontend generator.

        Later, replace this function with a
        fetch() request to your FastAPI backend.
    */

    let ascii = createAsciiPreview(text);


    if (reverseToggle.checked) {

        ascii = ascii
            .split("")
            .reverse()
            .join("");
    }


    const alignment = alignSelect.value;


    let alignmentStyle = "left";

    if (alignment === "center") {
        alignmentStyle = "center";
    }

    if (alignment === "right") {
        alignmentStyle = "right";
    }


    const color = getColor(colorSelect.value);


    output.innerHTML = `
        <pre
            id="asciiText"
            style="
                text-align: ${alignmentStyle};
                color: ${color};
            "
        >${escapeHtml(ascii)}</pre>
    `;


    outputStatus.textContent = "Generated successfully";
}


/* =========================
   ASCII PREVIEW
========================= */

function createAsciiPreview(text) {

    const letters = {

        A: [
            "   A   ",
            "  A A  ",
            " AAAAA ",
            "A     A",
            "A     A"
        ],

        B: [
            "BBBBB ",
            "B    B",
            "BBBBB ",
            "B    B",
            "BBBBB "
        ],

        C: [
            " CCCC ",
            "C     ",
            "C     ",
            "C     ",
            " CCCC "
        ],

        D: [
            "DDDD  ",
            "D   D ",
            "D    D",
            "D   D ",
            "DDDD  "
        ],

        E: [
            "EEEEE",
            "E    ",
            "EEE  ",
            "E    ",
            "EEEEE"
        ],

        F: [
            "FFFFF",
            "F    ",
            "FFF  ",
            "F    ",
            "F    "
        ],

        I: [
            "IIIII",
            "  I  ",
            "  I  ",
            "  I  ",
            "IIIII"
        ],

        L: [
            "L    ",
            "L    ",
            "L    ",
            "L    ",
            "LLLLL"
        ],

        O: [
            " OOO ",
            "O   O",
            "O   O",
            "O   O",
            " OOO "
        ],

        R: [
            "RRRR ",
            "R   R",
            "RRRR ",
            "R R  ",
            "R  RR"
        ],

        S: [
            " SSSS",
            "S    ",
            " SSS ",
            "    S",
            "SSSS "
        ],

        T: [
            "TTTTT",
            "  T  ",
            "  T  ",
            "  T  ",
            "  T  "
        ],

        U: [
            "U   U",
            "U   U",
            "U   U",
            "U   U",
            " UUU "
        ]
    };


    const uppercase = text.toUpperCase();

    const rows = ["", "", "", "", ""];


    for (const char of uppercase) {

        if (char === " ") {

            for (let i = 0; i < 5; i++) {
                rows[i] += "     ";
            }

            continue;
        }


        const letter = letters[char];


        if (!letter) {

            for (let i = 0; i < 5; i++) {
                rows[i] += "????? ";
            }

            continue;
        }


        for (let i = 0; i < 5; i++) {

            rows[i] += letter[i] + "  ";
        }
    }


    return rows.join("\n");
}


/* =========================
   COLORS
========================= */

function getColor(color) {

    const colors = {

        white: "#FFFFFF",

        gray: "#999999",

        green: "#A6E3A1",

        blue: "#89B4FA",

        red: "#F38BA8"
    };


    return colors[color] || "#FFFFFF";
}


/* =========================
   COPY
========================= */

copyBtn.addEventListener("click", async () => {

    const asciiElement = document.getElementById("asciiText");

    if (!asciiElement) {
        return;
    }


    await navigator.clipboard.writeText(
        asciiElement.textContent
    );


    showToast();
});


function showToast() {

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);
}


/* =========================
   CLEAR
========================= */

clearBtn.addEventListener("click", () => {

    textInput.value = "";

    characterCount.textContent = "0 / 100";

    output.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                _
            </div>

            <h4>Your ASCII art will appear here</h4>

            <p>
                Enter text on the left and click
                <strong>Generate</strong>.
            </p>

        </div>
    `;

    outputStatus.textContent = "Waiting for input";

});


/* =========================
   ENTER TO GENERATE
========================= */

textInput.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {

        generateAscii();
    }

});


/* =========================
   HTML ESCAPE
========================= */

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}