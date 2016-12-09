document.addEventListener('DOMContentLoaded', () => {
  if ($('input[name="isAccepted"]').length) {
    hitcapsule();
  }
});

const hitcapsule = () => {
  let req;
  const reqid = $('input[name="requesterId"]').eq(0).val() || $('a[href^="/mturk/return?"]').eq(0).prop('href').match(/requesterId=\w+/); //.replace('requesterId=');
  const reqname = $('.capsule_field_text').eq(0).text().trim();


  const aa = $('input[name="hitAutoAppDelayInSeconds"]').eq(0).val();
  const days = Math.floor((aa / (60 * 60 * 24)));
  const hours = Math.floor((aa / (60 * 60)) % 24);
  const mins = Math.floor((aa / 60) % 60);
  const secs = aa % 60;

  let aa_time = 
      (days  === 0 ? '' : days  + ' day(s)') +
      (hours === 0 ? '' : hours + ' hour(s)') +
      (mins  === 0 ? '' : mins  + ' minute(s)') +
      (secs  === 0 ? '' : secs  + ' seconds(s)');

  if (aa === 0) {
    aa_time = '0 seconds';
  }

  $('.capsule_field_text').eq(0).parent().append(
    `<td><img src="/media/spacer.gif" width="25" height="1" border="0"></td><td align="right" valign="top" nowrap="" class="capsule_field_title">AA:&nbsp;&nbsp;</td><td align="left" valign="top" nowrap="" class="capsule_field_text">${aa_time}</td>`
  );

  
  $('.capsule_field_text').eq(0).html(
    `<a href="/mturk/searchbar?selectedSearchType=hitgroups&${reqid ? 'requesterId=' + reqid.replace('requesterId=', '') : 'searchWords=' + reqname.replace(/ /g, '+')}" target="_blank">${reqname}</a>`
  );
}