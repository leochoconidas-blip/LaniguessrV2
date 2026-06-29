function showCharacterMenu(){

    document.getElementById("menu").innerHTML = `

        <h2>Deviner les personnages</h2>

        <button onclick="startGame('easy')">Easy</button>

        <button onclick="startGame('medium')">Medium</button>

        <button onclick="startGame('hard')">Hard</button>

        ${
            game.progress.characters.secret
            ?
            `<button onclick="startGame('secret')">
                Secret
            </button>`
            :
            `<button disabled>
                Secret
            </button>`
        }

    `;

}

function showBlindMenu(){

    document.getElementById("menu").innerHTML = `

        <h2>Blind Test</h2>

        <button onclick="startBlindTest('opening')">
            Opening
        </button>

        <button onclick="startBlindTest('ending')">
            Ending
        </button>

        <button onclick="startBlindTest('ost')">
            OST
        </button>

        ${
            game.progress.blindtest.secret
            ?
            `<button onclick="startBlindTest('secret')">
                Secret
            </button>`
            :
            `<button disabled>
                Secret
            </button>`
        }

    `;

}
