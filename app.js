const PRESIDENT_MAIL_22_23 = 'jamie.shin@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_22_23 = 'chae.kang@mail.utoronto.ca';
const SPONSER_DIRECTOR_MAIL_22_23 = 'seohyun.kang@mail.utoronto.ca';

/**
 * precondition: the query is anchor, i.e. has an href attr.
 */
function updateMailAddress(id, email) {
  const anchor = document.getElementById(id);
  anchor.textContent = email;
  anchor.href = 'mailto:' + email;
}

function updateFooterMailAddress(president, vice_president, sponser_director) {
  updateMailAddress('president', president);
  updateMailAddress('vice_president', vice_president);
  updateMailAddress('sponser_director', sponser_director);
}

window.onload = () => {
  updateFooterMailAddress(
    PRESIDENT_MAIL_22_23,
    VICE_PRESIDENT_MAIL_22_23,
    SPONSER_DIRECTOR_MAIL_22_23
  );
};
