/* --- constants --- */
const PRESIDENT_MAIL_23_24 = 'seohyun.kang@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_23_24 = 'suye.han@mail.utoronto.ca';
const ER_DIRECTOR_MAIL_23_24 = 'yujin.shim@mail.utoronto.ca';

/* --- end of constants ---*/

window.onload = () => {
  updateFooterMailAddress(
    PRESIDENT_MAIL_23_24,
    VICE_PRESIDENT_MAIL_23_24,
    ER_DIRECTOR_MAIL_23_24
  );
  startUpdateSponsor();
  displayEvents('social');
  displayEvents('professional');
  displayEvents('academic');
};

/**
 * updates the footer mail address tag of given <id> have the link as its href attribute.
 * precondition: the query is anchor, i.e. has an href attr.
 * @param {String} president - the email address string of current president
 * @param {String} vice_president - that of current vice_president
 * @param {String} er_director - that of current ER director
 */
function updateFooterMailAddress(president, vice_president, er_director) {
  updateMailAddress('president', president);
  updateMailAddress('vice_president', vice_president);
  updateMailAddress('sponsor_director', er_director);
}

const updateMailAddress = (id, email) => {
  const anchor = document.getElementById(id);
  anchor.textContent = email;
  anchor.href = 'mailto:' + email;
};

const updateAnchorRel = () => {
  const anchors = document.querySelectorAll('a');
  for (const anchor in anchors) {
    anchor.rel = 'noopener noreferrer';
  }
};

function startUpdateSponsor() {
  // Gets data from sponsor-info.json
  fetch(`/sponsors/sponsor-info.json`)
    .then(response => response.json())
    .then(raw_data => raw_data['Sponsors'].slice(1))
    .then(data => {
      repeatUpdateSponsor(data);
    });
}

/**
 * Repetitively updates sponsor images in the main page.
 * Update `home_sponsor_photo_left`and `home_sponsor_photo_right` for changing images.
 */
function repeatUpdateSponsor(data, sponsor_photo_index = 0) {
  console.log(sponsor_photo_index);
  // update slide index
  if (++sponsor_photo_index > 5) {
    sponsor_photo_index = 0;
  }

  updateSponsorPhoto(data, sponsor_photo_index);
  // execute function
  setTimeout(() => {
    repeatUpdateSponsor(data, sponsor_photo_index);
  }, 5000);
}

const updateSponsorPhoto = (data, index) => {
  const leftFront = document.getElementById('left-front');
  const leftRear = document.getElementById('left-rear');
  const rightFront = document.getElementById('right-front');
  const rightRear = document.getElementById('right-rear');

  const imgList = [leftFront, leftRear, rightFront, rightRear];
  if (!data || !imgList || ![...imgList].every(i => i.src)) return;

  // old image: hide
  // new image: change src, reveal

  if (!(index % 2)) {
    // even index: even is old,
    updateAnimationName(leftFront, 'img-hide');
    updateAnimationName(rightFront, 'img-hide');

    leftRear.src = data[index].image1;
    rightRear.src = data[index].image2;

    updateAnimationName(leftRear, 'img-reveal');
    updateAnimationName(rightRear, 'img-reveal');
  } else {
    // odd index: odd is old
    updateAnimationName(leftRear, 'img-hide');
    updateAnimationName(rightRear, 'img-hide');

    leftFront.src = data[index].image1;
    rightFront.src = data[index].image2;

    updateAnimationName(leftFront, 'img-reveal');
    updateAnimationName(rightFront, 'img-reveal');
  }
};

const updateAnimationName = (element, animationName) => {
  if (!element) return;

  element.style.animationName = '';
  element.style.animationName = animationName;
};

/**
 * Using `makeEventDiv(eventDict)`, construct event items based on social-events.json and update the DOM.
 * @param {String} eventId is one of social, professional, academic
 */
function displayEvents(eventId) {
  const targetElement = document.getElementById(eventId);
  if (!targetElement) return;

  // Gets data from {eventId}-events.json
  fetch(`/events/${eventId}-events.json`)
    .then(response => response.json())
    .then(raw_data => raw_data['Events'].slice(1))
    .then(data => {
      targetElement.append(...data.map(eventDict => makeEventDiv(eventDict)));
    });
}

/**
 * Helper function of `displayEvents`
 * Make an HTML element that contains info about a single event
 * ```{HTML}
 * <div> <!-- this is eventWrapperDiv -->
 *   <img src={eventDict.image}/>
 *   <div> <!-- this is miniDiv -->
 *     <h2>{eventDict.name}</h2> <!-- this is name -->
 *     <p>{eventDict.explanation}</p> <!-- this is exp -->
 *   </div>
 * </div>
 * ```
 *
 * Preconditions:
 *  @param {JSON} eventDict is a valid event dictionary with three string key-value pairs: name, explanation, image. Refer to social-events.json for more details.
 */
const makeEventDiv = eventDict => {
  if (!eventDict) throw MediaError;

  // create img element
  const image = document.createElement('img');
  image.src = eventDict.image;

  // create h2 element
  const name = document.createElement('h2');
  name.append(eventDict.name);

  // create p element
  const exp = document.createElement('p');
  exp.innerHTML = eventDict.explanation;

  // create h2 + p wrapper div element, append.
  const miniDiv = document.createElement('div');
  miniDiv.append(name, exp);

  // create parent div element
  const eventWrapperDiv = document.createElement('div');
  eventWrapperDiv.append(image, miniDiv);

  return eventWrapperDiv;
};

// the scroll function that is triggered
// when about-us button is pressed.
function scrollToAboutUs() {
  aboutUs = document.getElementById('about-us-scroll-point');
  aboutUs.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Function for subpage navigations in events, sponsors, etc...
 * each subpage has to be a direct child of a same div.
 * @param {String} className
 */
function displayDiv(className) {
  const selectedDivList = [...document.getElementsByClassName(className)];

  // case of null : revert to homepage.
  if (!selectedDivList || !className) {
    displayDiv('homepage');
    return;
  }

  // title modification
  if (className === 'homepage') {
    document.title = 'UTKCC - University of Toronto Korean Commerce Community';
  } else {
    document.title = `${
      className.charAt(0).toUpperCase() + className.slice(1)
    } | UTKCC`;
  }

  // class modification: deactivate except for the matching class
  const activatedDivList = [...document.getElementsByClassName('active')];
  activatedDivList.forEach(deactivateDiv);
  selectedDivList.forEach(activateDiv);
}

const activateDiv = element => {
  if (!element) return;
  element.className = element.className
    .split(' ')
    .slice(0, -1)
    .concat('active')
    .join(' ');
};

const deactivateDiv = element => {
  if (!element) return;
  element.className = element.className
    .split(' ')
    .slice(0, -1)
    .concat('inactive')
    .join(' ');
};
