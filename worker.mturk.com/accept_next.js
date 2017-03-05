function ACCEPT_NEXT (settings) {
  if (!settings) settings = { accept_next: true };
    
  const element = $(`label:contains(Auto-accept Next Task)`).children()[0];
  const checked = element.checked;
    
  if (settings.accept_next !== checked) element.click();
}

if ($(`label:contains(Auto-accept Next Task)`)[0]) {
  chrome.storage.onChanged.addListener( function (changes) {
    if (changes.settings) ACCEPT_NEXT(changes.settings.newValue);
  });

  chrome.storage.local.get(`settings`, function (result) {
    ACCEPT_NEXT(result.settings ? result.settings : null);
  });
}
