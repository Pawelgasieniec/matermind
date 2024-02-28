const maxRounds = 8;
let form;
let results;
let zn = 1296;
let Z = generateCombinations(zn);;
let skoder, slamacz, sklucz, sklucz2, sl;
let i, i1, i2, j
let runda = 1;

function generateCombinations(zn) {
    let Z = [];
    for (let i = 0; i < zn; i++) {
        Z[i] = "";
        let i2 = i;
        for (let j = 0; j < 4; j++) {
            Z[i] += String.fromCharCode(65 + (i2 % 6));
            i2 = Math.floor(i2 / 6);
        }
    }
    return Z;
}

function getNextWord() {
    i2 = Math.floor(Math.random() * zn);
    slamacz = Z[i2];
    // usuwamy wylosowane słowo ze zbioru Z
    Z.splice(i2, 1);
    zn--;
}

function presentOurGuess() {
    results.textContent += "\r\n" + "Runda " + runda + ": " + slamacz + ", " + zn + " kombinacji pozostało";
}

function alertAndResults(message) {
    results.textContent += "\r\n" + message;
    alert(message);
}

function analizujOdpowiedz(event) {
    event.preventDefault(); // Prevent default form submission
    sklucz = form.elements.userFeedbackInput.value;
    results.textContent += ", ocena: " + sklucz;
    if (sklucz === "xxxx") {
        alertAndResults("Łamacz odgadł kod (" + slamacz + ") w " + runda + " rundzie");
        return;
    }
    if (runda <= maxRounds) {
        if (zn > 0) {
            zgaduj();
            form.elements.userFeedbackInput.value = "";
        } else {
            alertAndResults("Po " + runda + " rundach nie ma pasujących kombinacji. Czyżby użytkownik oszukiwał?");
            return;
        }
    } else {
        alertAndResults("Kod nie został odgadnięty w " + maxRounds + " rundach");
        return;
    }
}

function main() {
    form = document.getElementById("userFeedbackForm");
    results = document.getElementById("results");
    form.elements.userFeedbackInput.value = "";
    form.addEventListener("submit", analizujOdpowiedz);
    getNextWord();
    presentOurGuess();

}
function zgaduj() {
    runda++;
    getNextWord();
    presentOurGuess();
    // rozgrywka
    if (zn > 0) {
        let tempZ = [];
        // ze zbioru Z wyrzucamy nie pasujace kody
        for (i2 = i1 = 0; i1 < zn; i1++) {
            skoder = Z[i1];
            sl = slamacz;
            console.log("sl: " + sl)
            sklucz2 = "";
            for (i = 0; i < 4; i++) {
                if (skoder[i] === slamacz[i]) {
                    sklucz2 += 'x';
                    skoder = skoder.substring(0, i) + '#' + skoder.substring(i + 1); // wartownik w1
                    sl = sl.substring(0, i) + '$' + sl.substring(i + 1); // wartownik w2

                }
            }
            for (i = 0; i < 4; i++) {
                if (skoder[i] !== '#') {
                    for (j = 0; j < 4; j++) {
                        if (skoder[i] === sl[j]) {
                            sklucz2 += 'o';
                            sl = sl.substring(0, j) + '$' + sl.substring(j + 1); // wartownik w2
                            break;
                        }
                    }
                }
            }
            if (sklucz === sklucz2) {
                tempZ[i2] = Z[i1];
                i2++;
            }
        }
        Z = tempZ;
        zn = i2;
    }

}

main();