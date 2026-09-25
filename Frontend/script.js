console.log("SCRIPT.JS IS RUNNING");
const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");

const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const fontSelect = document.getElementById("fontSelect");
const alignSelect = document.getElementById("alignSelect");
const colorPicker = document.getElementById("colorPicker");
const colorPickerBG = document.getElementById("colorPickerBG");
console.log("BG PICKER ELEMENT:", colorPickerBG);

const output = document.getElementById("output");
const outputStatus = document.getElementById("outputStatus");

const toast = document.getElementById("toast");

textInput.addEventListener("input", () => {
    const length = textInput.value.length;
    characterCount.textContent = `${length} / 100`;
});

generateBtn.addEventListener("click", gen_asc);

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
textInput.addEventListener("keydown", (event) => {
    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {
        gen_asc();
    }
});
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
colorPicker.addEventListener("input", () => {
    const asciiElement = document.getElementById("asciiText");
    if (asciiElement) {
        asciiElement.style.color = colorPicker.value;
    }
    });
colorPickerBG.addEventListener("input", () => {
    output.style.backgroundColor = colorPickerBG.value;
});
async function gen_asc() {
    console.log("USER INPUT:", textInput.value);
    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: textInput.value,
            font: fontSelect.value,
            align: alignSelect.value,
        })
    });

    console.log("STATUS:", response.status);

    const data = await response.json();
    console.log("DATA:", data);
    console.log("ASCII:", data.text);
    console.log("textInput:", textInput);
    console.log("generateBtn:", generateBtn);
    console.log("fontSelect:", fontSelect);
    console.log("alignSelect:", alignSelect);
    console.log("colorPicker:", colorPicker);
    console.log("colorPickerBg:", colorPickerBG);
    console.log("output:", output);

    output.innerHTML = "";
    const asciiElement = document.createElement("pre");
    asciiElement.id = "asciiText";
    asciiElement.className = "ascii-text";
    asciiElement.textContent = data.text;
    asciiElement.style.color = colorPicker.value;
    output.appendChild(asciiElement);
}