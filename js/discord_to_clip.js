const buttons = document.getElementsByClassName("toclip")

const buttonsEnableStatus = new Map();

function IsEnabled(button) {
    return buttonsEnableStatus.get(button);
}

for (let clipBtn of buttons) {
    const username = clipBtn.dataset.username;

    const defaultText = clipBtn.innerHTML;

    const hoverText = clipBtn.dataset.hover;

    const clickText = clipBtn.dataset.clicked;

    buttonsEnableStatus.set(clipBtn, true);

    clipBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(username)

        buttonsEnableStatus.set(clipBtn, false);

        clipBtn.innerHTML = clickText;
        setTimeout(() => {
            clipBtn.innerHTML = defaultText;
            buttonsEnableStatus.set(clipBtn, true);
        }, 1000)
    })

    clipBtn.addEventListener("mouseover", () => {
        if(IsEnabled(clipBtn)){
            clipBtn.innerHTML = hoverText;
        }
    })

    clipBtn.addEventListener("mouseout", () => {
        if(IsEnabled(clipBtn)){
            clipBtn.innerHTML = defaultText;
        }
    })


}

