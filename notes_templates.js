// ==UserScript==
// @name         Improved Notes
// @namespace    alder_util
// @version      0.0
// @description  Adds improved functionality to pandos note fascilites.
// @author       Jeremy Bloom
// @match        https://alder.pandolink.com/customer/master/*
// @icon         https://www.google.com/s2/favicons?domain=alder.pando.com
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function() {
    //Consts
    const NOTE_TEMPLATES = [
        {"name": "CSR", "value": "CSR_Normal", "template": ["Name: ", "Verified: ", "Phone: %phonenumber%", "Issue: ", "Resolution: "]},
        {"name": "CSR Cancel", "value": "CSR_cancel", "template": ["Name: ", "Verified: ", "Phone: ", "Issue: ", "How I built value: ", "Resolutions Offered: ", "Buyout/Takeover Offered: ", "Resolution: "]},
        {"name": "TSR", "value": "TSR", "template": ["Name: ", "Verified: ", "Phone: ", "Issue: ","Troubleshooting: ", "Resolution: "]}

    ];
    var five9_phonenumber = "";
    chrome.localStorage
    window.NOTE_TEMPLATES = NOTE_TEMPLATES;
    // functions
    //Sets attributes of a passed element
    function setAttributes(el, attrs) {
        for(var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
        return el;
      }
    let inject_template = async function () {
        let selected_value = document.getElementById("note-template-select").value;
        let template_string = "";
        // search for the index given the value from the selection
        for(let template_index in NOTE_TEMPLATES) {
            let template = NOTE_TEMPLATES[template_index]
            if (selected_value === template.value) {
                //create the string from the list inside the date structure.
                for (let template_list_index in template.template) {
                    let template_string_part = template.template[template_list_index] + '\n';
                    template_string += template_string_part.replace("%phonenumber%", five9_phonenumber);
                }
                break;
            }
        }
        //insert the template string, if it was able to construct anything
        if ( template_string) {document.getElementById("Note").value = template_string;}
    };

    let create_note_template_ui = function (templates_obj) {
        //consts
        const select_element_id = "note-template-select";
        const template_button_id = "note-template-button";
        const storage_index_key = "template_selection_index";

        //create select container
        document.querySelector("#add-note-button").parentElement.prepend(setAttributes(document.createElement("select"), {"id": select_element_id, "class": "btn btn-outline btn-primary m-b-3 bg-white"}));

        document.getElementById(select_element_id).addEventListener("change", event => {
            localStorage.setItem("template_selection_index", event.target.selectedIndex);
        });

         //create select button
         document.querySelector("#add-note-button").parentElement.prepend(setAttributes(document.createElement("span"), {"id": template_button_id, "class": "btn btn-outline btn-primary m-b-3 bg-white"}));
         document.getElementById(template_button_id).onclick = inject_template;
         document.getElementById(template_button_id).innerText = "Insert Template";

        //create options
        for (let template_outline_index in templates_obj) {
            let template_outline = templates_obj[template_outline_index];
            let temp_option_element = setAttributes(document.createElement("option"), {"value": template_outline.value});
            temp_option_element.textContent = template_outline.name;
            document.getElementById(select_element_id).add(temp_option_element);
        }

        //set the index from the storage to the current index, if any
        let last_selected_index = localStorage.getItem(storage_index_key);
        document.getElementById(select_element_id).selectedIndex = (last_selected_index != null? last_selected_index: 0);
    };
    create_note_template_ui(NOTE_TEMPLATES);
})();