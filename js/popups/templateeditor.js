function disableInputBox (inputid, state) {
  let textInputElement = document.getElementById(inputid);
  textInputElement.disabled = state;

}

function GetTemplateInfo() {
    const templateNameId = "template_name";
    const templateValueId = "template_textarea";
    return {
        name: document.getElementById(templateNameId).value,
        value: document.getElementById(templateNameId).value.replace(' ', '_'),
        rawTemplate: document.getElementById(templateValueId).value
    };
}

function SetTemplateInfo (templateName, templateString) {
    const templateNameId = "template_name";
    const templateValueId = "template_textarea";
    document.getElementById(templateNameId).value = templateName;
    document.getElementById(templateValueId).value = templateString;
}

