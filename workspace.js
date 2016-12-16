document.addEventListener('DOMContentLoaded', () => {
    WORKSPACE();
});

chrome.storage.onChanged.addListener( (changes) => {
  for (let key in changes) {
    if (key === 'user') {
      WORKSPACE();
    }
  }
});

const WORKSPACE = () => {
  chrome.storage.local.get('user', (data) => {
    const user = data.user || {workspace: true};
    
    let $workspace;
    const $iframe = $('iframe');
    const $wrapper = $('#hit-wrapper');
    const $timer = $('#theTime');

    if (user.workspace  && !$('[name="userCaptchaResponse"]').length) {
      if ($('input[name="isAccepted"][value="true"]').length) {
        if ($iframe.length) {
          $iframe.height('100vh');
          $iframe.focus();
          $workspace = $iframe;
        }
        else if ($wrapper.length) {
          $workspace = $wrapper;
        }
        $workspace[0].scrollIntoView();
      }
      else if ($timer.length) {
        $timer[0].scrollIntoView();
      }
    }
    else {
      if ($iframe.length) {
        $iframe.height('600px');
        $('html, body').scrollTop(0);
      }
    }
  });
};
