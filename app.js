const PRESIDENT_MAIL_22_23 = 'jamie.shin@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_22_23 = 'chae.kang@mail.utoronto.ca';
const SPONSER_DIRECTOR_MAIL_22_23 = 'seohyun.kang@mail.utoronto.ca';

window.onload = () => {
  updateFooterMailAddress(
    PRESIDENT_MAIL_22_23,
    VICE_PRESIDENT_MAIL_22_23,
    SPONSER_DIRECTOR_MAIL_22_23
  );

  // updateAnchorRel();
};

/**
 * Not Yet Implemented.
 * @param {String} pageName the name of the page to be implemented.
 */
function navToPage(pageName) {
  console.log(`NAVIGATION TO ${pageName} TO BE IMPLEMENTED`);
}

/**
 * updates the footer mail address tag of given <id> have the link as its href attribute.
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

function updateAnchorRel() {
  const anchors = document.querySelectorAll('a');
  for (const anchor in anchors) {
    anchor.rel = 'noopener noreferrer';
  }
}
