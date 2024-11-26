(()=>{"use strict";var e=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},t=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){!function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}(e,r,t)}))},r=function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)},n={baseUrl:"https://nomoreparties.co/v1/wff-cohort-21",headers:{authorization:"b81b799d-5dff-409c-bb91-a9e0a45c29ac","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},a=function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:n.headers}).then(o)},c=function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then(o)},i=function(e,t,r,n,o,a,c,i,u){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),d=l.querySelector(".card__image"),s=l.querySelector(".card__delete-button"),p=l.querySelector(".card__like-button"),f=l.querySelector(".like-count");return l.querySelector(".card__title").textContent=e,d.src=t,d.alt=e,n!==o?s.remove():s.addEventListener("click",(function(){i(r,l)})),a&&(a.some((function(e){return e._id===o}))?p.classList.add("card__like-button_is-active"):p.classList.remove("card__like-button_is-active"),f.textContent=a.length),p.addEventListener("click",(function(){u(p,{cardId:r,likeCount:f})})),d.addEventListener("click",c),l};function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l),e.addEventListener("click",(function(t){t.currentTarget===t.target&&d(e)}))}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".popup").forEach((function(e){return e.classList.add("popup_is-animated")}))}));var l=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&d(t)}};function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var p,f={cardList:document.querySelector(".places__list"),imagePopup:document.querySelector(".popup_type_image"),newCardPopup:document.querySelector(".popup_type_new-card"),profileEditButton:document.querySelector(".profile__edit-button"),avatarUpdatePopup:document.querySelector(".popup-update-avatar"),avatarUrlInput:document.querySelector(".popup__input_avatar_url"),profileAvatar:document.querySelector(".profile__image"),addCardButton:document.querySelector(".profile__add-button"),deleteConfirmPopup:document.querySelector(".popup-confirm-delete"),closeButtons:document.querySelectorAll(".popup__close"),form:document.querySelector(".popup__form"),profileEditPopup:document.querySelector(".popup_type_edit"),profileForm:document.forms["edit-profile"],newCardForm:document.forms["new-place"],avatarForm:document.forms["new-avatar"],deleteForm:document.forms["delete-card"],nameField:document.querySelector(".popup__input_type_name"),jobField:document.querySelector(".popup__input_type_description"),profileName:document.querySelector(".profile__title"),profileJob:document.querySelector(".profile__description"),cardNameInput:document.querySelector(".popup__input_type_card-name"),cardLinkInput:document.querySelector(".popup__input_type_url")},m=null,v=function(e){return e.textContent="Сохранение.."},_=function(e){return e.textContent="Сохранить"},y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:".button_inactive",inputErrorClass:".popup__input_type_error",errorClass:".popup__input-error_active"};p=y,Array.from(document.querySelectorAll(p.formSelector)).forEach((function(t){!function(t,n){var o=Array.from(t.querySelectorAll(n.inputSelector)),a=t.querySelector(n.submitButtonSelector);e(o,a,n),o.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.validity.valid?(o.textContent="",t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass)):r(e,t,t.dataset.errorMessage||t.validationMessage,n)}(t,c,n),e(o,a,n)}))}))}(t,p)})),f.profileAvatar.addEventListener("click",(function(){u(f.avatarUpdatePopup),f.avatarForm.reset(),t(f.avatarForm,y)})),f.avatarForm.addEventListener("submit",(function(e){var t;v(e.submitter),e.preventDefault(),(t=f.avatarUrlInput.value,fetch("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:t})}).then(o)).then((function(e){f.profileAvatar.style.backgroundImage="url('".concat(e.avatar,"')")})).catch(console.error).finally((function(){_(e.submitter),d(f.avatarUpdatePopup)}))})),f.profileEditButton.addEventListener("click",(function(){f.nameField.value=f.profileName.textContent,f.jobField.value=f.profileJob.textContent,u(f.profileEditPopup),t(f.profileForm,y)}));var h=function(e){f.imagePopup.querySelector(".popup__content").classList.add("popup__content_content_image"),document.querySelector(".popup__image").src=e.target.src,document.querySelector(".popup__caption").textContent=e.target.alt,u(f.imagePopup)};f.addCardButton.addEventListener("click",(function(){u(f.newCardPopup),f.newCardForm.reset(),t(f.newCardForm,y)}));var b={},S=function(e,t){b={id:e,cardElement:t},u(f.deleteConfirmPopup)},E=function(e){f.profileName.textContent=e.name,f.profileJob.textContent=e.about,f.profileAvatar.style.backgroundImage="url('".concat(e.avatar,"')")};function C(e,t){var r=t.cardId,n=t.likeCount;(e.classList.contains("card__like-button_is-active")?a:c)(r).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch(console.error)}f.deleteForm.addEventListener("submit",(function(e){var t;e.preventDefault(),b.cardElement&&(t=b.id,fetch("".concat(n.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:n.headers}).then(o)).then((function(){b.cardElement.remove(),d(f.deleteConfirmPopup),b={}})).catch(console.error)})),f.newCardForm.addEventListener("submit",(function(e){var t;v(e.submitter),e.preventDefault(),(t={name:f.cardNameInput.value,link:f.cardLinkInput.value},fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify(t)}).then(o)).then((function(t){var r=i(t.name,t.link,t._id,t.owner._id,m,t.likes,h,S,C);_(e.submitter),d(f.newCardPopup),f.cardList.prepend(r)})).catch(console.error)})),f.form.addEventListener("submit",(function(e){var t;v(e.submitter),e.preventDefault(),(t={name:f.nameField.value,about:f.jobField.value},fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify(t)}).then(o)).then(E).catch(console.error).finally((function(){_(e.submitter),d(f.profileEditPopup)}))})),f.closeButtons.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return d(t)}))})),document.querySelector(".profile__image").addEventListener("click",(function(){this.classList.toggle("hover")})),Promise.all([fetch("".concat(n.baseUrl,"/users/me"),{method:"GET",headers:n.headers}).then(o),fetch("".concat(n.baseUrl,"/cards"),{method:"GET",headers:n.headers}).then(o)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,i=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],a=n[1];m=o._id,E(o),L(a)})).catch(console.error);var L=function(e){e.forEach((function(e){f.cardList.append(i(e.name,e.link,e._id,e.owner._id,m,e.likes,h,S,C))}))}})();