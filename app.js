/* --- constants --- */
const PRESIDENT_MAIL_23_24 = 'seohyun.kang@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_23_24 = 'suye.han@mail.utoronto.ca';
const ER_DIRECTOR_MAIL_23_24 = 'yujin.shim@mail.utoronto.ca';

/* --- end of constants ---*/

window.onload = () => {
  // HOME
  updateFooterMailAddress(
    PRESIDENT_MAIL_23_24,
    VICE_PRESIDENT_MAIL_23_24,
    ER_DIRECTOR_MAIL_23_24
  );
  startUpdateSponsor();

  // EXECUTIVES
  displayExecutives();

  // EVENTS
  displayEvents('social');
  displayEvents('professional');
  displayEvents('academic');

  // SPONSORS
  displaySponsors();

  // GENERAL
  updateAnchorRel();
};

// HOME & GENERAL

/**
 * the scroll function that is triggered
 * when about-us button is pressed.
 */
function scrollToAboutUs() {
  aboutUs = document.getElementById('about-us-scroll-point');
  aboutUs.scrollIntoView({ behavior: 'smooth' });
}

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
  fetch(`./assets/sponsors/sponsor-info.json`)
    .then(response => response.json())
    .then(raw_data => raw_data.slice(1))
    .then(data => {
      repeatUpdateSponsor(data);
    });
}

function repeatUpdateSponsor(data, sponsor_photo_index = 0) {
  // execute function
  updateSponsorPhoto(data, sponsor_photo_index);

  // update slide index
  if (++sponsor_photo_index >= data.length) {
    sponsor_photo_index = 0;
  }

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

  // scroll to top
  window.scrollTo(0, 0);
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

/**
 * Given an element, toggle given class.
 * If the element has the class, remove it.
 * If the element does not have the class, add it.
 * @param {HTMLDivElement} element - the element to modify class
 * @param {String} className - the class name to add / remove
 */
function toggleClassState(element, className) {
  const currentClassList = element.className.split(' ');

  // add / remove classes
  const updatedClassList = currentClassList.filter(c => c !== className);
  if (updatedClassList.length === currentClassList.length) {
    updatedClassList.push(className);
  }

  element.className = updatedClassList.join(' ');
}

// EXECUTIVES

function displayExecutives() {
  fetch(`./assets/executives/exec-info.json`)
    .then(response => response.json())
    .then(raw_data => raw_data.slice(1)) // to ignore the first example obj
    .then(data => {
      // map the json file into easier format
      const execByDept = {};

      for (const singleExec of data) {
        if (!execByDept.hasOwnProperty(singleExec.Dept)) {
          execByDept[singleExec.Dept] = {
            Director: [],
            Committee: [],
            Intern: [],
          };
        }

        const singleDept = execByDept[singleExec.Dept];
        if (!singleDept.hasOwnProperty(singleExec.Position)) {
          singleDept[singleExec.Position] = [];
        }

        singleDept[singleExec.Position].push(singleExec);
      }

      return execByDept;
    })
    .then(data => {
      for (const deptName in data) {
        displayDept(deptName, data[deptName]);
      }
    });
}

function displayPresidents() {}

function displayDept(deptName, deptData) {
  console.log(deptName);
  const targetElement = document.getElementById(
    `dept-${deptName.replaceAll(' ', '-')}`
  );

  const directorRow = document.createElement('div');
  directorRow.classList.add('member-row');
  directorRow.append(...deptData.Director.map(makeSingleExecElement));

  const committeeRow = document.createElement('div');
  committeeRow.classList.add('member-row');
  committeeRow.append(...deptData.Committee.map(makeSingleExecElement));

  const internRow = document.createElement('div');
  internRow.classList.add('member-row');
  internRow.append(...deptData.Intern.map(makeSingleExecElement));

  targetElement.append(directorRow, committeeRow, internRow);
}

/**
 * single member information is as such:
 * ```ts
 * {
 *    "Dept": "부서",
 *    "Position": "직책",
 *    "Name": "홍길동",
 *    "Programs": "Smth & Smth"
 *    "LinkedIn"?: "https://www.linkedin.com/in/hong-gil-dong/",
 * }
 * ```
 * and div is created as such:
 * ```html
 * <div class="member">
 *   <img src="./assets/executives/exec-headshots/홍길동.png" />
 *   <div class="position">President</div>
 *   <div class="name">홍길동</div>
 *   <div class="program">Smth & Smth</div>
 * </div>
 * ```
 */
const makeSingleExecElement = memberInfo => {
  if (!memberInfo) throw MediaError;

  const memberElement = document.createElement('div');
  memberElement.classList.add('member');

  memberElement.innerHTML = `
    <img src="./assets/executives/exec-headshots/${memberInfo.Name}.png" />
    <div class="position">${memberInfo.Position}</div>
    <div class="name">${memberInfo.Name}</div>
    <div class="program">${memberInfo.Program}</div>
  `;

  return memberElement;
};

// EVENTS

/**
 * Using `makeEventElement(eventDict)`, construct event items based on social-events.json and update the DOM.
 * @param {String} eventId is one of social, professional, academic
 */
function displayEvents(eventId) {
  const targetElement = document.getElementById(eventId);
  if (!targetElement) return;

  // Gets data from {eventId}-events.json
  fetch(`./assets/events/${eventId}-events.json`)
    .then(response => response.json())
    .then(raw_data => raw_data.slice(1))
    .then(data => {
      targetElement.append(
        ...data.map(eventDict => makeEventElement(eventDict))
      );
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
const makeEventElement = eventDict => {
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

// SPONSORS

/**
 * Using `makeSponsorElement(sponsorDict)`, construct sponsor cell items based on sponsor-info.json and update the DOM.
 */
function displaySponsors() {
  const targetElement = document.getElementById('sponsor-hub');
  if (!targetElement) return;

  // fetch data from sponsor-info.json
  fetch(`./assets/sponsors/sponsor-info.json`)
    .then(response => response.json())
    .then(raw_data => raw_data.slice(1))
    .then(data => {
      targetElement.append(
        ...data.map(sponsorDict => makeSponsorElement(sponsorDict))
      );
    });
}

/**
 * Make an HTML element that contains info about a single kcc sponsor
 * ```{HTML}
 * <a href={sponsorDict.mapLink} rel="noopener noreferrer"> <!-- this is wrapperAnchorDiv -->
 *   <div style="background-image: url({sponsorDict.image1})"> <!-- this is parentDiv -->
 *     <div>{sponsorDict.name}</div> <!-- this is firstChildDiv -->
 *     <div></div> <!-- this is secondChildDiv -->
 *   </div>
 * </a>
 * ```
 *
 * Preconditions:
 *  @param {JSON} sponsorDict is a valid event dictionary with three string key-value pairs: name, explanation, image. Refer to social-events.json for more details.
 */
const makeSponsorElement = sponsorDict => {
  if (!sponsorDict) throw MediaError;

  const firstChildDiv = document.createElement('div');
  firstChildDiv.innerHTML = sponsorDict.name;

  const secondChildDiv = document.createElement('div');

  const parentDiv = document.createElement('div');
  parentDiv.style.backgroundImage = `url(${sponsorDict.image1})`;
  parentDiv.append(firstChildDiv, secondChildDiv);

  const wrapperAnchorDiv = document.createElement('a');
  wrapperAnchorDiv.href = sponsorDict.mapLink;
  wrapperAnchorDiv.append(parentDiv);

  return wrapperAnchorDiv;
};
