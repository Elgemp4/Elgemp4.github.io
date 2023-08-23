const progress_list = document.getElementsByClassName("progress_list")[0];

const popup = document.querySelector(".configuration");

const editForm = document.querySelector("form[class='editForm']");
const nameField = document.querySelector("input[id='name']");
const percentageField = document.querySelector("input[id='percentage']");

const addBtn = document.querySelector("button[class='addBtn']");
addBtn.addEventListener("click", () => {
    nameField.value = "";
    percentageField.value = "";
    popup.showModal()
});

let isEditing = false;
let editedProgress = null;

editForm.addEventListener("submit", () => {
    if(!isEditing)
    {
        listOfProgress.push(new progress_tracker(nameField.value, percentageField.value, progress_list));
    }
    else{
        editedProgress.name = nameField.value;
        editedProgress.percentage = percentageField.value;
    }

    isEditing = false;
    editedProgress = null;
});

const listOfProgress = [];


class progress_tracker{
    #percentage;
    #name;

    static template;

    static {
        progress_tracker.template = document.querySelector("div[data-type='template']").cloneNode(true);
    }

    constructor(name, percentage, parent) {

        this.parentNode = parent;

        this.createCircularProgress();

        this.name = name;
        this.percentage = percentage;

    }

    createCircularProgress()
    {
        let buildingNode = progress_tracker.template.cloneNode(true);
        buildingNode.removeAttribute("hidden");
        this.editButton = buildingNode.querySelector("button[class='edit']");
        this.editButton.addEventListener("click", () => {
            nameField.value = this.name;
            percentageField.value = this.percentage;
            isEditing = true;
            editedProgress = this;
            popup.showModal();
        });
        this.nameText = buildingNode.querySelector("h2[class='title']");
        this.progress = buildingNode.querySelector("div[class='circle']");
        this.percentageInput = buildingNode.querySelector("span[class='percentage']");

        this.parentNode.insertBefore(buildingNode, addBtn.parentNode);
    }

    set name(val)
    {
        this.#name = val;

        this.nameText.innerText = this.#name;
    }

    get name(){
        return this.#name;
    }

    set percentage(val)
    {
        this.#percentage = val;

        this.percentageInput.innerText = val + "%";

        this.progress.setAttribute("style", "background: conic-gradient(var(--accent) 0deg " + 360 * (this.percentage/100) + "deg, var(--secondary-button) 0deg 360deg);");
    }

    get percentage()
    {
        return this.#percentage;
    }
}